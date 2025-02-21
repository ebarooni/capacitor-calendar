import Capacitor
import EventKit

struct DeleteEventsByIdInput {
    private let ids: [String]
    private let span: EKSpan

    init(call: CAPPluginCall) throws {
        guard let ids = call.getArray("ids") as? [String] else {
            throw PluginError.idMissing
        }
        self.ids = ids
        if let spanInt = call.getInt("span"), let span = EKSpan(rawValue: spanInt) {
            self.span = span
        } else {
            self.span = .thisEvent
        }
    }

    func getIds() -> [String] {
        return ids
    }
    
    func getSpan() -> EKSpan {
        return span
    }
}
