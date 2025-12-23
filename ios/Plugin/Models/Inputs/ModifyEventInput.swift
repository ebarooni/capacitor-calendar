import Capacitor
import EventKit

struct ModifyEventInput {
    private var alerts: [Double]?
    private var availability: EKEventAvailability?
    private var calendarId: String?
    private var description: String?
    private var endDate: Double?
    private let id: String
    private var isAllDay: Bool?
    private var location: String?
    private let recurrence: RecurrenceInput?
    private var span: EKSpan
    private var startDate: Double?
    private var title: String?
    private var url: String?

    init(call: CAPPluginCall) throws {
        if let alerts = call.getArray("alerts") as? [Double] {
            self.alerts = alerts
        }
        if let availability = call.getInt("availability") {
            self.availability = EKEventAvailability(rawValue: availability)
        }
        if let calendarId = call.getString("calendarId") {
            self.calendarId = calendarId
        }
        if let description = call.getString("description") {
            self.description = description
        }
        if let endDate = call.getDouble("endDate") as Double? {
            self.endDate = endDate
        }
        guard let id = call.getString("id") else {
            throw PluginError.idMissing
        }
        self.id = id
        if let isAllDay = call.getBool("isAllDay") as Bool? {
            self.isAllDay = isAllDay
        }
        if let location = call.getString("location") {
            self.location = location
        }
        self.recurrence = CreateEventWithPromptInput.getRecurrence(from: call)
        if let spanInt = call.getInt("span"), let span = EKSpan(rawValue: spanInt) {
            self.span = span
        } else {
            self.span = .thisEvent
        }
        if let startDate = call.getDouble("startDate") as Double? {
            self.startDate = startDate
        }
        if let title = call.getString("title") {
            self.title = title
        }
        if let url = call.getString("url") {
            self.url = url
        }
    }

    func getAlerts() -> [EKAlarm]? {
        if let alerts = self.alerts {
            return alerts.map { EKAlarm(relativeOffset: $0 * 60) }
        } else {
            return nil
        }
    }

    func getIsAllDay() -> Bool? {
        return isAllDay
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

    func getRecurrenceRule() -> [EKRecurrenceRule] {
        guard let recurrence = recurrence else {
            return []
        }

        let rule = EKRecurrenceRule(
            recurrenceWith: recurrence.frequency.toEKFrequency(),
            interval: recurrence.interval,
            daysOfTheWeek: recurrence.byWeekDay,
            daysOfTheMonth: recurrence.byMonthDay,
            monthsOfTheYear: recurrence.byMonth,
            weeksOfTheYear: recurrence.weeksOfTheYear,
            daysOfTheYear: recurrence.daysOfTheYear,
            setPositions: nil,
            end: recurrence.end
        )

        return [rule]
    }

    func getStartDate() -> Date? {
        guard let startDate = startDate else { return nil }
        return ImplementationHelper.dateFromTimestamp(startDate)
    }

    func getEndDate() -> Date? {
        guard let endDate = endDate else { return nil }
        return ImplementationHelper.dateFromTimestamp(endDate)
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
