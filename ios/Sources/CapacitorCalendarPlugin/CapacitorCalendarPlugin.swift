import Capacitor
import EventKit

@objc(CapacitorCalendarPlugin)
public class CapacitorCalendarPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = PluginConfig.identifier
    public let jsName = PluginConfig.jsName
    public let pluginMethods = PluginConfig.methods
    private lazy var implementation = CapacitorCalendarNew(plugin: self)
    private let eventStore = EKEventStore()
    private lazy var calendar = CapacitorCalendar(bridge: self.bridge, eventStore: self.implementation.eventStore)
    private lazy var reminders = CapacitorReminders(eventStore: self.implementation.eventStore)

    @objc public func checkPermission(_ call: CAPPluginCall) {
        do {
            let input = try CheckPermissionInput(call: call)
            let result = try implementation.checkPermission(input: input)
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func checkAllPermissions(_ call: CAPPluginCall) {
        do {
            let result = try implementation.checkAllPermissions()
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func requestPermission(_ call: CAPPluginCall) {
        Task {
            do {
                let input = try RequestPermissionInput(call: call)
                let result = try await implementation.requestionPermission(input: input)
                call.resolve(result.toJSON())
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func requestAllPermissions(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await implementation.requestAllPermissions()
                call.resolve(result.toJSON())
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func requestWriteOnlyCalendarAccess(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await implementation.requestWriteOnlyCalendarAccess()
                call.resolve(result.toJSON())
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func requestReadOnlyCalendarAccess(_ call: CAPPluginCall) {
        call.unimplemented(PluginError.unimplemented(#function).localizedDescription)
    }

    @objc public func requestFullCalendarAccess(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await implementation.requestFullCalendarAccess()
                call.resolve(result.toJSON())
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func requestFullRemindersAccess(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await implementation.requestFullRemindersAccess()
                call.resolve(result.toJSON())
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func createEventWithPrompt(_ call: CAPPluginCall) {
        Task {
            do {
                let input = CreateEventWithPromptInput(call: call)
                let result = try await implementation.createEventWithPrompt(with: input)
                call.resolve(result.toJSON())
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func modifyEventWithPrompt(_ call: CAPPluginCall) {
        Task {
            do {
                let input = try ModifyEventWithPromptInput(call: call)
                let result = try await implementation.modifyEventWithPrompt(input: input)
                call.resolve(result.toJSON())
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func createEvent(_ call: CAPPluginCall) {
        do {
            let input = try CreateEventInput(call: call)
            let result = try implementation.createEvent(input: input)
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func commit(_ call: CAPPluginCall) {
        do {
            try implementation.commit()
            call.resolve()
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func modifyEvent(_ call: CAPPluginCall) {
        do {
            let input: ModifyEventInput = try ModifyEventInput(call: call)
            try implementation.modifyEvent(input: input)
            call.resolve()
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func selectCalendarsWithPrompt(_ call: CAPPluginCall) {
        Task {
            do {
                let input = SelectCalendarsWithPromptInput(call: call)
                let result = try await implementation.selectCalendarsWithPrompt(input: input)
                call.resolve(result.toJSON())
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func fetchAllCalendarSources(_ call: CAPPluginCall) {
        do {
            call.resolve(try implementation.fetchAllCalendarSources().toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func listCalendars(_ call: CAPPluginCall) {
        do {
            call.resolve(try implementation.listCalendars().toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func fetchAllRemindersSources(_ call: CAPPluginCall) {
        fetchAllCalendarSources(call)
    }

    @objc public func openReminders(_ call: CAPPluginCall) {
        Task {
            do {
                try await implementation.openReminders()
                call.resolve()
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func getDefaultCalendar(_ call: CAPPluginCall) {
        do {
            let result = try implementation.getDefaultCalendar()
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func getDefaultRemindersList(_ call: CAPPluginCall) {
        do {
            let result = try implementation.getDefaultRemindersList()
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func getRemindersLists(_ call: CAPPluginCall) {
        do {
            let result = try implementation.getRemindersLists()
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func openCalendar(_ call: CAPPluginCall) {
        Task {
            do {
                let input = OpenCalendarInput(call: call)
                try await implementation.openCalendar(input: input)
                call.resolve()
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func createCalendar(_ call: CAPPluginCall) {
        do {
            let input = try CreateCalendarInput(call: call)
            let result = try implementation.createCalendar(input: input)
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func deleteCalendar(_ call: CAPPluginCall) {
        do {
            let input = try DeleteCalendarInput(call: call)
            try implementation.deleteCalendar(input: input)
            call.resolve()
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func createReminder(_ call: CAPPluginCall) {
        do {
            let input = try CreateReminderInput(call: call)
            let result = try implementation.createReminder(input: input)
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
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
            let reminderUpdate = ReminderCreationParameters(
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
