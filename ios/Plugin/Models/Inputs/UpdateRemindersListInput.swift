import Capacitor

struct UpdateRemindersListInput {
    private let color: CGColor?
    private let commit: Bool
    private let id: String
    private let title: String?

    init(call: CAPPluginCall) throws {
        guard let id = call.getString("id") else {
            throw PluginError.idMissing
        }
        self.id = id
        self.title = call.getString("title")
        self.color = try UpdateRemindersListInput.getListColorFromCall(call)
        self.commit = call.getBool("commit", true)
    }

    func getColor() -> CGColor? {
        return color
    }

    func getCommit() -> Bool {
        return commit
    }

    func getId() -> String {
        return id
    }

    func getTitle() -> String? {
        return title
    }

    private static func getListColorFromCall(_ call: CAPPluginCall) throws -> CGColor? {
        guard let colorString = call.getString("color") else {
            return nil
        }
        return try ImplementationHelper.listColor(from: colorString)
    }
}
