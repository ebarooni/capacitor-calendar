import EventKit
import Combine
import EventKitUI
import Capacitor

class CapacitorCalendarNew: NSObject, EKEventEditViewDelegate {
    private let plugin: CapacitorCalendarPlugin
    let eventStore = EKEventStore()
    private let createEventWithPromptResultEmitter = CurrentValueSubject<CheckedContinuation<CreateEventWithPromptResult, Error>?, Never>(nil)

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

        guard let viewController = plugin.bridge?.viewController else {
            throw PluginError.missingViewController
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
    }
}
