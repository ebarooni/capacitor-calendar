import Capacitor

struct ListEventsInRangeInput {
    private var from: Double
    private var to: Double

    init(call: CAPPluginCall) throws {
        guard let from = call.getDouble("from") else {
            throw PluginError.fromDateMissing
        }
        self.from = from
        guard let to = call.getDouble("to") else {
            throw PluginError.toDateMissing
        }
        self.to = to
    }

    func getFrom() -> Date {
        return ImplementationHelper.dateFromTimestamp(from)
    }

    func getTo() -> Date {
        return ImplementationHelper.dateFromTimestamp(to)
    }
}
