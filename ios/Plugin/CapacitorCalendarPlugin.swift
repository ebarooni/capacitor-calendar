import Capacitor

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
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func checkAllPermissions(_ call: CAPPluginCall) {
        do {
            let result = try implementation.checkAllPermissions()
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func requestPermission(_ call: CAPPluginCall) {
        Task {
            do {
                let input = try RequestPermissionInput(call: call)
                let result = try await implementation.requestionPermission(input: input)
                resolveCall(call, result)
            } catch let error {
                rejectCall(call, error)
            }
        }
    }

    @objc public func requestAllPermissions(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await implementation.requestAllPermissions()
                resolveCall(call, result)
            } catch let error {
                rejectCall(call, error)
            }
        }
    }

    @objc public func requestWriteOnlyCalendarAccess(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await implementation.requestWriteOnlyCalendarAccess()
                resolveCall(call, result)
            } catch let error {
                rejectCall(call, error)
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
                resolveCall(call, result)
            } catch let error {
                rejectCall(call, error)
            }
        }
    }

    @objc public func requestFullRemindersAccess(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await implementation.requestFullRemindersAccess()
                resolveCall(call, result)
            } catch let error {
                rejectCall(call, error)
            }
        }
    }

    @objc public func createEventWithPrompt(_ call: CAPPluginCall) {
        Task {
            do {
                let input = CreateEventWithPromptInput(call: call)
                let result = try await implementation.createEventWithPrompt(with: input)
                resolveCall(call, result)
            } catch let error {
                rejectCall(call, error)
            }
        }
    }

    @objc public func modifyEventWithPrompt(_ call: CAPPluginCall) {
        Task {
            do {
                let input = try ModifyEventWithPromptInput(call: call)
                let result = try await implementation.modifyEventWithPrompt(input: input)
                resolveCall(call, result)
            } catch let error {
                rejectCall(call, error)
            }
        }
    }

    @objc public func createEvent(_ call: CAPPluginCall) {
        do {
            let input = try CreateEventInput(call: call)
            let result = try implementation.createEvent(input: input)
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func commit(_ call: CAPPluginCall) {
        do {
            try implementation.commit()
            resolveCall(call)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func modifyEvent(_ call: CAPPluginCall) {
        do {
            let input: ModifyEventInput = try ModifyEventInput(call: call)
            try implementation.modifyEvent(input: input)
            resolveCall(call)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func selectCalendarsWithPrompt(_ call: CAPPluginCall) {
        Task {
            do {
                let input = SelectCalendarsWithPromptInput(call: call)
                let result = try await implementation.selectCalendarsWithPrompt(input: input)
                resolveCall(call, result)
            } catch let error {
                rejectCall(call, error)
            }
        }
    }

    @objc public func fetchAllCalendarSources(_ call: CAPPluginCall) {
        do {
            resolveCall(call, try implementation.fetchAllCalendarSources())
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func listCalendars(_ call: CAPPluginCall) {
        do {
            resolveCall(call, try implementation.listCalendars())
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func fetchAllRemindersSources(_ call: CAPPluginCall) {
        fetchAllCalendarSources(call)
    }

    @objc public func openReminders(_ call: CAPPluginCall) {
        Task {
            do {
                try await implementation.openReminders()
                resolveCall(call)
            } catch let error {
                rejectCall(call, error)
            }
        }
    }

    @objc public func getDefaultCalendar(_ call: CAPPluginCall) {
        do {
            let result = try implementation.getDefaultCalendar()
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func getDefaultRemindersList(_ call: CAPPluginCall) {
        do {
            let result = try implementation.getDefaultRemindersList()
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func getRemindersLists(_ call: CAPPluginCall) {
        do {
            let result = try implementation.getRemindersLists()
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func openCalendar(_ call: CAPPluginCall) {
        Task {
            do {
                let input = OpenCalendarInput(call: call)
                try await implementation.openCalendar(input: input)
                resolveCall(call)
            } catch let error {
                rejectCall(call, error)
            }
        }
    }

    @objc public func createCalendar(_ call: CAPPluginCall) {
        do {
            let input = try CreateCalendarInput(call: call)
            let result = try implementation.createCalendar(input: input)
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func deleteCalendar(_ call: CAPPluginCall) {
        do {
            let input = try DeleteCalendarInput(call: call)
            try implementation.deleteCalendar(input: input)
            resolveCall(call)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func createReminder(_ call: CAPPluginCall) {
        do {
            let input = try CreateReminderInput(call: call)
            let result = try implementation.createReminder(input: input)
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func deleteRemindersById(_ call: CAPPluginCall) {
        do {
            let input = try DeleteRemindersByIdInput(call: call)
            let result = try implementation.deleteRemindersById(input)
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func deleteReminder(_ call: CAPPluginCall) {
        do {
            let input = try DeleteReminderInput(call: call)
            try implementation.deleteReminder(input)
            resolveCall(call)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func modifyReminder(_ call: CAPPluginCall) {
        do {
            let input = try ModifyReminderInput(call: call)
            try implementation.modifyReminder(input)
            resolveCall(call)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func getReminderById(_ call: CAPPluginCall) {
        do {
            let input = try GetReminderByIdInput(call: call)
            let result = try implementation.getReminderById(input)
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func getRemindersFromLists(_ call: CAPPluginCall) {
        Task {
            do {
                let input = try GetRemindersFromListsInput(call: call)
                let result = try await implementation.getRemindersFromLists(input)
                resolveCall(call, result)
            } catch let error {
                rejectCall(call, error)
            }
        }
    }

    @objc public func deleteEventsById(_ call: CAPPluginCall) {
        do {
            let input = try DeleteEventsByIdInput(call: call)
            let result = try implementation.deleteEventsById(input)
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func deleteEvent(_ call: CAPPluginCall) {
        do {
            let input = try DeleteEventInput(call: call)
            try implementation.deleteEvent(input)
            resolveCall(call)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func deleteEventWithPrompt(_ call: CAPPluginCall) {
        Task {
            do {
                let input = try DeleteEventWithPromptInput(call: call)
                let result = try await implementation.deleteEventWithPrompt(input)
                resolveCall(call, result)
            } catch let error {
                rejectCall(call, error)
            }
        }
    }

    @objc public func listEventsInRange(_ call: CAPPluginCall) {
        do {
            let input = try ListEventsInRangeInput(call: call)
            let result = try implementation.listEventsInRange(input)
            resolveCall(call, result)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func modifyCalendar(_ call: CAPPluginCall) {
        do {
            let input = try ModifyCalendarInput(call: call)
            try implementation.modifyCalendar(input)
            resolveCall(call)
        } catch let error {
            rejectCall(call, error)
        }
    }

    @objc public func deleteReminderWithPrompt(_ call: CAPPluginCall) {
        do {
            let input = try DeleteReminderWithPromptInput(call: call)
            try implementation.deleteReminderWithPrompt(input) { result in
                switch result {
                case .success(let result):
                    self.resolveCall(call, result)
                case .failure(let error):
                    self.rejectCall(call, error)
                }
            }
        } catch let error {
            rejectCall(call, error)
        }
    }

    private func rejectCall(_ call: CAPPluginCall, _ error: Error?) {
        if let msg = error?.localizedDescription {
            call.reject(msg)
        } else {
            call.reject(PluginError.customError("An unknown error has occured.").localizedDescription)
        }
    }

    private func resolveCall(_ call: CAPPluginCall) {
        resolveCall(call, nil)
    }

    private func resolveCall(_ call: CAPPluginCall, _ result: JSResult?) {
        if let result {
            call.resolve(result.toJSON())
        } else {
            call.resolve()
        }
    }
}
