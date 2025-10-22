import EventKit
import Capacitor

struct CreateReminderResult: JSResult {
    private let id: String

    init(reminder: EKReminder) {
        self.id = reminder.calendarItemIdentifier
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["id"] = id
        return result
    }
}
