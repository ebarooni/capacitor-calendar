import Capacitor

struct DeleteCalendarInput {
    private let id: String

    init(call: CAPPluginCall) throws {
        guard let id = call.getString("id") else {
            throw PluginError.idMissing
        }
        self.id = id
    }

    func getId() -> String {
        return id
    }
}
