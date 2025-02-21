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
