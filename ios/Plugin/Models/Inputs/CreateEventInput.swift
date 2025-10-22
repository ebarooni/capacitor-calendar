import Capacitor
import EventKit

struct CreateEventInput {
    private let input: CreateEventWithPromptInput
    private let title: String
    private let commit: Bool

    init(call: CAPPluginCall) throws {
        self.input = CreateEventWithPromptInput(call: call)
        guard let title = call.getString("title") else {
            throw PluginError.titleMissing
        }
        self.title = title
        self.commit = call.getBool("commit", true)
    }

    func getTitle() -> String {
        return title
    }

    func getIsAllDay() -> Bool {
        return input.getIsAllDay()
    }

    func getAlerts() -> [EKAlarm] {
        return input.getAlerts()
    }

    func getCalendar(from eventStore: EKEventStore) -> EKCalendar? {
        return input.getCalendar(from: eventStore)
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

    func getUrl() -> URL? {
        return input.getUrl()
    }

    func getDescription() -> String? {
        return input.getDescription()
    }

    func getAvailability() -> EKEventAvailability? {
        return input.getAvailability()
    }

    func getCommit() -> Bool {
        return commit
    }
}
