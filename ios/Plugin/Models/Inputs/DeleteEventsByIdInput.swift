import Capacitor

struct DeleteEventsByIdInput {
    private let commit: Bool
    private let ids: [String]
    private let span: EventSpan

    init(call: CAPPluginCall) throws {
        self.commit = call.getBool("commit", true)
        guard let ids = call.getArray("ids") as? [String] else {
            throw PluginError.idMissing
        }
        self.ids = ids
        if let spanInt = call.getInt("span"), let span = EventSpan(rawValue: spanInt) {
            self.span = span
        } else {
            self.span = .thisEvent
        }
    }

    func getCommit() -> Bool {
        return commit
    }

    func getIds() -> [String] {
        return ids
    }

    func getSpan() -> EventSpan {
        return span
    }
}
