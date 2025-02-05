import EventKit

struct ImplementationHelper {
    static func permissionStateToResult(state: EKAuthorizationStatus, scope: CalendarPermissionScope ) throws -> CAPPermissionState {
        var result: CAPPermissionState

        switch state {
        case .authorized, .fullAccess:
            result = CAPPermissionState.granted
        case .denied, .restricted:
            result = CAPPermissionState.denied
        case .writeOnly:
            if scope == .writeCalendar || scope == .writeReminders {
                result = CAPPermissionState.granted
            } else {
                result = CAPPermissionState.prompt
            }
        case .notDetermined:
            result = CAPPermissionState.prompt
        default:
            throw PluginError.unhandledPermissionState
        }

        return result
    }

    static func requestWriteOnlyCalendarAccess(eventStore: EKEventStore) async throws -> CAPPermissionState {
        return try await withCheckedThrowingContinuation { continuation in
            let requestAccessHandler: (Bool, Error?) -> Void = { granted, error in
                if let error = error {
                    continuation.resume(throwing: error)
                    return
                }

                let permissionState: CAPPermissionState = granted ? .granted : .denied
                continuation.resume(returning: permissionState)
                return
            }

            if #available(iOS 17.0, *) {
                eventStore.requestWriteOnlyAccessToEvents(completion: requestAccessHandler)
            } else {
                eventStore.requestAccess(to: .event, completion: requestAccessHandler)
            }
        }
    }

    static func requestFullCalendarAccess(eventStore: EKEventStore) async throws -> CAPPermissionState {
        return try await withCheckedThrowingContinuation { continuation in
            let requestAccessHandler: (Bool, Error?) -> Void = { granted, error in
                if let error = error {
                    continuation.resume(throwing: error)
                    return
                }

                let permissionState: CAPPermissionState = granted ? .granted : .denied
                continuation.resume(returning: permissionState)
                return
            }

            if #available(iOS 17.0, *) {
                eventStore.requestFullAccessToEvents(completion: requestAccessHandler)
            } else {
                eventStore.requestAccess(to: .event, completion: requestAccessHandler)
            }
        }
    }

    static func requestFullRemindersAccess(eventStore: EKEventStore) async throws -> CAPPermissionState {
        return try await withCheckedThrowingContinuation { continuation in
            let requestAccessHandler: (Bool, Error?) -> Void = { granted, error in
                if let error = error {
                    continuation.resume(throwing: error)
                    return
                }

                let permissionState: CAPPermissionState = granted ? .granted : .denied
                continuation.resume(returning: permissionState)
                return
            }

            if #available(iOS 17.0, *) {
                eventStore.requestFullAccessToReminders(completion: requestAccessHandler)
            } else {
                eventStore.requestAccess(to: .reminder, completion: requestAccessHandler)
            }
        }
    }
}
