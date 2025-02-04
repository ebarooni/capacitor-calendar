import Foundation

enum PluginError: LocalizedError {
    case scopeMissing
    case invalidScope
    case unhandledPermissionState
    case customError(String)

    var errorDescription: String? {
        switch self {
        case .scopeMissing:
            return NSLocalizedString("Scope must be provided.", comment: "Scope missing error")
        case .invalidScope:
            return NSLocalizedString("Invalid scope.", comment: "Invalid scope")
        case .unhandledPermissionState:
            return NSLocalizedString("Unhandled permission state.", comment: "Unhandled permission state")
        case .customError(let message):
            return message
        }
    }
}
