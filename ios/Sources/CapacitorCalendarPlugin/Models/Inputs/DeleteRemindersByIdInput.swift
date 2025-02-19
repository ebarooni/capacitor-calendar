import Capacitor

struct DeleteRemindersByIdInput {
    let ids: [String]

    init(call: CAPPluginCall) throws {
        guard let ids = call.getArray("ids") as? [String] else {
            throw PluginError.idMissing
        }
        self.ids = ids
    }

    func getIds() -> [String] {
        return ids
    }
}
