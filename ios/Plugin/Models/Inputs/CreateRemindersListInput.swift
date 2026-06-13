import Capacitor

struct CreateRemindersListInput {
    private var color: CGColor?
    private let commit: Bool
    private var sourceId: String?
    private let title: String

    init(call: CAPPluginCall) throws {
        guard let title = call.getString("title") else {
            throw PluginError.titleMissing
        }
        self.title = title
        self.color = CreateRemindersListInput.getListColorFromCall(call)
        self.commit = call.getBool("commit", true)
        if let sourceId = call.getString("sourceId") {
            self.sourceId = sourceId
        }
    }

    func getColor() -> CGColor? {
        return color
    }

    func getCommit() -> Bool {
        return commit
    }

    func getSourceId() -> String? {
        return sourceId
    }

    func getTitle() -> String {
        return title
    }

    private static func getListColorFromCall(_ call: CAPPluginCall) -> CGColor? {
        guard let colorName = call.getString("color") else {
            return nil
        }

        switch colorName.lowercased() {
        case "blue":    return UIColor.systemBlue.cgColor
        case "brown":   return UIColor.systemBrown.cgColor
        case "gray":    return UIColor.systemGray.cgColor
        case "green":   return UIColor.systemGreen.cgColor
        case "indigo":  return UIColor.systemIndigo.cgColor
        case "orange":  return UIColor.systemOrange.cgColor
        case "pink":    return UIColor.systemPink.cgColor
        case "purple":  return UIColor.systemPurple.cgColor
        case "red":     return UIColor.systemRed.cgColor
        case "teal":    return UIColor.systemTeal.cgColor
        case "yellow":  return UIColor.systemYellow.cgColor
        default:        return nil
        }
    }
}
