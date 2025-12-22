import Capacitor
import EventKit

struct CreateEventInput {
    private let input: CreateEventWithPromptInput
    private let title: String
    private let commit: Bool

    init(call: CAPPluginCall) throws {
        self.commit = call.getBool("commit", true)
        self.input = CreateEventWithPromptInput(call: call)
        guard let title = call.getString("title") else {
            throw PluginError.titleMissing
        }
        self.title = title
    }

    func getAlerts() -> [EKAlarm] {
        return input.getAlerts()
    }

    func getAvailability() -> EKEventAvailability? {
        return input.getAvailability()
    }

    func getCalendar(from eventStore: EKEventStore) -> EKCalendar? {
        return input.getCalendar(from: eventStore)
    }

    func getCommit() -> Bool {
        return commit
    }

    func getDescription() -> String? {
        return input.getDescription()
    }

    func getEndDate() -> Date? {
        return input.getEndDate()
    }

    func getIsAllDay() -> Bool {
        return input.getIsAllDay()
    }

    func getLocation() -> String? {
        return input.getLocation()
    }

    func getRecurrenceRule() -> [EKRecurrenceRule] {
        return input.getRecurrenceRule()
    }

    func getStartDate() -> Date? {
        return input.getStartDate()
    }

    func getTitle() -> String {
        return title
    }

    func getUrl() -> URL? {
        return input.getUrl()
    }
}
