import EventKit
import Capacitor

struct GetReminderByIdResult: JSResult {
    private var reminder: EKReminder?

    init(reminder: EKReminder?) throws {
        self.reminder = reminder
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        if reminder != nil {
            result["result"] = ImplementationHelper.reminderToJSObject(reminder!)
        } else {
            result["result"] = NSNull()
        }
        return result
    }
}
