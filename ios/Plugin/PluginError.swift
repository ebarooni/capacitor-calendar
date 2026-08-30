import Foundation

enum PluginError: LocalizedError {
    case calendarIdMissing
    case calendarNotFound
    case calendarNotModifiable
    case calendarSourceNotFound
    case customError(String)
    case eventNotFound
    case failedToLaunchCalendar
    case failedToLaunchReminders
    case failedToRetrieveCalendarId
    case failedToRetrieveEventId
    case fromDateMissing
    case idMissing
    case invalidColor
    case invalidScope
    case invalidUrl
    case listIdsMissing
    case listNotFound
    case listNotModifiable
    case messageMissing
    case missingFrequency
    case missingInterval
    case noFieldsToModify
    case processFailed
    case reminderNotFound
    case scopeMissing
    case titleMissing
    case toDateMissing
    case unableToOpenUrl
    case unimplemented(String)
    case unhandledPermissionState
    case viewControllerMissing

    var errorDescription: String? {
        switch self {
        case .calendarIdMissing:
            return NSLocalizedString("Calendar ID must be provided.", comment: "Calendar ID missing error")
        case .calendarNotFound:
            return NSLocalizedString("Calendar not found.", comment: "Calendar not found error")
        case .calendarNotModifiable:
            return NSLocalizedString("Calendar is not modifiable.", comment: "Calendar not modifiable error")
        case .calendarSourceNotFound:
            return NSLocalizedString("Calendar source not found.", comment: "Calendar source not found error")
        case .customError(let message):
            return message
        case .eventNotFound:
            return NSLocalizedString("Event not found.", comment: "Event not found error")
        case .failedToLaunchCalendar:
            return NSLocalizedString("Failed to launch calendar app.", comment: "Failed to launch calendar app error")
        case .failedToLaunchReminders:
            return NSLocalizedString("Failed to launch reminders app.", comment: "Failed to launch reminders app error")
        case .failedToRetrieveCalendarId:
            return NSLocalizedString("Failed to retrieve calendar ID.", comment: "Failed to retrieve calendar ID error")
        case .failedToRetrieveEventId:
            return NSLocalizedString("Failed to retrieve event ID.", comment: "Failed to retrieve event ID error")
        case .fromDateMissing:
            return NSLocalizedString("From date must be provided.", comment: "From date missing error")
        case .idMissing:
            return NSLocalizedString("Event ID must be provided.", comment: "Event ID missing error")
        case .invalidColor:
            return NSLocalizedString("Invalid color format.", comment: "Invalid color format error")
        case .invalidScope:
            return NSLocalizedString("Invalid scope.", comment: "Invalid scope error")
        case .invalidUrl:
            return NSLocalizedString("Invalid URL.", comment: "Invalid URL error")
        case .listIdsMissing:
            return NSLocalizedString("List IDs must be provided.", comment: "List IDs missing error")
        case .listNotFound:
            return NSLocalizedString("List not found.", comment: "List not found error")
        case .listNotModifiable:
            return NSLocalizedString("List is not modifiable.", comment: "List not modifiable error")
        case .messageMissing:
            return NSLocalizedString("Message must be provided.", comment: "Message missing error")
        case .missingFrequency:
            return NSLocalizedString("Frequency must be provided.", comment: "Frequency missing error")
        case .missingInterval:
            return NSLocalizedString("Interval must be provided.", comment: "Interval missing error")
        case .noFieldsToModify:
            return NSLocalizedString("At least one of title or color must be provided.", comment: "No fields to modify error")
        case .processFailed:
            return NSLocalizedString("Process failed.", comment: "Process failed error")
        case .reminderNotFound:
            return NSLocalizedString("Reminder not found.", comment: "Reminder not found error")
        case .scopeMissing:
            return NSLocalizedString("Scope must be provided.", comment: "Scope missing error")
        case .titleMissing:
            return NSLocalizedString("Title must be provided.", comment: "Title missing error")
        case .toDateMissing:
            return NSLocalizedString("To date must be provided.", comment: "To date missing error")
        case .unableToOpenUrl:
            return NSLocalizedString("Unable to open URL.", comment: "Unable to open URL error")
        case .unimplemented(let methodName):
            return NSLocalizedString("\(methodName) is not implemented on iOS.", comment: "\(methodName) is not implemented on iOS")
        case .unhandledPermissionState:
            return NSLocalizedString("Unhandled permission state.", comment: "Unhandled permission state error")
        case .viewControllerMissing:
            return NSLocalizedString("Missing view controller.", comment: "View controller missing error")
        }
    }
}
