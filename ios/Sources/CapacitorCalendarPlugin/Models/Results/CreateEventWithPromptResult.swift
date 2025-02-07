import Capacitor

struct CreateEventWithPromptResult: JSResult {
    private let id: String?

    init(id: String?) {
        self.id = id
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["id"] = id ?? NSNull()
        return result
    }
}
