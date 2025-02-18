import Capacitor

struct CreateCalendarInput {
    private let title: String
    private var color: CGColor?
    private var sourceId: String?

    init(call: CAPPluginCall) throws {
        guard let title = call.getString("title") else {
            throw PluginError.titleMissing
        }
        self.title = title
        if let color = call.getString("color") {
            self.color = try UIColor.fromHex(color).cgColor
        }
        if let sourceId = call.getString("sourceId") {
            self.sourceId = sourceId
        }
    }

    func getTitle() -> String {
        return title
    }

    func getColor() -> CGColor? {
        return color
    }

    func getSourceId() -> String? {
        return sourceId
    }
}
