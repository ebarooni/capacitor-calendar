import EventKit

class CapacitorCalendarNew {
    private let plugin: CapacitorCalendarPlugin
    private let eventStore = EKEventStore()

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
}
