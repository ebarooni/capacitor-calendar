import Foundation
import Capacitor
import EventKit

@objc(CapacitorCalendarPlugin)
public class CapacitorCalendarPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CapacitorCalendarPlugin"
    public let jsName = "CapacitorCalendar"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "createEventWithPrompt", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkPermission", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkAllPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermission", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestAllPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "selectCalendarsWithPrompt", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "listCalendars", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getDefaultCalendar", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createEvent", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getDefaultRemindersList", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getRemindersLists", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createReminder", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openCalendar", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openReminders", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "listEventsInRange", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "deleteEventsById", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createCalendar", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "deleteCalendar", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getRemindersFromLists", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "deleteRemindersById", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestWriteOnlyCalendarAccess", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestFullCalendarAccess", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestFullRemindersAccess", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestReadOnlyCalendarAccess", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "modifyEventWithPrompt", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "modifyEvent", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "fetchAllCalendarSources", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "fetchAllRemindersSources", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "modifyReminder", returnType: CAPPluginReturnPromise)
    ]
    private let eventStore = EKEventStore()
    private lazy var calendar = CapacitorCalendar(bridge: self.bridge, eventStore: self.eventStore)
    private lazy var reminders = CapacitorReminders(eventStore: self.eventStore)

    @objc public func checkPermission(_ call: CAPPluginCall) {
        guard let alias = call.getString("alias") else {
            call.reject("[CapacitorCalendar.\(#function)] Permission name is not defined")
            return
        }

        Task {
            do {
                try await handlePermissionCheck(for: alias, with: call)
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not determine the status of the requested permission")
            }
        }
    }

    private func handlePermissionCheck(for alias: String, with call: CAPPluginCall) async throws {
        let permissionsState: [String: String]

        switch alias {
        case "readCalendar":
            permissionsState = try await calendar.checkAllPermissions()
        case "writeCalendar":
            permissionsState = try await calendar.checkAllPermissions()
        case "readReminders":
            permissionsState = try await reminders.checkAllPermissions()
        case "writeReminders":
            permissionsState = try await reminders.checkAllPermissions()
        default:
            throw CapacitorCalendarPluginError.unknownPermissionStatus
        }

        guard let permissionResult = permissionsState[alias] else {
            throw CapacitorCalendarPluginError.unknownPermissionStatus
        }

        call.resolve(["result": permissionResult])
    }

    @objc public func checkAllPermissions(_ call: CAPPluginCall) {
        Task {
            do {
                let calendarPermissionsState = try await calendar.checkAllPermissions()
                let remindersPermissionsState = try await reminders.checkAllPermissions()
                call.resolve(calendarPermissionsState.merging(remindersPermissionsState) { (_, new) in new })
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not determine the status of the requested permissions")
                return
            }
        }
    }

    @objc public func requestPermission(_ call: CAPPluginCall) {
        guard let alias = call.getString("alias") else {
            call.reject("[CapacitorCalendar.\(#function)] Permission name is not defined")
            return
        }

        Task {
            do {
                switch alias {
                case "writeCalendar":
                    let result = try await calendar.requestWriteAccessToEvents()
                    call.resolve(result)
                case "readCalendar":
                    let result = try await calendar.requestFullAccessToEvents()
                    call.resolve(["result": result])
                case "writeReminders":
                    let result = try await reminders.requestFullAccessToReminders()
                    call.resolve(["result": result])
                case "readReminders":
                    let result = try await reminders.requestFullAccessToReminders()
                    call.resolve(["result": result])
                default:
                    call.reject("[CapacitorCalendar.\(#function)] Could not authorize \(alias)")
                    return
                }
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not authorize \(alias)")
                return
            }
        }
    }

    @objc public func requestAllPermissions(_ call: CAPPluginCall) {
        Task {
            do {
                let calendarResult = try await calendar.requestFullAccessToEvents()
                let remindersResult = try await reminders.requestFullAccessToReminders()
                var result: [String: String] = [
                    "readCalendar": PermissionState.denied.rawValue,
                    "writeCalendar": PermissionState.denied.rawValue,
                    "readReminders": PermissionState.denied.rawValue,
                    "writeReminders": PermissionState.denied.rawValue
                ]
                if calendarResult == PermissionState.granted.rawValue {
                    result["readCalendar"] = PermissionState.granted.rawValue
                    result["writeCalendar"] = PermissionState.granted.rawValue
                }
                if remindersResult == PermissionState.granted.rawValue {
                    result["readReminders"] = PermissionState.granted.rawValue
                    result["writeReminders"] = PermissionState.granted.rawValue

                }
                call.resolve(result)
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not authorize all permissions")
                return
            }
        }
    }

    @objc public func createEventWithPrompt(_ call: CAPPluginCall) {
        let title = call.getString("title", "")
        let location = call.getString("location")
        let startDate = call.getDouble("startDate")
        let endDate = call.getDouble("endDate")
        let isAllDay = call.getBool("isAllDay")
        let calendarId = call.getString("calendarId")
        let notes = call.getString("notes")
        let url = call.getString("url")

        Task {
            var eventParameters = EventCreationParameters(
                title: title,
                calendarId: calendarId,
                location: location,
                startDate: startDate,
                endDate: endDate,
                isAllDay: isAllDay,
                notes: notes,
                url: url
            )

            if let alertOffsetInMinutesSingle = call.getDouble("alertOffsetInMinutes") as Double? {
                eventParameters.alertOffsetInMinutesSingle = alertOffsetInMinutesSingle
            } else if let alertOffsetInMinutesMultiple = call.getArray("alertOffsetInMinutes") as? [Double]? {
                eventParameters.alertOffsetInMinutesMultiple = alertOffsetInMinutesMultiple
            }

            do {
                let result = try await calendar.createEventWithPrompt(with: eventParameters)
                call.resolve(["result": result])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Unable to retrieve view controller")
                return
            }
        }
    }

    @objc public func modifyEventWithPrompt(_ call: CAPPluginCall) {
        guard let id = call.getString("id") else {
            call.reject("[CapacitorCalendar.\(#function)] Missing event id")
            return
        }

        Task {
            do {
                let result: [String]

                if let update = call.getObject("update") {

                    let title = update["title"] as? String
                    let calendarId = update["calendarId"] as? String
                    let location = update["location"] as? String
                    let startDate = update["startDate"] as? Double
                    let endDate = update["endDate"] as? Double
                    let isAllDay = update["isAllDay"] as? Bool
                    let notes = update["notes"] as? String
                    let url = update["url"] as? String
                    let alertOffsetInMinutesSingle = update["alertOffsetInMinutes"] as? Double
                    let alertOffsetInMinutesMultiple = update["alertOffsetInMinutes"] as? [Double]

                    var eventParameters = EventCreationParameters(
                        title: title,
                        calendarId: calendarId,
                        location: location,
                        startDate: startDate,
                        endDate: endDate,
                        isAllDay: isAllDay,
                        alertOffsetInMinutesSingle: alertOffsetInMinutesSingle,
                        alertOffsetInMinutesMultiple: alertOffsetInMinutesMultiple,
                        notes: notes,
                        url: url
                    )

                    result = try await calendar.modifyEventWithPrompt(id: id, update: eventParameters)
                } else {
                    result = try await calendar.modifyEventWithPrompt(id: id)
                }

                call.resolve(["result": result])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Unable to modify event")
                return
            }
        }
    }

    @objc public func selectCalendarsWithPrompt(_ call: CAPPluginCall) {
        guard let selectionStyle = call.getInt("selectionStyle") else {
            call.reject("[CapacitorCalendar.\(#function)] Selection style was not provided")
            return
        }
        guard let displayStyle = call.getInt("displayStyle") else {
            call.reject("[CapacitorCalendar.\(#function)] Display style was not provided")
            return
        }

        Task {
            do {
                let result = try await calendar.selectCalendarsWithPrompt(selectionStyle: selectionStyle, displayStyle: displayStyle)
                call.resolve(["result": result])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Calendars selection prompt got canceled")
                return
            }
        }
    }

    @objc public func listCalendars(_ call: CAPPluginCall) {
        call.resolve(["result": calendar.listCalendars()])
    }

    @objc public func getDefaultCalendar(_ call: CAPPluginCall) {
        do {
            try call.resolve(["result": calendar.getDefaultCalendar() ?? NSNull()])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] No default calendar was found")
            return
        }
    }

    @objc public func createEvent(_ call: CAPPluginCall) {
        guard let title = call.getString("title") else {
            call.reject("[CapacitorCalendar.\(#function)] A title for the event was not provided")
            return
        }
        let location = call.getString("location")
        let startDate = call.getDouble("startDate")
        let endDate = call.getDouble("endDate")
        let isAllDay = call.getBool("isAllDay")
        let calendarId = call.getString("calendarId")
        let notes = call.getString("notes")
        let url = call.getString("url")

        var eventParameters = EventCreationParameters(
            title: title,
            calendarId: calendarId,
            location: location,
            startDate: startDate,
            endDate: endDate,
            isAllDay: isAllDay,
            notes: notes,
            url: url
        )

        if let alertOffsetInMinutesSingle = call.getDouble("alertOffsetInMinutes") as Double? {
            eventParameters.alertOffsetInMinutesSingle = alertOffsetInMinutesSingle
        } else if let alertOffsetInMinutesMultiple = call.getArray("alertOffsetInMinutes") as? [Double]? {
            eventParameters.alertOffsetInMinutesMultiple = alertOffsetInMinutesMultiple
        }

        do {
            let id = try calendar.createEvent(with: eventParameters)
            call.resolve(["result": id])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Unable to create event")
            return
        }
    }

    @objc public func modifyEvent(_ call: CAPPluginCall) {
        guard let eventId = call.getString("id") else {
            call.reject("[CapacitorCalendar.\(#function)] An id for the event was not provided")
            return
        }
        guard let update = call.getObject("update") else {
            call.reject("[CapacitorCalendar.\(#function)] An update for the event was not provided")
            return
        }
        let span = call.getInt("span", 0)
        let title = update["title"] as? String
        let calendarId = update["calendarId"] as? String
        let location = update["location"] as? String
        let startDate = update["startDate"] as? Double
        let endDate = update["endDate"] as? Double
        let isAllDay = update["isAllDay"] as? Bool
        let notes = update["notes"] as? String
        let url = update["url"] as? String
        let alertOffsetInMinutesSingle = update["alertOffsetInMinutes"] as? Double
        let alertOffsetInMinutesMultiple = update["alertOffsetInMinutes"] as? [Double]

        do {
            var eventParameters = EventCreationParameters(
                title: title,
                calendarId: calendarId,
                location: location,
                startDate: startDate,
                endDate: endDate,
                isAllDay: isAllDay,
                alertOffsetInMinutesSingle: alertOffsetInMinutesSingle,
                alertOffsetInMinutesMultiple: alertOffsetInMinutesMultiple,
                notes: notes,
                url: url
            )
            try calendar.modifyEvent(id: eventId, span: EKSpan(rawValue: span) ?? .thisEvent, update: eventParameters)
            call.resolve()
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Unable to modify event")
            return
        }
    }

    @objc public func getDefaultRemindersList(_ call: CAPPluginCall) {
        do {
            try call.resolve(["result": reminders.getDefaultRemindersList() ?? NSNull()])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] No default Reminders list was found")
            return
        }
    }

    @objc public func getRemindersLists(_ call: CAPPluginCall) {
        call.resolve(["result": reminders.getRemindersLists()])
    }

    @objc public func createReminder (_ call: CAPPluginCall) {
        guard let title = call.getString("title") else {
            call.reject("[CapacitorCalendar.\(#function)] A title for the reminder was not provided")
            return
        }
        let listId = call.getString("listId")
        let priority = call.getInt("priority")
        let isCompleted = call.getBool("isCompleted")
        let startDate = call.getDouble("startDate")
        let dueDate = call.getDouble("dueDate")
        let completionDate = call.getDouble("completionDate")
        let notes = call.getString("notes")
        let url = call.getString("url")
        let location = call.getString("location")

        var recurrence: RecurrenceParameters?
        if let recurrenceData = call.getObject("recurrence") {
            guard let frequency = recurrenceData["frequency"] as? Int else {
                call.reject("[CapacitorCalendar.\(#function)] Frequency must be provided when using recurrence")
                return
            }

            guard let interval = recurrenceData["interval"] as? Int, interval > 0 else {
                call.reject("[CapacitorCalendar.\(#function)] Interval must be greater than 0 when using recurrence")
                return
            }

            let end = recurrenceData["end"] as? Double

            recurrence = RecurrenceParameters(frequency: frequency, interval: interval, end: end)
        }

        let reminderParams = ReminderCreationParameters(
            title: title,
            listId: listId,
            priority: priority,
            isCompleted: isCompleted,
            startDate: startDate,
            dueDate: dueDate,
            completionDate: completionDate,
            notes: notes,
            url: url,
            location: location,
            recurrence: recurrence
        )

        do {
            let id = try reminders.createReminder(with: reminderParams)
            call.resolve(["result": id])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Unable to create reminder")
            return
        }
    }

    @objc public func openCalendar(_ call: CAPPluginCall) {
        let interval: Double
        if let date = call.getDouble("date") {
            interval = Date(timeIntervalSince1970: date / 1000).timeIntervalSinceReferenceDate
        } else {
            interval = Date.timeIntervalSinceReferenceDate
        }

        Task {
            do {
                try await calendar.openCalendar(date: interval)
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Unable to open the calendar")
                return
            }
        }
    }

    @objc public func openReminders(_ call: CAPPluginCall) {
        Task {
            do {
                try await reminders.openReminders()
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Unable to open reminders")
                return
            }
        }
    }

    @objc public func listEventsInRange(_ call: CAPPluginCall) {
        guard let startDate = call.getDouble("startDate") else {
            call.reject("[CapacitorCalendar.\(#function)] A start date was not provided")
            return
        }
        guard let endDate = call.getDouble("endDate") else {
            call.reject("[CapacitorCalendar.\(#function)] An end date was not provided")
            return
        }

        do {
            try call.resolve(["result": calendar.listEventsInRange(startDate: startDate, endDate: endDate)])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Could not get the list of events in requested range")
            return
        }
    }

    @objc public func deleteEventsById(_ call: CAPPluginCall) {
        guard let eventIds = call.getArray("ids") else {
            call.reject("[CapacitorCalendar.\(#function)] Event ids were not provided")
            return
        }

        Task {
            do {
                let deleteResult = try await calendar.deleteEventsById(ids: eventIds)
                call.resolve([
                    "result": [
                        "deleted": deleteResult.deleted,
                        "failed": deleteResult.failed
                    ]
                ])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not delete events")
                return
            }
        }
    }

    @objc public func createCalendar(_ call: CAPPluginCall) {
        guard let title = call.getString("title") else {
            call.reject("[CapacitorCalendar.\(#function)] A title for the calendar was not provided")
            return
        }
        let color = call.getString("color")
        let sourceId = call.getString("sourceId")

        do {
            let id = try calendar.createCalendar(title: title, color: color, sourceId: sourceId)
            call.resolve(["result": id])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Could not create calendar")
            return
        }
    }

    @objc public func deleteCalendar(_ call: CAPPluginCall) {
        guard let id = call.getString("id") else {
            call.reject("[CapacitorCalendar.\(#function)] An id for the calendar to delete should be provided")
            return
        }

        do {
            try calendar.deleteCalendar(id: id)
            call.resolve()
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Could not delete calendar")
            return
        }
    }

    @objc public func getRemindersFromLists(_ call: CAPPluginCall) {
        let ids = call.getArray("listIds")

        Task {
            do {
                try call.resolve(["result": await reminders.getRemindersFromLists(listIds: ids)])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not get the reminders from lists")
                return
            }
        }
    }

    @objc public func deleteRemindersById(_ call: CAPPluginCall) {
        guard let ids = call.getArray("ids") else {
            call.reject("[CapacitorCalendar.\(#function)] Reminder ids were not provided")
            return
        }

        Task {
            do {
                let deleteResult = try await reminders.deleteRemindersById(ids: ids)
                call.resolve([
                    "result": [
                        "deleted": deleteResult.deleted,
                        "failed": deleteResult.failed
                    ]
                ])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not delete the reminders")
                return
            }
        }
    }

    @objc public func requestWriteOnlyCalendarAccess(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await calendar.requestWriteAccessToEvents()
                call.resolve(result)
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not authorize write access")
                return
            }
        }
    }

    @objc public func requestReadOnlyCalendarAccess(_ call: CAPPluginCall) {
        call.unimplemented("[CapacitorCalendar.\(#function)] Not implemented on iOS")
        return
    }

    @objc public func requestFullCalendarAccess(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await calendar.requestFullAccessToEvents()
                call.resolve(["result": result])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not authorize full calendar access")
                return
            }
        }
    }

    @objc public func requestFullRemindersAccess(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await reminders.requestFullAccessToReminders()
                call.resolve(["result": result])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not authorize full reminders access")
                return
            }
        }
    }

    @objc public func fetchAllCalendarSources(_ call: CAPPluginCall) {
        do {
            call.resolve(["result": try calendar.fetchAllCalendarSources()])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Unable to fetch calendar sources")
            return
        }
    }

    @objc public func fetchAllRemindersSources(_ call: CAPPluginCall) {
        do {
            call.resolve(["result": try reminders.fetchAllRemindersSources()])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Unable to fetch calendar sources")
            return
        }
    }

    @objc public func modifyReminder(_ call: CAPPluginCall) {
        guard let reminderId = call.getString("id") else {
            call.reject("[CapacitorCalendar.\(#function)] An id for the reminder was not provided")
            return
        }
        guard let update = call.getObject("update") else {
            call.reject("[CapacitorCalendar.\(#function)] An update for the reminder was not provided")
            return
        }
        let title = update["title"] as? String
        let listId = update["listId"] as? String
        let priority = update["priority"] as? Int
        let isCompleted = update["isCompleted"] as? Bool
        let startDate = update["startDate"] as? Double
        let dueDate = update["dueDate"] as? Double
        let completionDate = update["completionDate"] as? Double
        let notes = update["notes"] as? String
        let url = update["url"] as? String
        let location = update["location"] as? String
        var recurrence: RecurrenceParameters?
        if let recurrenceData = update["recurrence"] as? JSObject {
            guard let frequency = recurrenceData["frequency"] as? Int else {
                call.reject("[CapacitorCalendar.\(#function)] Frequency must be provided when using recurrence")
                return
            }

            guard let interval = recurrenceData["interval"] as? Int, interval > 0 else {
                call.reject("[CapacitorCalendar.\(#function)] Interval must be greater than 0 when using recurrence")
                return
            }

            let end = recurrenceData["end"] as? Double

            recurrence = RecurrenceParameters(frequency: frequency, interval: interval, end: end)
        }

        do {
            var reminderUpdate = ReminderCreationParameters(
                title: title,
                listId: listId,
                priority: priority,
                isCompleted: isCompleted,
                startDate: startDate,
                dueDate: dueDate,
                completionDate: completionDate,
                notes: notes,
                url: url,
                location: location,
                recurrence: recurrence
            )
            try reminders.modifyReminder(id: reminderId, update: reminderUpdate)
            call.resolve()
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Unable to modify reminder")
            return
        }
    }
}
