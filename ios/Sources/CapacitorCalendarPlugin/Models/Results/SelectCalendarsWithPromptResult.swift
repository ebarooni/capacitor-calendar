import Capacitor
import EventKit

struct SelectCalendarsWithPromptResult: JSResult {
    private let calendars: [JSObject]

    init(_ selectedCalendars: Set<EKCalendar>) {
        self.calendars = ImplementationHelper.calendarsSetToJSArray(selectedCalendars)
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["result"] = calendars
        return result
    }
}
