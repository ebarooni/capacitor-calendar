import Capacitor

struct ModifyCalendarInput {
    private let id: String
    private let title: String?
    private let color: CGColor?

    init(call: CAPPluginCall) throws {
        guard let id = call.getString("id") else {
            throw PluginError.calendarIdMissing
        }
        self.id = id
        self.title = call.getString("title")
        if let color = call.getString("color") {
            self.color = try UIColor.fromHex(color).cgColor
        } else {
            self.color = nil
        }
        if self.title == nil && self.color == nil {
            throw PluginError.noFieldsToModify
        }
    }

    func getId() -> String {
        return id
    }

    func getTitle() -> String? {
        return title
    }

    func getColor() -> CGColor? {
        return color
    }
}
