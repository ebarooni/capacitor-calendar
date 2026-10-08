import Foundation

/// Early Info.plist usage-description checks for EB-CLDR-0100 MissingDeclaration.
/// Callers pass only the access level the method actually uses.
enum DeclarationCheck {
    /// Throws `PluginError.missingDeclaration` when the Info.plist key for the scope is missing.
    static func ensureUsageDescription(for scope: CalendarPermissionScope) throws {
        switch scope {
        case .writeCalendar:
            try ensureWriteOnlyCalendarUsageDescription()
        case .readCalendar:
            try ensureFullCalendarUsageDescription()
        case .writeReminders, .readReminders:
            try ensureRemindersUsageDescription()
        }
    }

    static func ensureWriteOnlyCalendarUsageDescription() throws {
        try ensureUsageDescriptionKey(requiredWriteOnlyCalendarUsageDescriptionKey())
    }

    static func ensureFullCalendarUsageDescription() throws {
        try ensureUsageDescriptionKey(requiredFullCalendarUsageDescriptionKey())
    }

    static func ensureRemindersUsageDescription() throws {
        try ensureUsageDescriptionKey(requiredRemindersUsageDescriptionKey())
    }

    private static func ensureUsageDescriptionKey(_ key: String) throws {
        guard hasUsageDescription(forKey: key) else {
            throw PluginError.missingDeclaration(key)
        }
    }

    private static func hasUsageDescription(forKey key: String) -> Bool {
        guard let value = Bundle.main.object(forInfoDictionaryKey: key) as? String else {
            return false
        }
        return !value.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    private static func requiredWriteOnlyCalendarUsageDescriptionKey() -> String {
        if #available(iOS 17.0, *) {
            return "NSCalendarsWriteOnlyAccessUsageDescription"
        }
        return "NSCalendarsUsageDescription"
    }

    private static func requiredFullCalendarUsageDescriptionKey() -> String {
        if #available(iOS 17.0, *) {
            return "NSCalendarsFullAccessUsageDescription"
        }
        return "NSCalendarsUsageDescription"
    }

    private static func requiredRemindersUsageDescriptionKey() -> String {
        if #available(iOS 17.0, *) {
            return "NSRemindersFullAccessUsageDescription"
        }
        return "NSRemindersUsageDescription"
    }
}
