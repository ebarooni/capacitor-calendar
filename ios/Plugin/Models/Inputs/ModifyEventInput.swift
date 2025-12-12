import Capacitor
import EventKit

struct ModifyEventInput {
    private let id: String
    private var title: String?
    private var calendarId: String?
    private var location: String?
    private var startDate: Double?
    private var endDate: Double?
    private var isAllDay: Bool?
    private var alerts: [Double]?
    private var url: String?
    private var description: String?
    private var availability: EKEventAvailability?
    private var span: EKSpan

    init(call: CAPPluginCall) throws {
        guard let id = call.getString("id") else {
            throw PluginError.idMissing
        }
        self.id = id
        if let title = call.getString("title") {
            self.title = title
        }
        if let calendarId = call.getString("calendarId") {
            self.calendarId = calendarId
        }
        if let location = call.getString("location") {
            self.location = location
        }
        if let startDate = call.getDouble("startDate") as Double? {
            self.startDate = startDate
        }
        if let endDate = call.getDouble("endDate") as Double? {
            self.endDate = endDate
        }
        if let isAllDay = call.getBool("isAllDay") as Bool? {
            self.isAllDay = isAllDay
        }
        if let alerts = call.getArray("alerts") as? [Double] {
            self.alerts = alerts
        }
        if let url = call.getString("url") {
            self.url = url
        }
        if let description = call.getString("description") {
            self.description = description
        }
        if let availability = call.getInt("availability") {
            self.availability = EKEventAvailability(rawValue: availability)
        }
        if let spanInt = call.getInt("span"), let span = EKSpan(rawValue: spanInt) {
            self.span = span
        } else {
            self.span = .thisEvent
        }
    }

    func getEvent(from eventStore: EKEventStore) throws -> EKEvent {
        guard let event = eventStore.event(withIdentifier: id) else {
            throw PluginError.eventNotFound
        }
        return event
    }

    func getTitle() -> String? {
        return title
    }

    func getCalendar(from eventStore: EKEventStore) -> EKCalendar? {
        return ImplementationHelper.getCalendarFromId(eventStore: eventStore, calendarId: calendarId, fallback: false)
    }

    func getLocation() -> String? {
        return location
    }

    func getStartDate() -> Date? {
        guard let startDate = startDate else { return nil }
        return ImplementationHelper.dateFromTimestamp(startDate)
    }

    func getEndDate() -> Date? {
        guard let endDate = endDate else { return nil }
        return ImplementationHelper.dateFromTimestamp(endDate)
    }

    func getIsAllDay() -> Bool? {
        return isAllDay
    }

    func getAlerts() -> [EKAlarm]? {
        if let alerts = self.alerts {
            return alerts.map { EKAlarm(relativeOffset: $0 * 60) }
        } else {
            return nil
        }
    }

    func getUrl() -> URL? {
        guard let url = url else { return nil }
        return URL(string: url)
    }

    func getDescription() -> String? {
        return description
    }

    func getAvailability() -> EKEventAvailability? {
        return availability
    }

    func getSpan() -> EKSpan {
        return span
    }
}
