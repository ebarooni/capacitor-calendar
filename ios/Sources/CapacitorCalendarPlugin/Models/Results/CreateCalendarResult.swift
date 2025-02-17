import Capacitor

struct CreateCalendarResult: JSResult {
    let id: String

    init(id: String?) throws {
        guard let id = id else {
            throw PluginError.failedToRetrieveCalendarId
        }
        self.id = id
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["id"] = id
        return result
    }
}
