import Capacitor

struct DeleteReminderInput {
    private let id: String
    private let commit: Bool

    init(call: CAPPluginCall) throws {
        guard let id = call.getString("id") else {
            throw PluginError.idMissing
        }
        self.id = id
        self.commit = call.getBool("commit", true)
    }

    func getId() -> String {
        return id
    }

    func getCommit() -> Bool {
        return commit
    }
}
