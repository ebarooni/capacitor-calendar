import Capacitor
import EventKit

/// Watches the event store. After each change it waits for the changes to settle,
/// reads the watched window again and compares it with the last snapshot.
/// iOS does not say what changed, so the comparison finds it.
final class CalendarChangeObserver {
    private struct Entry {
        let id: String
        let fingerprint: String
    }

    private static let debounceInterval: TimeInterval = 0.4

    private let eventStore: EKEventStore
    private let emit: (JSObject) -> Void
    private let hasListeners: () -> Bool
    private let queue = DispatchQueue(label: "dev.barooni.capacitor.calendar.change-observer")
    private var notificationToken: NSObjectProtocol?
    private var pendingCheck: DispatchWorkItem?
    private var range: ListEventsInRangeInput?
    private var includeEvents = true
    private var includeReminders = false
    private var eventSnapshot: [String: Entry] = [:]
    private var calendarSnapshot: [String: String] = [:]
    private var listenerSeen = false

    init(eventStore: EKEventStore, hasListeners: @escaping () -> Bool, emit: @escaping (JSObject) -> Void) {
        self.eventStore = eventStore
        self.hasListeners = hasListeners
        self.emit = emit
    }

    deinit {
        if let notificationToken {
            NotificationCenter.default.removeObserver(notificationToken)
        }
        pendingCheck?.cancel()
    }

    /// Stops a running watch, reads the baseline and starts to observe.
    /// Throws when the baseline cannot be read. Then nothing is observed.
    func start(_ input: StartListeningInput) throws {
        try queue.sync {
            stopLocked()
            let range = input.getRange()
            let events = try readEvents(range)
            self.range = range
            includeEvents = input.getIncludeEvents()
            includeReminders = input.getIncludeReminders()
            eventSnapshot = toEntries(events)
            calendarSnapshot = readCalendars()
            notificationToken = NotificationCenter.default.addObserver(
                forName: .EKEventStoreChanged,
                object: eventStore,
                queue: nil
            ) { [weak self] _ in
                self?.scheduleCheck()
            }
        }
    }

    func stop() {
        queue.sync {
            stopLocked()
        }
    }

    private func stopLocked() {
        if let notificationToken {
            NotificationCenter.default.removeObserver(notificationToken)
        }
        notificationToken = nil
        pendingCheck?.cancel()
        pendingCheck = nil
        range = nil
        eventSnapshot = [:]
        calendarSnapshot = [:]
        listenerSeen = false
    }

    private func scheduleCheck() {
        queue.async { [weak self] in
            guard let self, self.range != nil else {
                return
            }
            self.pendingCheck?.cancel()
            let workItem = DispatchWorkItem { [weak self] in
                self?.check()
            }
            self.pendingCheck = workItem
            self.queue.asyncAfter(deadline: .now() + Self.debounceInterval, execute: workItem)
        }
    }

    private func check() {
        guard let range else {
            return
        }
        // After `removeAllListeners` nobody listens. Then the watch ends by itself.
        guard hasListeners() else {
            if listenerSeen {
                stopLocked()
            }
            return
        }
        listenerSeen = true
        let freshEvents: [EKEvent]
        do {
            freshEvents = try readEvents(range)
        } catch {
            // The snapshot stays as it is. The next check compares with it again.
            emit(["precise": false])
            return
        }
        let freshEntries = toEntries(freshEvents)
        let freshCalendars = readCalendars()
        let diff = diffEvents(freshEvents, freshEntries: freshEntries)
        let calendarsChanged = freshCalendars != calendarSnapshot

        eventSnapshot = freshEntries
        calendarSnapshot = freshCalendars

        // The store does not say if a reminder changed. Without an event or calendar change,
        // a reminder change is the likely cause.
        let remindersChanged = includeReminders && hasRemindersAccess() && !diff.hasChange && !calendarsChanged
        guard diff.hasChange || calendarsChanged || remindersChanged else {
            return
        }
        emit(makePayload(diff, calendarsChanged: calendarsChanged, remindersChanged: remindersChanged))
    }

    private struct EventDiff {
        let created: [EKEvent]
        let updated: [EKEvent]
        let deletedIds: [String]
        /// An occurrence left the window while its series stays. The lists cannot express it.
        let occurrenceRemoved: Bool

        var hasChange: Bool {
            return !created.isEmpty || !updated.isEmpty || !deletedIds.isEmpty || occurrenceRemoved
        }
    }

    private func diffEvents(_ freshEvents: [EKEvent], freshEntries: [String: Entry]) -> EventDiff {
        let oldCounts = countById(eventSnapshot)
        let freshCounts = countById(freshEntries)
        // A new start time for a known id is a moved event or occurrence, not a new event.
        let created = freshEvents.filter { event in
            eventSnapshot[key(for: event)] == nil && oldCounts[event.eventIdentifier ?? ""] == nil
        }
        let updated = freshEvents.filter { event in
            guard let old = eventSnapshot[key(for: event)] else {
                return oldCounts[event.eventIdentifier ?? ""] != nil
            }
            return old.fingerprint != freshEntries[key(for: event)]?.fingerprint
        }
        var deletedIds: [String] = []
        for (entryKey, entry) in eventSnapshot where freshEntries[entryKey] == nil {
            if freshCounts[entry.id] == nil && !deletedIds.contains(entry.id) {
                deletedIds.append(entry.id)
            }
        }
        let occurrenceRemoved = freshCounts.contains { id, count in count < (oldCounts[id] ?? 0) }
        return EventDiff(
            created: created,
            updated: updated,
            deletedIds: deletedIds,
            occurrenceRemoved: occurrenceRemoved
        )
    }

    private func makePayload(_ diff: EventDiff, calendarsChanged: Bool, remindersChanged: Bool) -> JSObject {
        var payload = JSObject()
        var seriesStartDateCache: [String: Double] = [:]
        if includeEvents && !diff.created.isEmpty {
            payload["created"] = toJSArray(diff.created, cache: &seriesStartDateCache)
        }
        if includeEvents && !diff.updated.isEmpty {
            payload["updated"] = toJSArray(diff.updated, cache: &seriesStartDateCache)
        }
        if !diff.deletedIds.isEmpty {
            var ids = JSArray()
            diff.deletedIds.forEach { ids.append($0) }
            payload["deletedIds"] = ids
        }
        if calendarsChanged {
            payload["calendarsChanged"] = true
        }
        if remindersChanged {
            payload["remindersChanged"] = true
        }
        // A reminder signal carries no list. Events that are not sent are not listed either.
        payload["precise"] = !remindersChanged && !diff.occurrenceRemoved
            && (includeEvents || (diff.created.isEmpty && diff.updated.isEmpty))
        return payload
    }

    private func readEvents(_ range: ListEventsInRangeInput) throws -> [EKEvent] {
        let predicate = eventStore.predicateForEvents(
            withStart: range.getFrom(),
            end: range.getTo(),
            calendars: try range.getCalendars(from: eventStore)
        )
        return eventStore.events(matching: predicate)
    }

    private func readCalendars() -> [String: String] {
        var result: [String: String] = [:]
        for calendar in eventStore.calendars(for: .event) {
            let color = ImplementationHelper.cgColorToHex(calendar.cgColor) ?? ""
            result[calendar.calendarIdentifier] = "\(calendar.title)|\(color)|\(calendar.allowsContentModifications)"
        }
        return result
    }

    private func hasRemindersAccess() -> Bool {
        switch EKEventStore.authorizationStatus(for: .reminder) {
        case .authorized, .fullAccess:
            return true
        default:
            return false
        }
    }

    // One event id has one entry for each occurrence of a series.
    private func key(for event: EKEvent) -> String {
        let start = ImplementationHelper.dateToMillis(event.startDate) ?? 0
        return "\(event.eventIdentifier ?? "")|\(start)"
    }

    private func countById(_ entries: [String: Entry]) -> [String: Int] {
        var result: [String: Int] = [:]
        for entry in entries.values {
            result[entry.id, default: 0] += 1
        }
        return result
    }

    private func toEntries(_ events: [EKEvent]) -> [String: Entry] {
        var result: [String: Entry] = [:]
        for event in events {
            let modified = ImplementationHelper.dateToMillis(event.lastModifiedDate) ?? 0
            let end = ImplementationHelper.dateToMillis(event.endDate) ?? 0
            let calendarId = event.calendar?.calendarIdentifier ?? ""
            let fingerprint = "\(modified)|\(end)|\(calendarId)|\(event.title ?? "")|\(event.location ?? "")"
            result[key(for: event)] = Entry(id: event.eventIdentifier ?? "", fingerprint: fingerprint)
        }
        return result
    }

    private func toJSArray(_ events: [EKEvent], cache: inout [String: Double]) -> JSArray {
        var array = JSArray()
        for event in events {
            array.append(ImplementationHelper.eventToJSObject(event, eventStore: eventStore, seriesStartDateCache: &cache))
        }
        return array
    }
}
