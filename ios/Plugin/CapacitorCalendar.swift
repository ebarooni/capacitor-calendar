import Foundation
import Capacitor
import EventKitUI

public class CapacitorCalendar: NSObject, EKEventEditViewDelegate, EKCalendarChooserDelegate {
    private let bridge: (any CAPBridgeProtocol)?
    private let eventStore: EKEventStore
    private var currentCreateEventContinuation: CheckedContinuation<String, any Error>?
    private var currentSelectCalendarsContinuation: CheckedContinuation<[[String: String]], any Error>?

    init(bridge: (any CAPBridgeProtocol)?, eventStore: EKEventStore) {
        self.bridge = bridge
        self.eventStore = eventStore
    }

    public func createEventWithPrompt() async throws -> String {
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

    public func createEvent(with parameters: EventCreationParameters) throws -> String {
        let fallbackStartDate = Date()
        let newEvent = EKEvent(eventStore: eventStore)
        if let calendarId = parameters.calendarId, let calendar = eventStore.calendar(withIdentifier: calendarId) {
            newEvent.calendar = calendar
        } else {
            newEvent.calendar = eventStore.defaultCalendarForNewEvents
        }
        newEvent.title = parameters.title
        if let location = parameters.location {
            newEvent.location = location
        }
        if let startDate = parameters.startDate {
            newEvent.startDate = Date(timeIntervalSince1970: startDate / 1000)
        } else {
            newEvent.startDate = fallbackStartDate
        }
        if let endDate = parameters.endDate {
            newEvent.endDate = Date(timeIntervalSince1970: endDate / 1000)
        } else {
            newEvent.endDate = fallbackStartDate.addingTimeInterval(3600)
        }
        if let isAllDay = parameters.isAllDay {
            newEvent.isAllDay = isAllDay
        }

        do {
            try eventStore.save(newEvent, span: .thisEvent)
            return newEvent.eventIdentifier
        } catch {
            throw CapacitorCalendarPluginError.undefinedEvent
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

    public func openCalendar(date: Double) async throws {
        return try await withCheckedThrowingContinuation { continuation in
            guard let url = URL(string: "calshow:\(date)") else {
                continuation.resume(throwing: CapacitorCalendarPluginError.unableToOpenCalendar)
                return
            }

            Task { @MainActor in
                guard UIApplication.shared.canOpenURL(url) else {
                    continuation.resume(throwing: CapacitorCalendarPluginError.unableToOpenCalendar)
                    return
                }

                UIApplication.shared.open(url, options: [:]) { success in
                    if success {
                        continuation.resume()
                    } else {
                        continuation.resume(throwing: CapacitorCalendarPluginError.unableToOpenCalendar)
                    }
                }
            }
        }
    }

    public func listEventsInRange(
        startDate: Double,
        endDate: Double
    ) throws -> [[String: Any]] {
        let predicate = eventStore.predicateForEvents(
            withStart: Date(timeIntervalSince1970: startDate / 1000),
            end: Date(timeIntervalSince1970: endDate / 1000), calendars: nil
        )
        let events = self.eventStore.events(matching: predicate)
        return dictionaryRepresentationOfEvents(events: events)
    }

    public func deleteEventsById(ids: JSArray) async throws -> EventDeleteResults {
        await withCheckedContinuation { continuation in

            var deletedEvents: [String] = []
            var failedToDeleteEvents: [String] = []

            for id in ids {
                guard let event = eventStore.event(withIdentifier: "\(id)") else {
                    failedToDeleteEvents.append("\(id)")
                    continue
                }

                do {
                    try eventStore.remove(event, span: .thisEvent, commit: false)
                    deletedEvents.append("\(id)")
                } catch {
                    failedToDeleteEvents.append("\(id)")
                }
            }

            do {
                try eventStore.commit()
            } catch {
                failedToDeleteEvents.append(contentsOf: deletedEvents)
                deletedEvents.removeAll()
            }

            continuation.resume(returning: EventDeleteResults(deleted: deletedEvents, failed: failedToDeleteEvents))
        }
    }

    public func eventEditViewController(
        _ controller: EKEventEditViewController,
        didCompleteWith action: EKEventEditViewAction
    ) {
        controller.dismiss(animated: true) {
            if action == .saved {
                if let event = controller.event {
                    self.currentCreateEventContinuation?.resume(returning: event.eventIdentifier)
                } else {
                    self.currentCreateEventContinuation?.resume(throwing: CapacitorCalendarPluginError.undefinedEvent)
                    return
                }
            } else if action == .canceled {
                self.currentCreateEventContinuation?.resume(throwing: CapacitorCalendarPluginError.createEventCancelled)
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

    private func dictionaryRepresentationOfEvents(events: [EKEvent]) -> [[String: Any]] {
        return events.map { event in
            var dict = [String: Any]()
            dict["id"] = event.eventIdentifier
            if let title = event.title, !title.isEmpty {
                dict["title"] = title
            }
            if let location = event.location, !location.isEmpty {
                dict["location"] = location
            }
            if let organizer = event.organizer?.name, !organizer.isEmpty {
                dict["organizer"] = organizer
            }
            if let notes = event.notes, !notes.isEmpty {
                dict["description"] = notes
            }
            if let startDate = event.startDate {
                dict["startDate"] = startDate.timeIntervalSince1970
            }
            if let endDate = event.endDate {
                dict["endDate"] = endDate.timeIntervalSince1970
            }
            if let timezone = event.timeZone, (timezone.abbreviation()?.isEmpty) == nil {
                dict["eventTimezone"] = timezone.abbreviation()
                dict["eventEndTimezone"] = timezone.abbreviation()
            }
            dict["isAllDay"] = event.isAllDay
            dict["calendarId"] = event.calendar.calendarIdentifier
            return dict
        }
    }
}
