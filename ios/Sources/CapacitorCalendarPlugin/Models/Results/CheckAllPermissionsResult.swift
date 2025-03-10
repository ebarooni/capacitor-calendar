import Capacitor

struct CheckAllPermissionsResult: JSResult {
    private let statesDict: [String: String]

    init(statesDict: [String: String]) {
        self.statesDict = statesDict
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["result"] = statesDict as JSObject
        return result
    }
}
