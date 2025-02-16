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

    func getDefaultCalendar() throws -> GetDefaultCalendarResult {
        return GetDefaultCalendarResult(calendar: eventStore.defaultCalendarForNewEvents)
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
