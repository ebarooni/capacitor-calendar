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
}
