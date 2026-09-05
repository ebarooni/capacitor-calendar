import Capacitor
import EventKit

struct ListEventsInRangeResult: JSResult {
    private let events: [EKEvent]
    private let eventStore: EKEventStore

    init(_ events: [EKEvent], eventStore: EKEventStore) {
        self.events = events
        self.eventStore = eventStore
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        var seriesStartDateCache: [String: Double] = [:]
        var jsEvents = JSArray()
        for event in events {
            jsEvents.append(
                ImplementationHelper.eventToJSObject(
                    event,
                    eventStore: eventStore,
                    seriesStartDateCache: &seriesStartDateCache
                )
            )
        }
        result["result"] = jsEvents
        return result
    }
}
