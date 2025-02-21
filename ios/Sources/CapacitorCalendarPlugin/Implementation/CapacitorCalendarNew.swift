import EventKit
import Combine
import EventKitUI
import Capacitor

class CapacitorCalendarNew: NSObject, EKEventEditViewDelegate, EKCalendarChooserDelegate {
    private let plugin: CapacitorCalendarPlugin
    let eventStore = EKEventStore()
    private let createEventWithPromptResultEmitter = CurrentValueSubject<CheckedContinuation<CreateEventWithPromptResult, Error>?, Never>(nil)
    private let modifyEventWithPromptResultEmitter = CurrentValueSubject<CheckedContinuation<ModifyEventWithPromptResult, Error>?, Never>(nil)
    private let selectCalendarsWithPromptResultEmitter = CurrentValueSubject<CheckedContinuation<SelectCalendarsWithPromptResult, Error>?, Never>(nil)

    init(plugin: CapacitorCalendarPlugin) {
        self.plugin = plugin
    }

    func checkPermission(input: CheckPermissionInput) throws -> CheckPermissionResult {
        let scope = input.getScope()
        let state: EKAuthorizationStatus

        switch scope {
        case .readCalendar, .writeCalendar:
            state = EKEventStore.authorizationStatus(for: .event)
        case .readReminders, .writeReminders:
            state = EKEventStore.authorizationStatus(for: .reminder)
        }

        let detectedState = try ImplementationHelper.permissionStateToResult(state: state, scope: scope)
        return CheckPermissionResult(status: detectedState)
    }

    func checkAllPermissions() throws -> CheckAllPermissionsResult {
        let calendarState = EKEventStore.authorizationStatus(for: .event)
        let remindersState = EKEventStore.authorizationStatus(for: .reminder)
        var permissionsResult: [String: String] = [:]

        for scope in CalendarPermissionScope.allCases {
            let state: EKAuthorizationStatus

            switch scope {
            case .readCalendar, .writeCalendar:
                state = calendarState
            case .readReminders, .writeReminders:
                state = remindersState
            }

            let detectedState = try ImplementationHelper.permissionStateToResult(state: state, scope: scope)
            permissionsResult[scope.rawValue] = detectedState.rawValue
        }

        return CheckAllPermissionsResult(statesDict: permissionsResult)
    }

    func requestionPermission(input: RequestPermissionInput) async throws -> RequestPermissionResult {
        let scope = input.getScope()
        var state: CAPPermissionState
        var result: RequestPermissionResult

        switch scope {
        case .writeCalendar:
            state = try await ImplementationHelper.requestWriteOnlyCalendarAccess(eventStore: eventStore)
            result = RequestPermissionResult(state: state)
        case .readCalendar:
            state = try await ImplementationHelper.requestFullCalendarAccess(eventStore: eventStore)
            result = RequestPermissionResult(state: state)
        case .writeReminders, .readReminders:
            state = try await ImplementationHelper.requestFullRemindersAccess(eventStore: eventStore)
            result = RequestPermissionResult(state: state)
        }

        return result
    }

    func requestAllPermissions() async throws -> RequestAllPermissionsResult {
        let calendarState = try await ImplementationHelper.requestFullCalendarAccess(eventStore: eventStore)
        let remindersState = try await ImplementationHelper.requestFullRemindersAccess(eventStore: eventStore)
        let result = RequestAllPermissionsResult(calendarState: calendarState, remindersState: remindersState)
        return result
    }

    func requestWriteOnlyCalendarAccess() async throws -> RequestPermissionResult {
        let state = try await ImplementationHelper.requestWriteOnlyCalendarAccess(eventStore: eventStore)
        let result = RequestPermissionResult(state: state)
        return result
    }

    func requestFullCalendarAccess() async throws -> RequestPermissionResult {
        let state = try await  ImplementationHelper.requestFullCalendarAccess(eventStore: eventStore)
        let result = RequestPermissionResult(state: state)
        return result
    }

    func requestFullRemindersAccess() async throws -> RequestPermissionResult {
        let state = try await  ImplementationHelper.requestFullRemindersAccess(eventStore: eventStore)
        let result = RequestPermissionResult(state: state)
        return result
    }

    func createEventWithPrompt(with input: CreateEventWithPromptInput) async throws -> CreateEventWithPromptResult {
        let event = EKEvent(eventStore: eventStore)
        event.title = input.getTitle()
        event.alarms = input.getAlerts()
        event.isAllDay = input.getIsAllDay()
        event.calendar = input.getCalendar(from: eventStore)
        event.location = input.getLocation()
        event.startDate = input.getStartDate()
        event.endDate = input.getEndDate()
        event.url = input.getUrl()
        event.notes = input.getDescription()
        if let availability = input.getAvailability() {
            event.availability = availability
        }
        guard let viewController = plugin.bridge?.viewController else {
            throw PluginError.viewControllerMissing
        }

        return try await withCheckedThrowingContinuation { continuation in
            Task { @MainActor in
                let eventEditViewController = EKEventEditViewController()
                eventEditViewController.event = event
                eventEditViewController.eventStore = eventStore
                eventEditViewController.editViewDelegate = self
                viewController.present(eventEditViewController, animated: true) {
                    self.createEventWithPromptResultEmitter.send(continuation)
                }
            }
        }
    }

    func modifyEventWithPrompt(input: ModifyEventWithPromptInput) async throws -> ModifyEventWithPromptResult {
        let event = try input.getEvent(from: eventStore)
        if let title = input.getTitle() {
            event.title = title
        }
        if let calendar = input.getCalendar(from: eventStore) {
            event.calendar = calendar
        }
        if let location = input.getLocation() {
            event.location = location
        }
        if let startDate = input.getStartDate() {
            event.startDate = startDate
        }
        if let endDate = input.getEndDate() {
            event.endDate = endDate
        }
        if let isAllDay = input.getIsAllDay() {
            event.isAllDay = isAllDay
        }
        if let url = input.getUrl() {
            event.url = url
        }
        if let description = input.getDescription() {
            event.notes = description
        }
        if let availability = input.getAvailability() {
            event.availability = availability
        }
        if let alerts = input.getAlerts() {
            event.alarms = alerts
        }
        guard let viewController = plugin.bridge?.viewController else {
            throw PluginError.viewControllerMissing
        }
        return try await withCheckedThrowingContinuation { continuation in
            Task { @MainActor in
                let eventEditViewController = EKEventEditViewController()
                eventEditViewController.event = event
                eventEditViewController.eventStore = eventStore
                eventEditViewController.editViewDelegate = self
                viewController.present(eventEditViewController, animated: true) {
                    self.modifyEventWithPromptResultEmitter.send(continuation)
                }
            }
        }
    }

    func createEvent(input: CreateEventInput) throws -> CreateEventResult {
        let event = EKEvent(eventStore: eventStore)
        event.title = input.getTitle()
        event.alarms = input.getAlerts()
        event.isAllDay = input.getIsAllDay()
        event.calendar = input.getCalendar(from: eventStore)
        event.location = input.getLocation()
        event.startDate = input.getStartDate()
        event.endDate = input.getEndDate()
        event.url = input.getUrl()
        event.notes = input.getDescription()
        if let availability = input.getAvailability() {
            event.availability = availability
        }
        try eventStore.save(event, span: .thisEvent, commit: input.getCommit())
        return try CreateEventResult(id: event.eventIdentifier)
    }

    func commit() throws {
        try eventStore.commit()
    }

    func modifyEvent(input: ModifyEventInput) throws {
        let event = try input.getEvent(from: eventStore)
        if let title = input.getTitle() {
            event.title = title
        }
        if let calendar = input.getCalendar(from: eventStore) {
            event.calendar = calendar
        }
        if let location = input.getLocation() {
            event.location = location
        }
        if let startDate = input.getStartDate() {
            event.startDate = startDate
        }
        if let endDate = input.getEndDate() {
            event.endDate = endDate
        }
        if let isAllDay = input.getIsAllDay() {
            event.isAllDay = isAllDay
        }
        if let url = input.getUrl() {
            event.url = url
        }
        if let description = input.getDescription() {
            event.notes = description
        }
        if let availability = input.getAvailability() {
            event.availability = availability
        }
        if let alerts = input.getAlerts() {
            event.alarms = alerts
        }
        try eventStore.save(event, span: input.getSpan())
    }

    func selectCalendarsWithPrompt(input: SelectCalendarsWithPromptInput) async throws -> SelectCalendarsWithPromptResult {
        guard let viewController = plugin.bridge?.viewController else {
            throw PluginError.viewControllerMissing
        }
        return try await withCheckedThrowingContinuation { continuation in
            Task { @MainActor in
                let calendarChooser = EKCalendarChooser(
                    selectionStyle: input.getSelectionStyle(),
                    displayStyle: input.getDisplayStyle(),
                    eventStore: eventStore
                )
                calendarChooser.showsDoneButton = true
                calendarChooser.showsCancelButton = true
                calendarChooser.delegate = self

                viewController.present(UINavigationController(rootViewController: calendarChooser), animated: true) {
                    self.selectCalendarsWithPromptResultEmitter.send(continuation)
                }
            }
        }
    }

    func fetchAllCalendarSources() throws -> FetchAllCalendarSourcesResult {
        return FetchAllCalendarSourcesResult(eventStore.sources)
    }

    func listCalendars() throws -> ListCalendarsResult {
        return ListCalendarsResult(eventStore.calendars(for: .event))
    }

    func openReminders() async throws {
        guard let url = URL(string: "x-apple-reminderkit://") else {
            throw PluginError.invalidUrl
        }
        guard await UIApplication.shared.canOpenURL(url) else {
            throw PluginError.unableToOpenUrl
        }
        let success = await UIApplication.shared.open(url, options: [:])
        if !success {
            throw PluginError.failedToLaunchReminders
        }
    }

    func openCalendar(input: OpenCalendarInput) async throws {
        guard let url = URL(string: "calshow:\(input.getDate())") else {
            throw PluginError.invalidUrl
        }
        guard await UIApplication.shared.canOpenURL(url) else {
            throw PluginError.unableToOpenUrl
        }
        let success = await UIApplication.shared.open(url, options: [:])
        if !success {
            throw PluginError.failedToLaunchCalendar
        }
    }

    func createCalendar(input: CreateCalendarInput) throws -> CreateCalendarResult {
        let newCalendar = EKCalendar(for: .event, eventStore: eventStore)
        newCalendar.title = input.getTitle()
        newCalendar.cgColor = input.getColor() ?? eventStore.defaultCalendarForNewEvents?.cgColor
        newCalendar.source = eventStore.sources.first(where: { $0.sourceIdentifier == input.getSourceId() }) ?? eventStore.defaultCalendarForNewEvents?.source
        try eventStore.saveCalendar(newCalendar, commit: true)
        return try CreateCalendarResult(id: newCalendar.calendarIdentifier)
    }

    func getDefaultCalendar() throws -> GetDefaultCalendarResult {
        return GetDefaultCalendarResult(calendar: eventStore.defaultCalendarForNewEvents)
    }

    func getDefaultRemindersList() throws -> GetDefaultCalendarResult {
        return GetDefaultCalendarResult(calendar: eventStore.defaultCalendarForNewReminders())
    }

    func getRemindersLists() throws -> ListCalendarsResult {
        return ListCalendarsResult(eventStore.calendars(for: .reminder))
    }

    func deleteCalendar(input: DeleteCalendarInput) throws {
        if let calendar = eventStore.calendar(withIdentifier: input.getId()) {
            try eventStore.removeCalendar(calendar, commit: true)
        } else {
            throw PluginError.calendarNotFound
        }
    }

    func createReminder(input: CreateReminderInput) throws -> CreateReminderResult {
        let reminder = EKReminder(eventStore: eventStore)
        reminder.title = input.getTitle()
        if let listId = input.getListId(from: eventStore) {
            guard let list = eventStore.calendar(withIdentifier: listId) else {
                throw PluginError.listNotFound
            }
            reminder.calendar = list
        }
        if let prio = input.getPriority() {
            reminder.priority = prio
        }
        reminder.isCompleted = input.getIsCompleted()
        if let startDate = input.getStartDate() {
            reminder.startDateComponents = startDate
        }
        if let deuDate = input.getDueDate() {
            reminder.dueDateComponents = deuDate
        }
        if let completionDate = input.getCompletionDate() {
            reminder.completionDate = completionDate
        }
        reminder.notes = input.getNotes()
        reminder.url = input.getUrl()
        reminder.location = input.getLocation()
        reminder.alarms = input.getAlerts()
        reminder.recurrenceRules = input.getRecurrenceRule()
        try eventStore.save(reminder, commit: true)
        return CreateReminderResult(reminder: reminder)
    }

    func deleteRemindersById(_ input: DeleteRemindersByIdInput) throws -> DeleteRemindersByIdResult {
        var result = DeleteRemindersByIdResult()
        input.getIds().forEach { id in
            do {
                try ImplementationHelper.deleteReminder(reminderId: id, eventStore: eventStore)
                result.deleted(id)
            } catch {
                result.failed(id)
            }
        }
        return result
    }

    func deleteReminder(_ input: DeleteReminderInput) throws {
        try ImplementationHelper.deleteReminder(reminderId: input.getId(), eventStore: eventStore)
    }

    func modifyReminder(_ input: ModifyReminderInput) throws {
        guard let reminder = eventStore.calendarItem(withIdentifier: input.getId()) as? EKReminder else {
            throw PluginError.reminderNotFound
        }
        if let title = input.getTitle() {
            reminder.title = title
        }
        if let listId = input.getListId() {
            guard let list = eventStore.calendar(withIdentifier: listId) else {
                throw PluginError.listNotFound
            }
            reminder.calendar = list
        }
        if let prio = input.getPriority() {
            reminder.priority = prio
        }
        if let isCompleted = input.getIsCompleted() {
            reminder.isCompleted = isCompleted
        }
        if let startDate = input.getStartDate() {
            reminder.startDateComponents = startDate
        }
        if let deuDate = input.getDueDate() {
            reminder.dueDateComponents = deuDate
        }
        if let completionDate = input.getCompletionDate() {
            reminder.completionDate = completionDate
        }
        if let notes = input.getNotes() {
            reminder.notes = notes
        }
        if let url = input.getUrl() {
            reminder.url = url
        }
        if let location = input.getLocation() {
            reminder.location = location
        }
        if let alarms = input.getAlerts() {
            reminder.alarms = alarms
        }
        if let recurrenceRule = input.getRecurrenceRule() {
            reminder.recurrenceRules = recurrenceRule
        }
        try eventStore.save(reminder, commit: true)
    }

    func getReminderById(_ input: GetReminderByIdInput) throws -> GetReminderByIdResult {
        let reminder = eventStore.calendarItem(withIdentifier: input.getId()) as? EKReminder
        return try GetReminderByIdResult(reminder: reminder)
    }

    func getRemindersFromLists(_ input: GetRemindersFromListsInput) async throws -> GetRemindersFromListsResult {
        let lists = try input.getLists(from: eventStore)
        let predicate = eventStore.predicateForReminders(in: lists)
        return try await withCheckedThrowingContinuation { continuation in
            eventStore.fetchReminders(matching: predicate) { reminders in
                continuation.resume(returning: GetRemindersFromListsResult(reminders: reminders))
            }
        }
    }
    
    func deleteEventsById(_ input: DeleteEventsByIdInput) throws -> DeleteEventsByIdResult {
        var result = DeleteEventsByIdResult()
        input.getIds().forEach { id in
            do {
                try ImplementationHelper.deleteEvent(id, input.getSpan(), eventStore)
                result.deleted(id)
            } catch {
                result.failed(id)
            }
        }
        return result
    }
    
    func deleteEvent(_ input: DeleteEventInput) throws {
        try ImplementationHelper.deleteEvent(input.getId(), input.getSpan(), eventStore)
    }
    
    func deleteEventWithPrompt(_ input: DeleteEventWithPromptInput) async throws -> DeleteEventWithPromptResult {
        guard let viewController = plugin.bridge?.viewController else {
            throw PluginError.viewControllerMissing
        }
        guard let event = eventStore.event(withIdentifier: input.getId()) else {
            throw PluginError.eventNotFound
        }

        return try await withCheckedThrowingContinuation { continuation in
            Task { @MainActor in
                let alert = UIAlertController(
                    title: input.getTitle(),
                    message: input.getMessage(),
                    preferredStyle: .alert
                )

                alert.addAction(UIAlertAction(title: input.getCancelButtonText(), style: .cancel, handler: { _ in
                    continuation.resume(returning: DeleteEventWithPromptResult(deleted: false))
                }))

                alert.addAction(UIAlertAction(title: input.getConfirmButtonText(), style: .destructive, handler: { _ in
                    do {
                        try ImplementationHelper.deleteEvent(event.eventIdentifier, input.getSpan(), self.eventStore)
                        continuation.resume(returning: DeleteEventWithPromptResult(deleted: true))
                    } catch let error {
                        continuation.resume(throwing: error)
                    }
                }))

                viewController.present(alert, animated: true)
            }
        }
    }

    func eventEditViewController(_ controller: EKEventEditViewController, didCompleteWith action: EKEventEditViewAction) {
        var createEventWithPromptCancellable: AnyCancellable?
        createEventWithPromptCancellable = self.createEventWithPromptResultEmitter.sink { promise in
            guard let promise = promise else {
                return
            }
            switch action {
            case .saved:
                promise.resume(returning: CreateEventWithPromptResult(id: controller.event?.eventIdentifier))
            case .canceled, .cancelled, .deleted:
                promise.resume(returning: CreateEventWithPromptResult(id: nil))
            @unknown default:
                promise.resume(throwing: PluginError.processFailed)
            }

            controller.dismiss(animated: true) {
                createEventWithPromptCancellable?.cancel()
            }
        }

        var modifyEventWithPromptCancellable: AnyCancellable?
        modifyEventWithPromptCancellable = self.modifyEventWithPromptResultEmitter.sink { promise in
            guard let promise = promise else {
                return
            }

            do {
                promise.resume(returning: try ModifyEventWithPromptResult(action: action))
            } catch let error {
                promise.resume(throwing: error)
            }

            controller.dismiss(animated: true) {
                modifyEventWithPromptCancellable?.cancel()
            }
        }
    }

    func calendarChooserDidFinish(_ calendarChooser: EKCalendarChooser) {
        var selectCalendarsWithPromptCancellable: AnyCancellable?
        selectCalendarsWithPromptCancellable = self.selectCalendarsWithPromptResultEmitter.sink { promise in
            guard let promise = promise else {
                return
            }

            promise.resume(returning: SelectCalendarsWithPromptResult(calendarChooser.selectedCalendars))
            self.plugin.bridge?.viewController?.dismiss(animated: true) {
                selectCalendarsWithPromptCancellable?.cancel()
            }
        }
    }

    func calendarChooserDidCancel(_ calendarChooser: EKCalendarChooser) {
        var selectCalendarsWithPromptCancellable: AnyCancellable?
        selectCalendarsWithPromptCancellable = self.selectCalendarsWithPromptResultEmitter.sink { promise in
            guard let promise = promise else {
                return
            }

            promise.resume(returning: SelectCalendarsWithPromptResult(calendarChooser.selectedCalendars))
            self.plugin.bridge?.viewController?.dismiss(animated: true) {
                selectCalendarsWithPromptCancellable?.cancel()
            }
        }
    }
}
