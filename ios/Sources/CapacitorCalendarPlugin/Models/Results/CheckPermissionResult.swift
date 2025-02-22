import EventKit
import Capacitor

struct CheckPermissionResult: JSResult {
    private let status: CAPPermissionState

    init(status: CAPPermissionState) {
        self.status = status
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["result"] = status.rawValue
        return result
    }
}
