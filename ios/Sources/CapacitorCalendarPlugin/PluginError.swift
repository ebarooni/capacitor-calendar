import Foundation

enum PluginError: LocalizedError {
    case scopeMissing
    case invalidScope
    case unhandledPermissionState
    case viewControllerMissing
    case processFailed
    case idMissing
    case eventNotFound
    case unimplemented(String)
    case customError(String)

    var errorDescription: String? {
        switch self {
        case .scopeMissing:
            return NSLocalizedString("Scope must be provided.", comment: "Scope missing error")
        case .invalidScope:
            return NSLocalizedString("Invalid scope.", comment: "Invalid scope error")
        case .unhandledPermissionState:
            return NSLocalizedString("Unhandled permission state.", comment: "Unhandled permission state error")
        case .viewControllerMissing:
            return NSLocalizedString("Missing view controller.", comment: "View controller missing error")
        case .idMissing:
            return NSLocalizedString("Event ID must be provided.", comment: "Event ID missing error")
        case.eventNotFound:
            return NSLocalizedString("Event not found.", comment: "Event not found error")
        case .processFailed:
            return NSLocalizedString("Process failed.", comment: "Process failed error")
        case .unimplemented(let methodName):
            return NSLocalizedString("\(methodName) is not implemented on iOS.", comment: "\(methodName) is not implemented on iOS")
        case .customError(let message):
            return message
        }
    }
}
