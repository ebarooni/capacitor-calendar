import Capacitor
import EventKit

struct CreateEventWithPromptInput {
    private let title: String
    private let isAllDay: Bool
    private var alerts: [Double]
    private var calendarId: String?
    private var location: String?
    private var startDate: Double?
    private var endDate: Double?
    private var url: String?
    private var description: String?
    private var availability: EKEventAvailability?

    init(call: CAPPluginCall) {
        self.title = call.getString("title", "")
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
        self.isAllDay = call.getBool("isAllDay", false)
        if let alerts = call.getArray("alerts", []) as? [Double] {
            self.alerts = alerts
        } else {
            self.alerts = []
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
    }

    func getTitle() -> String {
        return title
    }

    func getIsAllDay() -> Bool {
        return isAllDay
    }

    func getAlerts() -> [EKAlarm] {
        return alerts.map { EKAlarm(relativeOffset: $0 * 60) }
    }

    func getCalendar(from eventStore: EKEventStore) -> EKCalendar? {
        if let id = calendarId, let calendar = eventStore.calendar(withIdentifier: id) {
            return calendar
        }
        return eventStore.defaultCalendarForNewEvents
    }

    func getLocation() -> String? {
        return location
    }

    func getStartDate() -> Date? {
        guard let startDate = startDate else { return nil }
        return PluginHelper.dateFromTimestamp(startDate)
    }

    func getEndDate() -> Date? {
        guard let endDate = endDate else { return nil }
        return PluginHelper.dateFromTimestamp(endDate)
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
}
