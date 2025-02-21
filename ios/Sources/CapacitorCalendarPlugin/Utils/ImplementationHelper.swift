import EventKit
import Capacitor

struct ImplementationHelper {
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
            let gray = Float(components[0])
            let alpha = Float(components[1])
            return alpha < 1.0
                ? String(format: "#%02lX%02lX%02lX%02lX", lroundf(gray * 255), lroundf(gray * 255), lroundf(gray * 255), lroundf(alpha * 255))
                : String(format: "#%02lX%02lX%02lX", lroundf(gray * 255), lroundf(gray * 255), lroundf(gray * 255))
        }

        guard components.count >= 3 else { return nil }

        let red = Float(components[0])
        let green = Float(components[1])
        let blue = Float(components[2])
        let alpha = components.count == 4 ? Float(components[3]) : 1.0

        return alpha < 1.0
            ? String(format: "#%02lX%02lX%02lX%02lX", lroundf(red * 255), lroundf(green * 255), lroundf(blue * 255), lroundf(alpha * 255))
            : String(format: "#%02lX%02lX%02lX", lroundf(red * 255), lroundf(green * 255), lroundf(blue * 255))
    }

    static func deleteReminder(reminderId: String, eventStore: EKEventStore) throws {
        guard let reminder = eventStore.calendarItem(withIdentifier: reminderId) as? EKReminder else {
            throw PluginError.reminderNotFound
        }
        try eventStore.remove(reminder, commit: true)
    }

    static func deleteEvent(_ id: String, _ span: EKSpan, _ eventStore: EKEventStore) throws {
        guard let event = eventStore.event(withIdentifier: id) else {
            throw PluginError.eventNotFound
        }
        try eventStore.remove(event, span: span, commit: true)
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
            "priority": reminder.priority ?? NSNull(),
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
            var obj = JSObject()
            obj["frequency"] = rule.frequency.rawValue
            obj["interval"] = rule.interval
            if let recurrenceEnd = rule.recurrenceEnd {
                obj["end"] = ImplementationHelper.dateToMillis(recurrenceEnd.endDate) ?? NSNull()
            } else {
                obj["end"] = NSNull()
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
}
