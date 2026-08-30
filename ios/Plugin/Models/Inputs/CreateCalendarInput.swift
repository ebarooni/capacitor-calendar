import Capacitor

struct CreateCalendarInput {
    private let title: String
    private var color: CGColor
    private var sourceId: String?

    init(call: CAPPluginCall) throws {
        guard let title = call.getString("title") else {
            throw PluginError.titleMissing
        }
        self.title = title
        let colorHex = call.getString("color") ?? ImplementationHelper.defaultCalendarColorHex
        self.color = try UIColor.fromHex(colorHex).cgColor
        if let sourceId = call.getString("sourceId") {
            self.sourceId = sourceId
        }
    }

    func getTitle() -> String {
        return title
    }

    func getColor() -> CGColor {
        return color
    }

    func getSourceId() -> String? {
        return sourceId
    }
}
