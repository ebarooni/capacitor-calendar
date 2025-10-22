import Capacitor

struct RequestPermissionResult: JSResult {
    private let state: CAPPermissionState

    init(state: CAPPermissionState) {
        self.state = state
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["result"] = state.rawValue
        return result
    }
}
