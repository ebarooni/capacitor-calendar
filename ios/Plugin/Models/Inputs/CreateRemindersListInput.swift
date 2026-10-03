import Capacitor
import UIKit

struct CreateRemindersListInput {
    private var color: CGColor
    private let commit: Bool
    private var sourceId: String?
    private let title: String

    init(call: CAPPluginCall) throws {
        guard let title = call.getString("title") else {
            throw PluginError.titleMissing
        }
        self.title = title
        self.color = try CreateRemindersListInput.getListColorFromCall(call)
        self.commit = call.getBool("commit", true)
        if let sourceId = call.getString("sourceId") {
            self.sourceId = sourceId
        }
    }

    func getColor() -> CGColor {
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

    private static func getListColorFromCall(_ call: CAPPluginCall) throws -> CGColor {
        guard let colorString = call.getString("color") else {
            return UIColor.systemBlue.cgColor
        }
        return try ImplementationHelper.listColor(from: colorString)
    }
}
