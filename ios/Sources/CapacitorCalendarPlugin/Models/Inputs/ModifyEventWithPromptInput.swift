import Capacitor
import EventKit

struct ModifyEventWithPromptInput {
    private let input: CreateEventWithPromptInput
    private let id: String
    private var title: String?
    private var isAllDay: Bool?
    private var alerts: [Double]?
    private var calendarId: String?

    init(call: CAPPluginCall) throws {
        self.input = CreateEventWithPromptInput(call: call)
        guard let id = call.getString("id") else {
            throw PluginError.idMissing
        }
        self.id = id
        let title = input.getTitle()
        if !title.isEmpty {
            self.title = title
        }
        if let isAllDay = call.getBool( "isAllDay" ) {
            self.isAllDay = isAllDay
        }
        if let alerts = call.getArray( "alerts" ) as? [Double] {
            self.alerts = alerts
        }
        if let calendarId = call.getString( "calendarId" ) {
            self.calendarId = calendarId
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
        return input.getLocation()
    }

    func getStartDate() -> Date? {
        return input.getStartDate()
    }

    func getEndDate() -> Date? {
        return input.getEndDate()
    }

    func getIsAllDay() -> Bool? {
        return isAllDay
    }

    func getAlerts() -> [EKAlarm]? {
        if self.alerts != nil {
            return input.getAlerts()
        } else {
            return nil
        }
    }

    func getUrl() -> URL? {
        return input.getUrl()
    }

    func getDescription() -> String? {
        return input.getDescription()
    }

    func getAvailability() -> EKEventAvailability? {
        return input.getAvailability()
    }
}
