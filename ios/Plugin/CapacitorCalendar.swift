import Foundation
import Capacitor
import EventKitUI

public class CapacitorCalendar: NSObject, EKEventEditViewDelegate, EKCalendarChooserDelegate {
    private let bridge: (any CAPBridgeProtocol)?
    private let eventStore: EKEventStore
    private var currentCreateEventContinuation: CheckedContinuation<Bool, any Error>?
    private var currentSelectCalendarsContinuation: CheckedContinuation<[[String: String]], any Error>?

    init(bridge: (any CAPBridgeProtocol)?, eventStore: EKEventStore) {
        self.bridge = bridge
        self.eventStore = eventStore
    }

    public func createEventWithPrompt() async throws -> Bool {
        return try await withCheckedThrowingContinuation { continuation in
            guard let viewController = bridge?.viewController else {
                continuation.resume(throwing: CapacitorCalendarPluginError.viewControllerUnavailable)
                return
            }

            Task { @MainActor in
                let eventEditViewController = EKEventEditViewController()
                eventEditViewController.eventStore = eventStore
                viewController.present(eventEditViewController, animated: true, completion: nil)
                eventEditViewController.editViewDelegate = self
                currentCreateEventContinuation = continuation
            }
        }
    }

    public func selectCalendarsWithPrompt(selectionStyle: Int, displayStyle: Int) async throws -> [[String: String]] {
        return try await withCheckedThrowingContinuation { continuation in
            guard let viewController = bridge?.viewController else {
                continuation.resume(throwing: CapacitorCalendarPluginError.viewControllerUnavailable)
                return
            }

            Task { @MainActor in
                if let selectionStyle = EKCalendarChooserSelectionStyle(rawValue: selectionStyle),
                   let displayStyle = EKCalendarChooserDisplayStyle(rawValue: displayStyle) {
                    let calendarChooser = EKCalendarChooser(
                        selectionStyle: selectionStyle,
                        displayStyle: displayStyle,
                        eventStore: eventStore
                    )
                    calendarChooser.showsDoneButton = true
                    calendarChooser.showsCancelButton = true
                    viewController.present(
                        UINavigationController(rootViewController: calendarChooser),
                        animated: true,
                        completion: nil
                    )
                    calendarChooser.delegate = self
                    currentSelectCalendarsContinuation = continuation
                } else {
                    continuation.resume(throwing: CapacitorCalendarPluginError.viewControllerUnavailable)
                    return
                }
            }
        }
    }

    public func listCalendars() -> [[String: String]] {
        return convertEKCalendarsToDictionaries(calendars: Set(eventStore.calendars(for: .event)))
    }

    public func getDefaultCalendar() throws -> [String: String] {
        let defaultCalendar = eventStore.defaultCalendarForNewEvents
        if let defaultCalendar = defaultCalendar {
            return [
                "id": defaultCalendar.calendarIdentifier,
                "title": defaultCalendar.title
            ]
        } else {
            throw CapacitorCalendarPluginError.noDefaultCalendar
        }
    }

    public func createEvent(title: String, calendarId: String?, location: String?, startDate: Date?, endDate: Date?, isAllDay: Bool?) throws {
        let fallbackStartDate = Date()
        let newEvent = EKEvent(eventStore: eventStore)
        if let calendarId = calendarId, let calendar = eventStore.calendar(withIdentifier: calendarId) {
            newEvent.calendar = calendar
        } else {
            newEvent.calendar = eventStore.defaultCalendarForNewEvents
        }
        newEvent.title = title
        if let location = location {
            newEvent.location = location
        }
        if let startDate = startDate {
            newEvent.startDate = startDate
        } else {
            newEvent.startDate = fallbackStartDate
        }
        if let endDate = endDate {
            newEvent.endDate = endDate
        } else {
            newEvent.endDate = fallbackStartDate.addingTimeInterval(3600)
        }
        if let isAllDay = isAllDay {
            newEvent.isAllDay = isAllDay
        }

        do {
            try eventStore.save(newEvent, span: .thisEvent)
        } catch {
            throw CapacitorCalendarPluginError.unknownActionEventCreationPrompt
        }
    }

    public func checkAllPermissions() async throws -> [String: String] {
        return try await withCheckedThrowingContinuation { continuation in
            var permissionsState: [String: String]
            switch EKEventStore.authorizationStatus(for: .event) {
            case .authorized, .fullAccess:
                permissionsState = [
                    "readCalendar": PermissionState.granted.rawValue,
                    "writeCalendar": PermissionState.granted.rawValue
                ]
            case .denied, .restricted:
                permissionsState = [
                    "readCalendar": PermissionState.denied.rawValue,
                    "writeCalendar": PermissionState.denied.rawValue
                ]
            case .writeOnly:
                permissionsState = [
                    "readCalendar": PermissionState.prompt.rawValue,
                    "writeCalendar": PermissionState.granted.rawValue
                ]
            case .notDetermined:
                permissionsState = [
                    "readCalendar": PermissionState.prompt.rawValue,
                    "writeCalendar": PermissionState.prompt.rawValue
                ]
            @unknown default:
                continuation.resume(throwing: CapacitorCalendarPluginError.unknownPermissionStatus)
                return
            }
            continuation.resume(returning: permissionsState)
        }
    }

    public func requestWriteAccessToEvents() async throws -> [String: String] {
        return try await withCheckedThrowingContinuation { continuation in
            if #available(iOS 17.0, *) {
                eventStore.requestWriteOnlyAccessToEvents { granted, error in
                    if let error = error {
                        continuation.resume(throwing: CapacitorCalendarPluginError.eventStoreAuthorization)
                        return
                    }

                    var permissionState: String
                    if granted {
                        permissionState = PermissionState.granted.rawValue
                    } else {
                        permissionState = PermissionState.denied.rawValue
                    }
                    continuation.resume(returning: ["result": permissionState])
                }
            } else {
                eventStore.requestAccess(to: .event) { granted, error in
                    if let error = error {
                        continuation.resume(throwing: CapacitorCalendarPluginError.eventStoreAuthorization)
                        return
                    }

                    var permissionState: String
                    if granted {
                        permissionState = PermissionState.granted.rawValue
                    } else {
                        permissionState = PermissionState.denied.rawValue
                    }
                    continuation.resume(returning: ["result": permissionState])
                }
            }
        }
    }

    public func requestFullAccessToEvents() async throws -> String {
        return try await withCheckedThrowingContinuation { continuation in
            if #available(iOS 17.0, *) {
                eventStore.requestFullAccessToEvents { granted, error in
                    if let error = error {
                        continuation.resume(throwing: CapacitorCalendarPluginError.eventStoreAuthorization)
                        return
                    }

                    var permissionState: String
                    if granted {
                        permissionState = PermissionState.granted.rawValue
                    } else {
                        permissionState = PermissionState.denied.rawValue
                    }
                    continuation.resume(returning: permissionState)
                }
            } else {
                eventStore.requestAccess(to: .event) { granted, error in
                    if let error = error {
                        continuation.resume(throwing: CapacitorCalendarPluginError.eventStoreAuthorization)
                        return
                    }

                    var permissionState: String
                    if granted {
                        permissionState = PermissionState.granted.rawValue
                    } else {
                        permissionState = PermissionState.denied.rawValue
                    }
                    continuation.resume(returning: permissionState)
                }
            }
        }
    }

    public func eventEditViewController(
        _ controller: EKEventEditViewController,
        didCompleteWith action: EKEventEditViewAction
    ) {
        controller.dismiss(animated: true) {
            if action == .saved {
                self.currentCreateEventContinuation?.resume(returning: true)
            } else if action == .canceled {
                self.currentCreateEventContinuation?.resume(returning: false)
            } else {
                self.currentCreateEventContinuation?.resume(throwing: CapacitorCalendarPluginError.unknownActionEventCreationPrompt)
            }
        }
    }

    public func calendarChooserDidFinish(_ calendarChooser: EKCalendarChooser) {
        let selectedCalendars = convertEKCalendarsToDictionaries(calendars: calendarChooser.selectedCalendars)
        bridge?.viewController?.dismiss(animated: true) {
            self.currentSelectCalendarsContinuation?.resume(returning: selectedCalendars)
        }
    }

    public func calendarChooserDidCancel(_ calendarChooser: EKCalendarChooser) {
        bridge?.viewController?.dismiss(animated: true) {
            self.currentSelectCalendarsContinuation?.resume(throwing: CapacitorCalendarPluginError.canceledCalendarsSelectionPrompt)
        }
    }

    private func convertEKCalendarsToDictionaries(calendars: Set<EKCalendar>) -> [[String: String]] {
        var result: [[String: String]] = []

        for calendar in calendars {
            let calendarDict: [String: String] = [
                "id": calendar.calendarIdentifier,
                "title": calendar.title
            ]
            result.append(calendarDict)
        }

        return result
    }
}
