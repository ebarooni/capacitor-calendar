import Capacitor
import EventKit

struct DeleteEventInput {
    private let commit: Bool
    private let id: String
    private let span: EKSpan

    init(call: CAPPluginCall) throws {
        self.commit = call.getBool("commit", true)
        guard let id = call.getString("id") else {
            throw PluginError.idMissing
        }
        self.id = id
        if let spanInt = call.getInt("span"), let span = EKSpan(rawValue: spanInt) {
            self.span = span
        } else {
            self.span = .thisEvent
        }
    }

    func getCommit() -> Bool {
        return commit
    }

    func getId() -> String {
        return id
    }

    func getSpan() -> EKSpan {
        return span
    }
}
