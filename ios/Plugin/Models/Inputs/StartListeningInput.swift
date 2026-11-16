import Capacitor
import EventKit

struct StartListeningInput {
    private let range: ListEventsInRangeInput
    private let includeEvents: Bool
    private let includeReminders: Bool

    init(call: CAPPluginCall) throws {
        self.range = try ListEventsInRangeInput(call: call)
        self.includeEvents = call.getBool("includeEvents") ?? true
        self.includeReminders = call.getBool("includeReminders") ?? false
    }

    func getRange() -> ListEventsInRangeInput {
        return range
    }

    func getIncludeEvents() -> Bool {
        return includeEvents
    }

    func getIncludeReminders() -> Bool {
        return includeReminders
    }
}
