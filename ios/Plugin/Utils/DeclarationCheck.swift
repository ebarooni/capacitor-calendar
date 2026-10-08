import Capacitor
import Foundation

/// Early Info.plist usage-description checks for EB-CLDR-0100 MissingDeclaration.
/// Callers pass only the access level the method actually uses.
enum DeclarationCheck {
    /// Rejects with EB-CLDR-0100 when the Info.plist key for the scope is missing.
    @discardableResult
    static func ensureUsageDescription(_ call: CAPPluginCall, for scope: CalendarPermissionScope) -> Bool {
        switch scope {
        case .writeCalendar:
            return ensureWriteOnlyCalendarUsageDescription(call)
        case .readCalendar:
            return ensureFullCalendarUsageDescription(call)
        case .writeReminders, .readReminders:
            return ensureRemindersUsageDescription(call)
        }
    }

    @discardableResult
    static func ensureWriteOnlyCalendarUsageDescription(_ call: CAPPluginCall) -> Bool {
        ensureUsageDescriptionKey(call, key: requiredWriteOnlyCalendarUsageDescriptionKey())
    }

    @discardableResult
    static func ensureFullCalendarUsageDescription(_ call: CAPPluginCall) -> Bool {
        ensureUsageDescriptionKey(call, key: requiredFullCalendarUsageDescriptionKey())
    }

    @discardableResult
    static func ensureRemindersUsageDescription(_ call: CAPPluginCall) -> Bool {
        ensureUsageDescriptionKey(call, key: requiredRemindersUsageDescriptionKey())
    }

    @discardableResult
    private static func ensureUsageDescriptionKey(_ call: CAPPluginCall, key: String) -> Bool {
        guard hasUsageDescription(forKey: key) else {
            let error = PluginError.missingDeclaration(key)
            call.reject(error.localizedDescription, error.code)
            return false
        }
        return true
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
