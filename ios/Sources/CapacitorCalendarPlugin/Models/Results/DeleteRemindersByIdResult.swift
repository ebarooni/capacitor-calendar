import Capacitor

struct DeleteRemindersByIdResult: JSResult {
    var deletedArray: [String] = []
    var failedArray: [String] = []
    
    func toJSON() -> JSObject {
        var result = JSObject()
        var obj = JSObject()
        obj["deleted"] = deletedArray
        obj["failed"] = failedArray
        result["result"] = obj
        return result
    }
    
    mutating func deleted(_ id: String) {
        deletedArray.append(id)
    }
    
    mutating func failed(_ id: String) {
        failedArray.append(id)
    }
}
