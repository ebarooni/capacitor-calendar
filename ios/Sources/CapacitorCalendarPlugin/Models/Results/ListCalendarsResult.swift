import EventKit
import Capacitor

struct ListCalendarsResult: JSResult {
    let calendars: [JSObject]

    init(_ calendars: [EKCalendar]) {
        self.calendars = ImplementationHelper.calendarsListToJSArray(calendars)
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["result"] = calendars
        return result
    }
}
