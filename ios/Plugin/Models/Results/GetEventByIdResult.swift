import Capacitor
import EventKit

struct GetEventByIdResult: JSResult {
    private let event: EKEvent?
    private let eventStore: EKEventStore

    init(_ event: EKEvent?, eventStore: EKEventStore) {
        self.event = event
        self.eventStore = eventStore
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        if let event = event {
            var seriesStartDateCache: [String: Double] = [:]
            result["event"] = ImplementationHelper.eventToJSObject(
                event,
                eventStore: eventStore,
                seriesStartDateCache: &seriesStartDateCache
            )
        } else {
            result["event"] = NSNull()
        }
        return result
    }
}
