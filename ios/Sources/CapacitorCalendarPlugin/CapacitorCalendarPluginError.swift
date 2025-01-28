import Foundation

public enum CapacitorCalendarPluginError: Error {
    case unknownPermissionStatus
    case eventStoreAuthorization
    case viewControllerUnavailable
    case unknownActionEventCreationPrompt
    case unableToOpenCalendar
    case unableToOpenReminders
    case undefinedEvent
    case unableToParseColor
    case unableToCreateCalendar
    case calendarNotFound
}
