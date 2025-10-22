import Capacitor

struct DeleteEventWithPromptResult: JSResult {
    private let deleted: Bool

    init(deleted: Bool) {
        self.deleted = deleted
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["deleted"] = deleted
        return result
    }
}
