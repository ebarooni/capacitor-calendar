import Capacitor
import EventKit

struct ListEventsInRangeResult: JSResult {
    private let events: [EKEvent]

    init(_ events: [EKEvent]) {
        self.events = events
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["result"] = events.map { ImplementationHelper.eventToJSObject($0) }
        return result
    }
}
