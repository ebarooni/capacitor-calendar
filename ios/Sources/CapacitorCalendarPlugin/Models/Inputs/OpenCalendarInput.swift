import Capacitor

struct OpenCalendarInput {
    private var date: Double?

    init(call: CAPPluginCall) {
        self.date = call.getDouble("date")
    }

    func getDate() -> TimeInterval {
        if let date = date {
            return ImplementationHelper.dateFromTimestamp(date).timeIntervalSinceReferenceDate
        } else {
            return Date.timeIntervalSinceReferenceDate
        }
    }
}
