import Foundation

enum PluginError: LocalizedError {
    case scopeMissing
    case invalidScope
    case unhandledPermissionState
    case viewControllerMissing
    case processFailed
    case idMissing
    case titleMissing
    case failedToRetrieveEventId
    case failedToRetrieveCalendarId
    case eventNotFound
    case reminderNotFound
    case invalidUrl
    case unableToOpenUrl
    case failedToLaunchReminders
    case failedToLaunchCalendar
    case invalidColor
    case calendarNotFound
    case missingFrequency
    case missingInterval
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
        case .titleMissing:
            return NSLocalizedString("Title must be provided.", comment: "Title missing error")
        case .failedToRetrieveEventId:
            return NSLocalizedString("Failed to retrieve event ID.", comment: "Failed to retrieve event ID error")
        case .failedToRetrieveCalendarId:
            return NSLocalizedString("Failed to retrieve calendar ID.", comment: "Failed to retrieve calendar ID error")
        case .eventNotFound:
            return NSLocalizedString("Event not found.", comment: "Event not found error")
        case .reminderNotFound:
            return NSLocalizedString("Reminder not found", comment: "Reminder not found error")
        case .calendarNotFound:
            return NSLocalizedString("Calendar not found.", comment: "Calendar not found error")
        case .invalidUrl:
            return NSLocalizedString("Invalid URL.", comment: "Invalid URL error")
        case .unableToOpenUrl:
            return NSLocalizedString("Unable to open URL.", comment: "Unable to open URL error")
        case .failedToLaunchReminders:
            return NSLocalizedString("Failed to launch reminders app.", comment: "Failed to launch reminders app error")
        case .failedToLaunchCalendar:
            return NSLocalizedString("Failed to launch calendar app.", comment: "Failed to launch calendar app error")
        case .invalidColor:
            return NSLocalizedString("Invalid color format.", comment: "Invalid color format error")
        case .processFailed:
            return NSLocalizedString("Process failed.", comment: "Process failed error")
        case .missingFrequency:
            return NSLocalizedString("Frequency must be provided.", comment: "Frequency missing error")
        case .missingInterval:
            return NSLocalizedString("Interval must be provided.", comment: "Interval missing error")
        case .unimplemented(let methodName):
            return NSLocalizedString("\(methodName) is not implemented on iOS.", comment: "\(methodName) is not implemented on iOS")
        case .customError(let message):
            return message
        }
    }
}
