import Capacitor

struct DeleteEventInput {
    private let commit: Bool
    private let id: String
    private let instanceDate: Double?
    private let span: EventSpan

    init(call: CAPPluginCall) throws {
        self.commit = call.getBool("commit", true)
        guard let id = call.getString("id") else {
            throw PluginError.idMissing
        }
        self.id = id
        self.instanceDate = call.getDouble("instanceDate")
        if let spanInt = call.getInt("span"), let span = EventSpan(rawValue: spanInt) {
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

    func getInstanceDate() -> Date? {
        guard let instanceDate = instanceDate else { return nil }
        return ImplementationHelper.dateFromTimestamp(instanceDate)
    }

    func getSpan() -> EventSpan {
        return span
    }
}
