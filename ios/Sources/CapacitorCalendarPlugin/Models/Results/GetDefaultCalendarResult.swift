import EventKit
import Capacitor

struct GetDefaultCalendarResult: JSResult {
    let calendar: EKCalendar?

    func toJSON() -> JSObject {
        var result = JSObject()
        if let calendar = calendar {
            result["result"] = ImplementationHelper.calendarToJSObject(calendar)
        } else {
            result["result"] = NSNull()
        }
        return result
    }
}
