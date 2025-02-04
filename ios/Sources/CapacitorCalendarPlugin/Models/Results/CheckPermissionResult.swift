import EventKit
import Capacitor

struct CheckPermissionResult {
    private let status: CAPPermissionState
    private let scope: CalendarPermissionScope

    init(status: CAPPermissionState) {
        self.status = status
        self.scope = scope
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["result"] = status.rawValue
        return result
    }
}
