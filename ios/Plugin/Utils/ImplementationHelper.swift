import EventKit
import Capacitor

struct ImplementationHelper {
    /// Default calendar color when `color` is omitted: `#007AFF` (light-mode iOS system blue).
    static let defaultCalendarColorHex = "#007AFF"

    /// Reads a JS number that may arrive as `Int`, `Double`, or `NSNumber`.
    static func int(from value: Any?) -> Int? {
        guard let value = value, !(value is NSNull) else { return nil }
        if let number = value as? NSNumber { return number.intValue }
        if let intValue = value as? Int { return intValue }
        if let doubleValue = value as? Double { return Int(doubleValue) }
        return nil
    }

    /// Reads a JS number that may arrive as `Int`, `Double`, or `NSNumber`.
    static func double(from value: Any?) -> Double? {
        guard let value = value, !(value is NSNull) else { return nil }
        if let number = value as? NSNumber { return number.doubleValue }
        if let doubleValue = value as? Double { return doubleValue }
        if let intValue = value as? Int { return Double(intValue) }
        return nil
    }

    static func permissionStateToResult(state: EKAuthorizationStatus, scope: CalendarPermissionScope ) throws -> CAPPermissionState {
        var result: CAPPermissionState

        switch state {
        case .authorized, .fullAccess:
            result = CAPPermissionState.granted
        case .denied, .restricted:
            result = CAPPermissionState.denied
        case .writeOnly:
            if scope == .writeCalendar || scope == .writeReminders {
                result = CAPPermissionState.granted
            } else {
                result = CAPPermissionState.prompt
            }
        case .notDetermined:
            result = CAPPermissionState.prompt
        default:
            throw PluginError.unhandledPermissionState
        }

        return result
    }

    static func requestWriteOnlyCalendarAccess(eventStore: EKEventStore) async throws -> CAPPermissionState {
        return try await withCheckedThrowingContinuation { continuation in
            let requestAccessHandler: (Bool, Error?) -> Void = { granted, error in
                if let error = error {
                    continuation.resume(throwing: error)
                    return
                }

                let permissionState: CAPPermissionState = granted ? .granted : .denied
                continuation.resume(returning: permissionState)
                return
            }

            if #available(iOS 17.0, *) {
                eventStore.requestWriteOnlyAccessToEvents(completion: requestAccessHandler)
            } else {
                eventStore.requestAccess(to: .event, completion: requestAccessHandler)
            }
        }
    }

    static func requestFullCalendarAccess(eventStore: EKEventStore) async throws -> CAPPermissionState {
        return try await withCheckedThrowingContinuation { continuation in
            let requestAccessHandler: (Bool, Error?) -> Void = { granted, error in
                if let error = error {
                    continuation.resume(throwing: error)
                    return
                }

                let permissionState: CAPPermissionState = granted ? .granted : .denied
                continuation.resume(returning: permissionState)
                return
            }

            if #available(iOS 17.0, *) {
                eventStore.requestFullAccessToEvents(completion: requestAccessHandler)
            } else {
                eventStore.requestAccess(to: .event, completion: requestAccessHandler)
            }
        }
    }

    static func requestFullRemindersAccess(eventStore: EKEventStore) async throws -> CAPPermissionState {
        return try await withCheckedThrowingContinuation { continuation in
            let requestAccessHandler: (Bool, Error?) -> Void = { granted, error in
                if let error = error {
                    continuation.resume(throwing: error)
                    return
                }

                let permissionState: CAPPermissionState = granted ? .granted : .denied
                continuation.resume(returning: permissionState)
                return
            }

            if #available(iOS 17.0, *) {
                eventStore.requestFullAccessToReminders(completion: requestAccessHandler)
            } else {
                eventStore.requestAccess(to: .reminder, completion: requestAccessHandler)
            }
        }
    }

    static func dateFromTimestamp(_ timestamp: Double) -> Date {
        return Date(timeIntervalSince1970: timestamp / 1000)
    }

    static func getCalendarFromId(eventStore: EKEventStore, calendarId: String?, fallback: Bool) -> EKCalendar? {
        if let id = calendarId, let calendar = eventStore.calendar(withIdentifier: id) {
            return calendar
        }
        if fallback {
            return eventStore.defaultCalendarForNewEvents
        } else {
            return nil
        }
    }

    static func cgColorToHex(_ color: CGColor) -> String? {
        guard let components = color.components else { return nil }

        if components.count == 2 {
            let gray = lroundf(Float(components[0]) * 255)
            let alpha = lroundf(Float(components[1]) * 255)
            return alpha == 255
                ? String(format: "#%02lX%02lX%02lX", gray, gray, gray)
                : String(format: "#%02lX%02lX%02lX%02lX", gray, gray, gray, alpha)
        }

        guard components.count >= 3 else { return nil }

        let red = lroundf(Float(components[0]) * 255)
        let green = lroundf(Float(components[1]) * 255)
        let blue = lroundf(Float(components[2]) * 255)
        let alpha = components.count == 4 ? lroundf(Float(components[3]) * 255) : 255

        return alpha == 255
            ? String(format: "#%02lX%02lX%02lX", red, green, blue)
            : String(format: "#%02lX%02lX%02lX%02lX", red, green, blue, alpha)
    }

    static func deleteReminder(reminderId: String, eventStore: EKEventStore) throws {
        guard let reminder = eventStore.calendarItem(withIdentifier: reminderId) as? EKReminder else {
            throw PluginError.reminderNotFound
        }
        try eventStore.remove(reminder, commit: true)
    }

    static func deleteEvent(commit: Bool, _ id: String, _ span: EventSpan, _ eventStore: EKEventStore) throws {
        guard let event = eventStore.event(withIdentifier: id) else {
            throw PluginError.eventNotFound
        }
        switch span {
        case .thisEvent:
            try eventStore.remove(event, span: .thisEvent, commit: commit)
        case .thisAndFutureEvents:
            try eventStore.remove(event, span: .futureEvents, commit: commit)
        }
    }

    static func calendarsSetToJSArray(_ calendars: Set<EKCalendar>) -> [JSObject] {
        return calendars.map { ImplementationHelper.calendarToJSObject($0) }
    }

    static func calendarsListToJSArray(_ calendars: [EKCalendar]) -> [JSObject] {
        return calendars.map { ImplementationHelper.calendarToJSObject($0) }
    }

    static func calendarToJSObject(_ calendar: EKCalendar) -> JSObject {
        var calendarObject: JSObject = [
            "id": calendar.calendarIdentifier,
            "title": calendar.title,
            "color": ImplementationHelper.cgColorToHex(calendar.cgColor) ?? NSNull(),
            "isImmutable": calendar.isImmutable,
            "allowsContentModifications": calendar.allowsContentModifications,
            "type": calendar.type.rawValue,
            "isSubscribed": calendar.isSubscribed,
            "internalTitle": NSNull(),
            "visible": NSNull(),
            "accountName": NSNull(),
            "ownerAccount": NSNull(),
            "maxReminders": NSNull(),
            "location": NSNull()
        ]

        if let source = calendar.source {
            calendarObject["source"] = ImplementationHelper.calendarSourceToJSObject(source)
        } else {
            calendarObject["source"] = NSNull()
        }

        return calendarObject
    }

    static func calendarSourcesToJSArray(_ sources: [EKSource]) -> [JSObject] {
        return sources.map { ImplementationHelper.calendarSourceToJSObject($0) }
    }

    static func calendarSourceToJSObject(_ source: EKSource) -> JSObject {
        return [
            "title": source.title,
            "id": source.sourceIdentifier,
            "type": source.sourceType.rawValue
        ]
    }

    static func reminderToJSObject(_ reminder: EKReminder) -> JSObject {
        var reminderObject: JSObject = [
            "id": reminder.calendarItemIdentifier,
            "title": reminder.title ?? NSNull(),
            "listId": reminder.calendar?.calendarIdentifier ?? NSNull(),
            "isCompleted": reminder.isCompleted,
            "priority": reminder.priority,
            "notes": reminder.notes ?? NSNull(),
            "location": reminder.location ?? NSNull(),
            "url": reminder.url?.absoluteString ?? NSNull(),
            "startDate": ImplementationHelper.dateComponentToMillis(reminder.startDateComponents) ?? NSNull(),
            "dueDate": ImplementationHelper.dateComponentToMillis(reminder.dueDateComponents) ?? NSNull(),
            "completionDate": ImplementationHelper.dateToMillis(reminder.completionDate) ?? NSNull(),
            "recurrence": ImplementationHelper.recurrenceRulesToJSObject(reminder.recurrenceRules),
            "alerts": ImplementationHelper.alarmsToJSObject(reminder.alarms)
        ]

        return reminderObject
    }

    static func dateComponentToMillis(_ dateComponent: DateComponents?) -> Double? {
        guard let dateComponent = dateComponent else {
            return nil
        }
        let calendar = Calendar.current
        if let date = calendar.date(from: dateComponent) {
            return date.timeIntervalSince1970 * 1000
        } else {
            return nil
        }
    }

    static func dateToMillis(_ date: Date?) -> Double? {
        guard let date = date else {
            return nil
        }
        return date.timeIntervalSince1970 * 1000
    }

    static func recurrenceRulesToJSObject(_ rules: [EKRecurrenceRule]?) -> JSArray {
        var result = JSArray()
        guard let rules = rules else {
            return result
        }
        rules.forEach { rule in
            guard let frequency = RecurrenceInput.Frequency.from(ekFrequency: rule.frequency) else {
                return
            }
            var obj = JSObject()
            obj["frequency"] = frequency.rawValue
            obj["interval"] = rule.interval
            if let recurrenceEnd = rule.recurrenceEnd,
               let endMs = ImplementationHelper.dateToMillis(recurrenceEnd.endDate) {
                obj["end"] = endMs
            }
            result.append(obj)
        }
        return result
    }

    static func alarmsToJSObject(_ alarms: [EKAlarm]?) -> JSArray {
        var result = JSArray()
        guard let alarms = alarms else {
            return result
        }
        alarms.forEach { alarm in
            result.append(alarm.relativeOffset / 60)
        }
        return result
    }

    static func eventToJSObject(
        _ event: EKEvent,
        eventStore: EKEventStore,
        seriesStartDateCache: inout [String: Double]
    ) -> JSObject {
        let startDateMillis = ImplementationHelper.dateToMillis(event.startDate) ?? 0
        var obj: JSObject = [
            "id": event.eventIdentifier,
            "masterId": NSNull(),
            "title": event.title,
            "calendarId": event.calendar?.calendarIdentifier ?? NSNull(),
            "calendarItemExternalIdentifier": event.calendarItemExternalIdentifier ?? NSNull(),
            "location": event.location ?? NSNull(),
            "startDate": startDateMillis,
            "seriesStartDate": ImplementationHelper.seriesStartDateMillis(
                for: event,
                occurrenceStartMillis: startDateMillis,
                eventStore: eventStore,
                cache: &seriesStartDateCache
            ),
            "endDate": ImplementationHelper.dateToMillis(event.endDate) ?? NSNull(),
            "isAllDay": event.isAllDay,
            "alerts": ImplementationHelper.alarmsToJSObject(event.alarms),
            "url": event.url?.absoluteString ?? NSNull(),
            "description": event.notes ?? NSNull(),
            "availability": event.availability.rawValue,
            "organizer": event.organizer?.name ?? NSNull(),
            "color": ImplementationHelper.cgColorToHex(event.calendar.cgColor) ?? NSNull(),
            "duration": NSNull(),
            "isDetached": event.isDetached,
            "isPartOfSeries": event.hasRecurrenceRules || event.isDetached,
            "birthdayContactIdentifier": event.birthdayContactIdentifier ?? NSNull(),
            "status": ImplementationHelper.mapEKEventStatusToEventStatus(event.status),
            "attendees": []
        ]
        if let creationDate = event.creationDate {
            obj["creationDate"] = ImplementationHelper.dateToMillis(creationDate)
        } else {
            obj["creationDate"] = NSNull()
        }
        if let lastModifiedDate = event.lastModifiedDate {
            obj["lastModifiedDate"] = ImplementationHelper.dateToMillis(lastModifiedDate)
        } else {
            obj["lastModifiedDate"] = NSNull()
        }
        if let timezone = event.timeZone {
            obj["timezone"] = timezone.identifier
        } else {
            obj["timezone"] = NSNull()
        }
        if let attendees = event.attendees {
            obj["attendees"] = attendees.map { ImplementationHelper.eventAttendeeToJSObject($0) }
        }
        return obj
    }

    /// Series start in ms. Non-recurring and detached use the occurrence start.
    /// Recurring non-detached use the first occurrence from `event(withIdentifier:)`, cached per call.
    static func seriesStartDateMillis(
        for event: EKEvent,
        occurrenceStartMillis: Double,
        eventStore: EKEventStore,
        cache: inout [String: Double]
    ) -> Double {
        if event.isDetached || !event.hasRecurrenceRules {
            return occurrenceStartMillis
        }

        guard let identifier = event.eventIdentifier else {
            return occurrenceStartMillis
        }
        if let cached = cache[identifier] {
            return cached
        }

        let seriesStart: Double
        if let firstOccurrence = eventStore.event(withIdentifier: identifier),
           let millis = ImplementationHelper.dateToMillis(firstOccurrence.startDate) {
            seriesStart = millis
        } else {
            seriesStart = occurrenceStartMillis
        }
        cache[identifier] = seriesStart
        return seriesStart
    }

    static func eventAttendeeToJSObject(_ attendee: EKParticipant) -> JSObject {
        var obj: JSObject = [
            "email": NSNull(),
            "name": attendee.name ?? NSNull(),
            "role": ImplementationHelper.mapParticipantRole(attendee.participantRole),
            "type": ImplementationHelper.mapParticipantType(attendee.participantType),
            "status": ImplementationHelper.mapParticipantStatus(attendee.participantStatus)
        ]
        return obj
    }

    static func mapParticipantRole(_ role: EKParticipantRole) -> String {
        switch role {
        case .unknown: return "unknown"
        case .required: return "required"
        case .optional: return "optional"
        case .chair: return "chair"
        case .nonParticipant: return "nonParticipant"
        @unknown default: return "unknown"
        }
    }

    static func mapParticipantType(_ type: EKParticipantType) -> String {
        switch type {
        case .unknown: return "unknown"
        case .person: return "person"
        case .room: return "room"
        case .resource: return "resource"
        case .group: return "group"
        @unknown default: return "unknown"
        }
    }

    static func mapParticipantStatus(_ status: EKParticipantStatus) -> String {
        switch status {
        case .unknown: return "unknown"
        case .pending: return "pending"
        case .accepted: return "accepted"
        case .declined: return "declined"
        case .tentative: return "tentative"
        case .delegated: return "delegated"
        case .completed: return "completed"
        case .inProcess: return "inProcess"
        @unknown default: return "unknown"
        }
    }

    static func mapEKEventStatusToEventStatus(_ status: EKEventStatus) -> String {
        switch status {
        case .none:
            return "none"
        case .confirmed:
            return "confirmed"
        case .tentative:
            return "tentative"
        case .canceled:
            return "canceled"
        @unknown default:
            return "none"
        }
    }
}
