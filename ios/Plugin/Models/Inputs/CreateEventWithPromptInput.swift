import Capacitor
import EventKit

struct CreateEventWithPromptInput {
    private var alerts: [Double]
    private var availability: EKEventAvailability?
    private var calendarId: String?
    private var description: String?
    private var endDate: Double?
    private let isAllDay: Bool
    private var location: String?
    private let recurrence: RecurrenceInput?
    private var startDate: Double?
    private let title: String
    private var url: String?

    init(call: CAPPluginCall) {
        if let alerts = call.getArray("alerts", []) as? [Double] {
            self.alerts = alerts
        } else {
            self.alerts = []
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
        self.isAllDay = call.getBool("isAllDay", false)
        if let location = call.getString("location") {
            self.location = location
        }
        self.recurrence = CreateEventWithPromptInput.getRecurrence(from: call)
        if let startDate = call.getDouble("startDate") as Double? {
            self.startDate = startDate
        }
        self.title = call.getString("title", "")
        if let url = call.getString("url") {
            self.url = url
        }
    }

    func getAlerts() -> [EKAlarm] {
        return alerts.map { EKAlarm(relativeOffset: $0 * 60) }
    }

    func getAvailability() -> EKEventAvailability? {
        return availability
    }

    func getCalendar(from eventStore: EKEventStore) -> EKCalendar? {
        return ImplementationHelper.getCalendarFromId(eventStore: eventStore, calendarId: calendarId, fallback: true)
    }

    func getDescription() -> String? {
        return description
    }

    func getEndDate() -> Date? {
        guard let endDate = endDate else { return nil }
        return ImplementationHelper.dateFromTimestamp(endDate)
    }

    func getIsAllDay() -> Bool {
        return isAllDay
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

    func getTitle() -> String {
        return title
    }

    func getUrl() -> URL? {
        guard let url = url else { return nil }
        return URL(string: url)
    }

    static func getRecurrence(from call: CAPPluginCall) -> RecurrenceInput? {
        if let recurrenceObject = call.getObject("recurrence") {
            if let frequencyString = recurrenceObject["frequency"] as? String, let frequency = RecurrenceInput.Frequency(rawValue: frequencyString) {
                let interval = recurrenceObject["interval"] as? Int ?? 1
                let count = recurrenceObject["count"] as? Int

                var endDate: Date?
                if let endMs = recurrenceObject["end"] as? Double {
                    endDate = ImplementationHelper.dateFromTimestamp(endMs)
                }

                var end: EKRecurrenceEnd?
                if let count = count {
                    end = EKRecurrenceEnd(occurrenceCount: count)
                } else if let endDate = endDate {
                    end = EKRecurrenceEnd(end: endDate)
                } else {
                    end = nil
                }

                var byWeekDay: [EKRecurrenceDayOfWeek]?
                if let days = recurrenceObject["byWeekDay"] as? [Int] {
                    byWeekDay = days.compactMap { day in
                        switch day {
                        case 1: return EKRecurrenceDayOfWeek(.monday)
                        case 2: return EKRecurrenceDayOfWeek(.tuesday)
                        case 3: return EKRecurrenceDayOfWeek(.wednesday)
                        case 4: return EKRecurrenceDayOfWeek(.thursday)
                        case 5: return EKRecurrenceDayOfWeek(.friday)
                        case 6: return EKRecurrenceDayOfWeek(.saturday)
                        case 7: return EKRecurrenceDayOfWeek(.sunday)
                        default: return nil
                        }
                    }
                }

                let byMonthDay = (recurrenceObject["byMonthDay"] as? [Int])?.map { NSNumber(value: $0) }
                let byMonth = (recurrenceObject["byMonth"] as? [Int])?.map { NSNumber(value: $0) }
                let weeksOfTheYear = (recurrenceObject["weeksOfTheYear"] as? [Int])?.map { NSNumber(value: $0) }
                let daysOfTheYear = (recurrenceObject["daysOfTheYear"] as? [Int])?.map { NSNumber(value: $0) }

                return RecurrenceInput(
                    frequency: frequency,
                    interval: max(1, interval),
                    count: count,
                    end: end,
                    byWeekDay: byWeekDay,
                    byMonthDay: byMonthDay,
                    byMonth: byMonth,
                    weeksOfTheYear: weeksOfTheYear,
                    daysOfTheYear: daysOfTheYear
                )
            } else {
                return nil
            }
        } else {
            return nil
        }
    }
}
