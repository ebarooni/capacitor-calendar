import EventKit
import Capacitor

struct FetchAllCalendarSourcesResult: JSResult {
    let source: [JSObject]

    init(_ sources: [EKSource]) {
        self.source = ImplementationHelper.calendarSourcesToJSArray(sources)
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["result"] = source
        return result
    }
}
