import Capacitor
import EventKit

struct GetRemindersFromListsResult: JSResult {
    let reminders: [EKReminder]

    init(reminders: [EKReminder]?) {
        self.reminders = reminders ?? []
    }

    func toJSON() -> JSObject {
        var result = JSObject()
        result["result"] = reminders.map { ImplementationHelper.reminderToJSObject($0) }
        return result
    }
}
