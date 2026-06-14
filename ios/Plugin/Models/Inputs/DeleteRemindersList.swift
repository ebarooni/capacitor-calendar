import Capacitor

struct DeleteRemindersListInput {
    private let commit: Bool
    private let id: String

    init(call: CAPPluginCall) throws {
        self.commit = call.getBool("commit", true)
        guard let id = call.getString("id") else {
            throw PluginError.idMissing
        }
        self.id = id
    }

    func getCommit() -> Bool {
        return commit
    }

    func getId() -> String {
        return id
    }
}
