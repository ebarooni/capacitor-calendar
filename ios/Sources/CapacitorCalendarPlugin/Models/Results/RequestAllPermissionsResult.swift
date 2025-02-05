import Capacitor

struct RequestAllPermissionsResult: JSResult {
    private let permissionsState: JSObject
    
    init(calendarState: CAPPermissionState, remindersState: CAPPermissionState) {
        var permissionsState = JSObject()
        permissionsState[CalendarPermissionScope.writeCalendar.rawValue] = calendarState.rawValue
        permissionsState[CalendarPermissionScope.readCalendar.rawValue] = calendarState.rawValue
        permissionsState[CalendarPermissionScope.writeReminders.rawValue] = remindersState.rawValue
        permissionsState[CalendarPermissionScope.readReminders.rawValue] = remindersState.rawValue
        self.permissionsState = permissionsState
    }
    
    func toJSON() -> JSObject {
        var result = JSObject()
        result["result"] = permissionsState
        return result
    }
}
