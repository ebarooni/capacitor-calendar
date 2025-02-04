import EventKit

class CapacitorCalendarNew {
    private let plugin: CapacitorCalendarPlugin
    private let eventStore = EKEventStore()

    init(plugin: CapacitorCalendarPlugin) {
        self.plugin = plugin
    }

    func checkPermission(input: CheckPermissionInput) throws -> CheckPermissionResult {
        let scope = input.getScope()
        let status: EKAuthorizationStatus

        switch scope {
        case .readCalendar, .writeCalendar:
            status = EKEventStore.authorizationStatus(for: .event)
        case .readReminders, .writeReminders:
            status = EKEventStore.authorizationStatus(for: .reminder)
        }

        var result: CheckPermissionResult

        switch status {
        case .authorized, .fullAccess:
            result = CheckPermissionResult(status: CAPPermissionState.granted)
        case .denied, .restricted:
            result = CheckPermissionResult(status: CAPPermissionState.denied)
        case .writeOnly:
            if scope == .writeCalendar || scope == .writeReminders {
                result = CheckPermissionResult(status: CAPPermissionState.granted)
            } else {
                result = CheckPermissionResult(status: CAPPermissionState.prompt)
            }
        case .notDetermined:
            result = CheckPermissionResult(status: CAPPermissionState.prompt)
        default:
            throw PluginError.unhandledPermissionState
        }

        return result
    }
}
