import Foundation
import Capacitor
import EventKitUI

public class CapacitorCalendar: NSObject, EKEventEditViewDelegate, EKCalendarChooserDelegate {
    private let bridge: (any CAPBridgeProtocol)?
    private let eventStore: EKEventStore
    private var currentCreateEventContinuation: CheckedContinuation<[String], any Error>?
    private var currentSelectCalendarsContinuation: CheckedContinuation<[[String: Any]], any Error>?

    init(bridge: (any CAPBridgeProtocol)?, eventStore: EKEventStore) {
        self.bridge = bridge
        self.eventStore = eventStore
    }

    public func createEventWithPrompt(with parameters: EventCreationParameters) async throws -> [String] {
        let newEvent = EKEvent(eventStore: eventStore)
        if let calendarId = parameters.calendarId, let calendar = eventStore.calendar(withIdentifier: calendarId) {
            newEvent.calendar = calendar
        } else {
            newEvent.calendar = eventStore.defaultCalendarForNewEvents
        }
        newEvent.title = parameters.title
        if let location = parameters.location {
            newEvent.location = location
        }
        if let startDate = parameters.startDate {
            newEvent.startDate = Date(timeIntervalSince1970: startDate / 1000)
        }
        if let endDate = parameters.endDate {
            newEvent.endDate = Date(timeIntervalSince1970: endDate / 1000)
        }
        if let isAllDay = parameters.isAllDay {
            newEvent.isAllDay = isAllDay
        }
        if let alertOffsetInMinutesSingle = parameters.alertOffsetInMinutesSingle, alertOffsetInMinutesSingle >= 0 {
            newEvent.addAlarm(EKAlarm(relativeOffset: TimeInterval(-alertOffsetInMinutesSingle * 60)))
        } else if let alertOffsetInMinutesMultiple = parameters.alertOffsetInMinutesMultiple {
            for alert in alertOffsetInMinutesMultiple {
                if alert >= 0 {
                    newEvent.addAlarm(EKAlarm(relativeOffset: TimeInterval(-alert * 60)))
                }
            }
        }
        if let notes = parameters.notes {
            newEvent.notes = notes
        }
        if let urlString = parameters.url, let url = URL(string: urlString) {
            newEvent.url = url
        }

        return try await withCheckedThrowingContinuation { continuation in
            guard let viewController = bridge?.viewController else {
                continuation.resume(throwing: CapacitorCalendarPluginError.viewControllerUnavailable)
                return
            }

            Task { @MainActor in
                let eventEditViewController = EKEventEditViewController()
                eventEditViewController.event = newEvent
                eventEditViewController.eventStore = eventStore
                eventEditViewController.editViewDelegate = self
                currentCreateEventContinuation = continuation
                viewController.present(eventEditViewController, animated: true, completion: nil)
            }
        }
    }

    public func modifyEventWithPrompt(id: String, update: EventCreationParameters? = nil) async throws -> [String] {
        return try await withCheckedThrowingContinuation { continuation in
            guard let viewController = bridge?.viewController else {
                continuation.resume(throwing: CapacitorCalendarPluginError.viewControllerUnavailable)
                return
            }

            guard let event = eventStore.event(withIdentifier: id) else {
                continuation.resume(throwing: CapacitorCalendarPluginError.undefinedEvent)
                return
            }

            if update != nil {
                if (update?.title) != nil {
                    event.title = update?.title
                }
                if let calendarId = update?.calendarId, let calendar = eventStore.calendar(withIdentifier: calendarId) {
                    event.calendar = calendar
                }
                if update?.location != nil {
                    event.location = update?.location
                }
                if let startDate = update?.startDate {
                    event.startDate = Date(timeIntervalSince1970: startDate / 1000)
                }
                if let endDate = update?.endDate {
                    event.endDate = Date(timeIntervalSince1970: endDate / 1000)
                }
                if let isAllDay = update?.isAllDay {
                    event.isAllDay = isAllDay
                }
                if let notes = update?.notes {
                    event.notes = notes
                }
                if let urlString = update?.url, let url = URL(string: urlString) {
                    event.url = url
                }
                if let alertOffsetInMinutesSingle = update?.alertOffsetInMinutesSingle, alertOffsetInMinutesSingle >= 0 {
                    if event.hasAlarms {
                        for alarm in event.alarms! {
                            event.removeAlarm(alarm)
                        }
                    }
                    event.addAlarm(EKAlarm(relativeOffset: TimeInterval(-alertOffsetInMinutesSingle * 60)))
                } else if let alertOffsetInMinutesMultiple = update?.alertOffsetInMinutesMultiple {
                    if event.hasAlarms {
                        for alarm in event.alarms! {
                            event.removeAlarm(alarm)
                        }
                    }
                    for alert in alertOffsetInMinutesMultiple {
                        if alert >= 0 {
                            event.addAlarm(EKAlarm(relativeOffset: TimeInterval(-alert * 60)))
                        }
                    }
                }
            }

            Task { @MainActor in
                let eventEditViewController = EKEventEditViewController()
                eventEditViewController.event = event
                eventEditViewController.eventStore = eventStore
                eventEditViewController.editViewDelegate = self
                currentCreateEventContinuation = continuation
                viewController.present(eventEditViewController, animated: true, completion: nil)
            }
        }
    }

    public func modifyEvent(id: String, span: EKSpan, update: EventCreationParameters) throws {
        guard let event = eventStore.event(withIdentifier: id) else {
            throw CapacitorCalendarPluginError.undefinedEvent
        }

        if (update.title) != nil {
            event.title = update.title
        }
        if let calendarId = update.calendarId, let calendar = eventStore.calendar(withIdentifier: calendarId) {
            event.calendar = calendar
        }
        if update.location != nil {
            event.location = update.location
        }
        if let startDate = update.startDate {
            event.startDate = Date(timeIntervalSince1970: startDate / 1000)
        }
        if let endDate = update.endDate {
            event.endDate = Date(timeIntervalSince1970: endDate / 1000)
        }
        if let isAllDay = update.isAllDay {
            event.isAllDay = isAllDay
        }
        if let notes = update.notes {
            event.notes = notes
        }
        if let urlString = update.url, let url = URL(string: urlString) {
            event.url = url
        }
        if let alertOffsetInMinutesSingle = update.alertOffsetInMinutesSingle, alertOffsetInMinutesSingle >= 0 {
            if event.hasAlarms {
                for alarm in event.alarms! {
                    event.removeAlarm(alarm)
                }
            }
            event.addAlarm(EKAlarm(relativeOffset: TimeInterval(-alertOffsetInMinutesSingle * 60)))
        } else if let alertOffsetInMinutesMultiple = update.alertOffsetInMinutesMultiple {
            if event.hasAlarms {
                for alarm in event.alarms! {
                    event.removeAlarm(alarm)
                }
            }
            for alert in alertOffsetInMinutesMultiple {
                if alert >= 0 {
                    event.addAlarm(EKAlarm(relativeOffset: TimeInterval(-alert * 60)))
                }
            }
        }

        do {
            try eventStore.save(event, span: span)
        } catch {
            throw CapacitorCalendarPluginError.undefinedEvent
        }
    }

    public func selectCalendarsWithPrompt(selectionStyle: Int, displayStyle: Int) async throws -> [[String: Any]] {
        return try await withCheckedThrowingContinuation { continuation in
            guard let viewController = bridge?.viewController else {
                continuation.resume(throwing: CapacitorCalendarPluginError.viewControllerUnavailable)
                return
            }

            Task { @MainActor in
                if let selectionStyle = EKCalendarChooserSelectionStyle(rawValue: selectionStyle),
                   let displayStyle = EKCalendarChooserDisplayStyle(rawValue: displayStyle) {
                    let calendarChooser = EKCalendarChooser(
                        selectionStyle: selectionStyle,
                        displayStyle: displayStyle,
                        eventStore: eventStore
                    )
                    calendarChooser.showsDoneButton = true
                    calendarChooser.showsCancelButton = true
                    calendarChooser.delegate = self
                    currentSelectCalendarsContinuation = continuation
                    viewController.present(
                        UINavigationController(rootViewController: calendarChooser),
                        animated: true,
                        completion: nil
                    )
                } else {
                    continuation.resume(throwing: CapacitorCalendarPluginError.viewControllerUnavailable)
                    return
                }
            }
        }
    }

    public func listCalendars() -> [[String: Any]] {
        return convertEKCalendarsToDictionaries(calendars: Set(eventStore.calendars(for: .event)))
    }

    public func getDefaultCalendar() throws -> [String: Any]? {
        let defaultCalendar = eventStore.defaultCalendarForNewEvents
        if let defaultCalendar = defaultCalendar {
            var calendarDict: [String: Any] = [
                "id": defaultCalendar.calendarIdentifier,
                "title": defaultCalendar.title,
                "color": hexStringFromColor(color: defaultCalendar.cgColor),
                "isImmutable": defaultCalendar.isImmutable,
                "allowsContentModifications": defaultCalendar.allowsContentModifications,
                "type": defaultCalendar.type.rawValue,
                "isSubscribed": defaultCalendar.isSubscribed
            ]
            if let calendarSource = defaultCalendar.source {
                calendarDict["source"] = [
                    "type": calendarSource.sourceType.rawValue,
                    "id": calendarSource.sourceIdentifier,
                    "title": calendarSource.title
                ]
            }
            return calendarDict
        } else {
            return nil
        }
    }

    public func createEvent(with parameters: EventCreationParameters) throws -> String {
        let fallbackStartDate = Date()
        let newEvent = EKEvent(eventStore: eventStore)
        if let calendarId = parameters.calendarId, let calendar = eventStore.calendar(withIdentifier: calendarId) {
            newEvent.calendar = calendar
        } else {
            newEvent.calendar = eventStore.defaultCalendarForNewEvents
        }
        newEvent.title = parameters.title
        if let location = parameters.location {
            newEvent.location = location
        }
        if let startDate = parameters.startDate {
            newEvent.startDate = Date(timeIntervalSince1970: startDate / 1000)
        } else {
            newEvent.startDate = fallbackStartDate
        }
        if let endDate = parameters.endDate {
            newEvent.endDate = Date(timeIntervalSince1970: endDate / 1000)
        } else {
            newEvent.endDate = fallbackStartDate.addingTimeInterval(3600)
        }
        if let isAllDay = parameters.isAllDay {
            newEvent.isAllDay = isAllDay
        }
        if let alertOffsetInMinutesSingle = parameters.alertOffsetInMinutesSingle, alertOffsetInMinutesSingle >= 0 {
            newEvent.addAlarm(EKAlarm(relativeOffset: TimeInterval(-alertOffsetInMinutesSingle * 60)))
        } else if let alertOffsetInMinutesMultiple = parameters.alertOffsetInMinutesMultiple {
            for alert in alertOffsetInMinutesMultiple {
                if alert >= 0 {
                    newEvent.addAlarm(EKAlarm(relativeOffset: TimeInterval(-alert * 60)))
                }
            }
        }
        if let notes = parameters.notes {
            newEvent.notes = notes
        }
        if let urlString = parameters.url, let url = URL(string: urlString) {
            newEvent.url = url
        }

        do {
            try eventStore.save(newEvent, span: .thisEvent)
            return newEvent.eventIdentifier
        } catch {
            throw CapacitorCalendarPluginError.undefinedEvent
        }
    }

    public func checkAllPermissions() async throws -> [String: String] {
        return try await withCheckedThrowingContinuation { continuation in
            var permissionsState: [String: String]
            switch EKEventStore.authorizationStatus(for: .event) {
            case .authorized, .fullAccess:
                permissionsState = [
                    "readCalendar": PermissionState.granted.rawValue,
                    "writeCalendar": PermissionState.granted.rawValue
                ]
            case .denied, .restricted:
                permissionsState = [
                    "readCalendar": PermissionState.denied.rawValue,
                    "writeCalendar": PermissionState.denied.rawValue
                ]
            case .writeOnly:
                permissionsState = [
                    "readCalendar": PermissionState.prompt.rawValue,
                    "writeCalendar": PermissionState.granted.rawValue
                ]
            case .notDetermined:
                permissionsState = [
                    "readCalendar": PermissionState.prompt.rawValue,
                    "writeCalendar": PermissionState.prompt.rawValue
                ]
            @unknown default:
                continuation.resume(throwing: CapacitorCalendarPluginError.unknownPermissionStatus)
                return
            }
            continuation.resume(returning: permissionsState)
        }
    }

    public func requestWriteAccessToEvents() async throws -> [String: String] {
        return try await withCheckedThrowingContinuation { continuation in
            if #available(iOS 17.0, *) {
                eventStore.requestWriteOnlyAccessToEvents { granted, error in
                    if let error = error {
                        continuation.resume(throwing: CapacitorCalendarPluginError.eventStoreAuthorization)
                        return
                    }

                    var permissionState: String
                    if granted {
                        permissionState = PermissionState.granted.rawValue
                    } else {
                        permissionState = PermissionState.denied.rawValue
                    }
                    continuation.resume(returning: ["result": permissionState])
                }
            } else {
                eventStore.requestAccess(to: .event) { granted, error in
                    if let error = error {
                        continuation.resume(throwing: CapacitorCalendarPluginError.eventStoreAuthorization)
                        return
                    }

                    var permissionState: String
                    if granted {
                        permissionState = PermissionState.granted.rawValue
                    } else {
                        permissionState = PermissionState.denied.rawValue
                    }
                    continuation.resume(returning: ["result": permissionState])
                }
            }
        }
    }

    public func requestFullAccessToEvents() async throws -> String {
        return try await withCheckedThrowingContinuation { continuation in
            if #available(iOS 17.0, *) {
                eventStore.requestFullAccessToEvents { granted, error in
                    if let error = error {
                        continuation.resume(throwing: CapacitorCalendarPluginError.eventStoreAuthorization)
                        return
                    }

                    var permissionState: String
                    if granted {
                        permissionState = PermissionState.granted.rawValue
                    } else {
                        permissionState = PermissionState.denied.rawValue
                    }
                    continuation.resume(returning: permissionState)
                }
            } else {
                eventStore.requestAccess(to: .event) { granted, error in
                    if let error = error {
                        continuation.resume(throwing: CapacitorCalendarPluginError.eventStoreAuthorization)
                        return
                    }

                    var permissionState: String
                    if granted {
                        permissionState = PermissionState.granted.rawValue
                    } else {
                        permissionState = PermissionState.denied.rawValue
                    }
                    continuation.resume(returning: permissionState)
                }
            }
        }
    }

    public func openCalendar(date: Double) async throws {
        return try await withCheckedThrowingContinuation { continuation in
            guard let url = URL(string: "calshow:\(date)") else {
                continuation.resume(throwing: CapacitorCalendarPluginError.unableToOpenCalendar)
                return
            }

            Task { @MainActor in
                guard UIApplication.shared.canOpenURL(url) else {
                    continuation.resume(throwing: CapacitorCalendarPluginError.unableToOpenCalendar)
                    return
                }

                UIApplication.shared.open(url, options: [:]) { success in
                    if success {
                        continuation.resume()
                    } else {
                        continuation.resume(throwing: CapacitorCalendarPluginError.unableToOpenCalendar)
                    }
                }
            }
        }
    }

    public func listEventsInRange(
        startDate: Double,
        endDate: Double
    ) throws -> [[String: Any]] {
        let predicate = eventStore.predicateForEvents(
            withStart: Date(timeIntervalSince1970: startDate / 1000),
            end: Date(timeIntervalSince1970: endDate / 1000), calendars: nil
        )
        let events = self.eventStore.events(matching: predicate)
        return dictionaryRepresentationOfEvents(events: events)
    }

    public func deleteEventsById(ids: JSArray) async throws -> EventDeleteResults {
        await withCheckedContinuation { continuation in

            var deletedEvents: [String] = []
            var failedToDeleteEvents: [String] = []

            for id in ids {
                guard let event = eventStore.event(withIdentifier: "\(id)") else {
                    failedToDeleteEvents.append("\(id)")
                    continue
                }

                do {
                    try eventStore.remove(event, span: .thisEvent, commit: false)
                    deletedEvents.append("\(id)")
                } catch {
                    failedToDeleteEvents.append("\(id)")
                }
            }

            do {
                try eventStore.commit()
            } catch {
                failedToDeleteEvents.append(contentsOf: deletedEvents)
                deletedEvents.removeAll()
            }

            continuation.resume(returning: EventDeleteResults(deleted: deletedEvents, failed: failedToDeleteEvents))
        }
    }

    public func createCalendar(title: String, color: String?, sourceId: String?) throws -> String {
        let newCalendar = EKCalendar(for: .event, eventStore: eventStore)
        newCalendar.title = title
        if let calendarColor = color {
            newCalendar.cgColor = UIColor(hex: calendarColor)?.cgColor
        } else {
            newCalendar.cgColor = eventStore.defaultCalendarForNewEvents?.cgColor
        }
        if let calendarSourceId = sourceId {
            let matchingSource = eventStore.sources.first(where: { $0.sourceIdentifier == calendarSourceId })
            if let requestedSource = matchingSource {
                newCalendar.source = requestedSource
            }

        } else {
            newCalendar.source = eventStore.defaultCalendarForNewEvents?.source
        }

        do {
            try eventStore.saveCalendar(newCalendar, commit: true)
        } catch {
            throw CapacitorCalendarPluginError.unableToCreateCalendar
        }

        return newCalendar.calendarIdentifier
    }

    public func deleteCalendar(id: String) throws {
        if let calendar = eventStore.calendar(withIdentifier: id) {
            try eventStore.removeCalendar(calendar, commit: true)
        } else {
            throw CapacitorCalendarPluginError.calendarNotFound
        }
    }

    public func eventEditViewController(
        _ controller: EKEventEditViewController,
        didCompleteWith action: EKEventEditViewAction
    ) {
        controller.dismiss(animated: true) {
            if action == .saved {
                if let event = controller.event, let eventId = event.eventIdentifier {
                    self.currentCreateEventContinuation?.resume(returning: [eventId])
                } else {
                    self.currentCreateEventContinuation?.resume(throwing: CapacitorCalendarPluginError.undefinedEvent)
                    return
                }
            } else if action == .canceled {
                self.currentCreateEventContinuation?.resume(returning: [])
            } else {
                self.currentCreateEventContinuation?.resume(throwing: CapacitorCalendarPluginError.unknownActionEventCreationPrompt)
            }
        }
    }

    public func calendarChooserDidFinish(_ calendarChooser: EKCalendarChooser) {
        let selectedCalendars = convertEKCalendarsToDictionaries(calendars: calendarChooser.selectedCalendars)
        bridge?.viewController?.dismiss(animated: true) {
            self.currentSelectCalendarsContinuation?.resume(returning: selectedCalendars)
        }
    }

    public func calendarChooserDidCancel(_ calendarChooser: EKCalendarChooser) {
        bridge?.viewController?.dismiss(animated: true) {
            self.currentSelectCalendarsContinuation?.resume(returning: [])
        }
    }

    public func fetchAllCalendarSources() throws -> [[String: Any]] {
        var result: [[String: Any]] = []

        for source in eventStore.sources {
            let sourceDict: [String: Any] = [
                "id": source.sourceIdentifier,
                "title": source.title,
                "type": source.sourceType.rawValue
            ]
            result.append(sourceDict)
        }

        return result
    }

    private func convertEKCalendarsToDictionaries(calendars: Set<EKCalendar>) -> [[String: Any]] {
        var result: [[String: Any]] = []

        for calendar in calendars {
            var calendarDict: [String: Any] = [
                "id": calendar.calendarIdentifier,
                "title": calendar.title,
                "color": hexStringFromColor(color: calendar.cgColor),
                "isImmutable": calendar.isImmutable,
                "allowsContentModifications": calendar.allowsContentModifications,
                "type": calendar.type.rawValue,
                "isSubscribed": calendar.isSubscribed
            ]
            if let calendarSource = calendar.source {
                calendarDict["source"] = [
                    "type": calendarSource.sourceType.rawValue,
                    "id": calendarSource.sourceIdentifier,
                    "title": calendarSource.title
                ]
            }
            result.append(calendarDict)
        }

        return result
    }

    private func dictionaryRepresentationOfEvents(events: [EKEvent]) -> [[String: Any]] {
        return events.map { event in
            var dict = [String: Any]()
            dict["id"] = event.eventIdentifier
            if let title = event.title, !title.isEmpty {
                dict["title"] = title
            }
            if let location = event.location, !location.isEmpty {
                dict["location"] = location
            }
            if let organizer = event.organizer?.name, !organizer.isEmpty {
                dict["organizer"] = organizer
            }
            if let notes = event.notes, !notes.isEmpty {
                dict["description"] = notes
            }
            if let startDate = event.startDate {
                dict["startDate"] = startDate.timeIntervalSince1970 * 1000
            }
            if let endDate = event.endDate {
                dict["endDate"] = endDate.timeIntervalSince1970 * 1000
            }
            if let timezone = event.timeZone, let region = event.timeZone?.identifier, let abbreviation = timezone.abbreviation() {
                dict["eventTimezone"] = ["region": region, "abbreviation": abbreviation]
                dict["eventEndTimezone"] = ["region": region, "abbreviation": abbreviation]
            }
            if let color = event.calendar.cgColor {
                dict["eventColor"] = hexStringFromColor(color: color)
            }
            if let url = event.url {
                dict["url"] = url.absoluteString
            }
            dict["isAllDay"] = event.isAllDay
            dict["calendarId"] = event.calendar.calendarIdentifier
            return dict
        }
    }

    private func hexStringFromColor(color: CGColor) -> String {
        guard let components = color.components, components.count >= 3 else {
            return "#000000"
        }

        let red = Float(components[0])
        let green = Float(components[1])
        let blue = Float(components[2])
        return String(format: "#%02lX%02lX%02lX",
                      lroundf(red * 255),
                      lroundf(green * 255),
                      lroundf(blue * 255))
    }
}
