import Foundation
import EventKit
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorCalendarPlugin)
public class CapacitorCalendarPlugin: CAPPlugin {
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
        Task {
            do {
                let result = try await calendar.createEventWithPrompt()
                call.resolve(["result": [result]])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Unable to retrieve view controller")
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
            try call.resolve(["result": calendar.getDefaultCalendar()])
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

        let eventParameters = EventCreationParameters(
            title: title,
            calendarId: calendarId,
            location: location,
            startDate: startDate,
            endDate: endDate,
            isAllDay: isAllDay
        )

        do {
            let id = try calendar.createEvent(with: eventParameters)
            call.resolve(["result": id])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Unable to create event")
            return
        }
    }

    @objc public func getDefaultRemindersList(_ call: CAPPluginCall) {
        do {
            try call.resolve(["result": reminders.getDefaultRemindersList()])
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
            try reminders.createReminder(with: reminderParams)
            call.resolve(["reminderCreated": true])
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
}
