import Foundation
import Capacitor
import EventKitUI

public class CapacitorCalendar: NSObject {
    private let bridge: (any CAPBridgeProtocol)?
    private let eventStore: EKEventStore

    init(bridge: (any CAPBridgeProtocol)?, eventStore: EKEventStore) {
        self.bridge = bridge
        self.eventStore = eventStore
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

    public func createCalendar(title: String, color: String?, sourceId: String?) throws -> String {
        let newCalendar = EKCalendar(for: .event, eventStore: eventStore)
        newCalendar.title = title
        if let calendarColor = color {
            newCalendar.cgColor = UIColor(hex: calendarColor)?.cgColor
        } else {
            newCalendar.cgColor = eventStore.defaultCalendarForNewEvents?.cgColor
        }
        if let calendarSourceId = sourceId {
            let matchingSource = eventStore.sources.first(where: { $0.sourceIdentifier == calendarSourceId })
            if let requestedSource = matchingSource {
                newCalendar.source = requestedSource
            }

        } else {
            newCalendar.source = eventStore.defaultCalendarForNewEvents?.source
        }

        do {
            try eventStore.saveCalendar(newCalendar, commit: true)
        } catch {
            throw CapacitorCalendarPluginError.unableToCreateCalendar
        }

        return newCalendar.calendarIdentifier
    }

    public func deleteCalendar(id: String) throws {
        if let calendar = eventStore.calendar(withIdentifier: id) {
            try eventStore.removeCalendar(calendar, commit: true)
        } else {
            throw CapacitorCalendarPluginError.calendarNotFound
        }
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
                dict["startDate"] = startDate.timeIntervalSince1970 * 1000
            }
            if let endDate = event.endDate {
                dict["endDate"] = endDate.timeIntervalSince1970 * 1000
            }
            if let timezone = event.timeZone, let region = event.timeZone?.identifier, let abbreviation = timezone.abbreviation() {
                dict["eventTimezone"] = ["region": region, "abbreviation": abbreviation]
                dict["eventEndTimezone"] = ["region": region, "abbreviation": abbreviation]
            }
            // if let color = event.calendar.cgColor {
            //  dict["eventColor"] = hexStringFromColor(color: color)
            // }
            if let url = event.url {
                dict["url"] = url.absoluteString
            }
            dict["isAllDay"] = event.isAllDay
            dict["calendarId"] = event.calendar.calendarIdentifier
            return dict
        }
    }
}
