import Capacitor
import EventKit
import Foundation

/// Maps thrown errors to `PluginError` and rejects the Capacitor call.
enum PluginCallRejecter {
    static func reject(_ call: CAPPluginCall, _ error: Error?) {
        let pluginError = toPluginError(error)
        let message = pluginError?.localizedDescription
            ?? PluginError.customError("An unknown error has occurred.").localizedDescription
        call.reject(message, pluginError?.code)
    }

    static func toPluginError(_ error: Error?) -> PluginError? {
        if let error = error as? PluginError {
            return error
        } else if let error = error {
            if isPermissionDenied(error) {
                return .permissionDenied(
                    wrapSystemError("Calendar access was denied.", error.localizedDescription)
                )
            }
            return .ioError(
                wrapSystemError(
                    "An I/O error occurred while accessing the calendar.",
                    error.localizedDescription
                )
            )
        } else {
            return nil
        }
    }

    /// True when EventKit rejects the call because the app has no calendar or reminders access.
    static func isPermissionDenied(_ error: Error) -> Bool {
        let nsError = error as NSError
        return nsError.domain == EKErrorDomain
            && nsError.code == EKError.Code.eventStoreNotAuthorized.rawValue
    }

    /// Lead with the stable plugin sentence; append a different non-blank OS message in parentheses.
    static func wrapSystemError(_ canonicalMessage: String, _ systemMessage: String?) -> String {
        let detail = systemMessage?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        if detail.isEmpty || detail == canonicalMessage {
            return canonicalMessage
        }
        return "\(canonicalMessage) (\(detail))"
    }
}
