import Capacitor
import EventKit

@objc(CapacitorCalendarPlugin)
public class CapacitorCalendarPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = PluginConfig.identifier
    public let jsName = PluginConfig.jsName
    public let pluginMethods = PluginConfig.methods
    private lazy var implementation = CapacitorCalendar(plugin: self)

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

    @objc public func deleteRemindersById(_ call: CAPPluginCall) {
        do {
            let input = try DeleteRemindersByIdInput(call: call)
            let result = try implementation.deleteRemindersById(input)
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func deleteReminder(_ call: CAPPluginCall) {
        do {
            let input = try DeleteReminderInput(call: call)
            try implementation.deleteReminder(input)
            call.resolve()
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func modifyReminder(_ call: CAPPluginCall) {
        do {
            let input = try ModifyReminderInput(call: call)
            try implementation.modifyReminder(input)
            call.resolve()
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func getReminderById(_ call: CAPPluginCall) {
        do {
            let input = try GetReminderByIdInput(call: call)
            let result = try implementation.getReminderById(input)
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func getRemindersFromLists(_ call: CAPPluginCall) {
        Task {
            do {
                let input = try GetRemindersFromListsInput(call: call)
                let result = try await implementation.getRemindersFromLists(input)
                call.resolve(result.toJSON())
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func deleteEventsById(_ call: CAPPluginCall) {
        do {
            let input = try DeleteEventsByIdInput(call: call)
            let result = try implementation.deleteEventsById(input)
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func deleteEvent(_ call: CAPPluginCall) {
        do {
            let input = try DeleteEventInput(call: call)
            try implementation.deleteEvent(input)
            call.resolve()
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func deleteEventWithPrompt(_ call: CAPPluginCall) {
        Task {
            do {
                let input = try DeleteEventWithPromptInput(call: call)
                let result = try await implementation.deleteEventWithPrompt(input)
                call.resolve(result.toJSON())
            } catch let error {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc public func listEventsInRange(_ call: CAPPluginCall) {
        do {
            let input = try ListEventsInRangeInput(call: call)
            let result = try implementation.listEventsInRange(input)
            call.resolve(result.toJSON())
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func modifyCalendar(_ call: CAPPluginCall) {
        do {
            let input = try ModifyCalendarInput(call: call)
            try implementation.modifyCalendar(input)
            call.resolve()
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }
}
