import Capacitor
import EventKit

struct GetRemindersFromListsInput {
    private let listIds: [String]

    init(call: CAPPluginCall) throws {
        guard let listIds = call.getArray("listIds") as? [String] else {
            throw PluginError.listIdsMissing
        }
        self.listIds = listIds
    }

    func getLists(from eventStore: EKEventStore) throws -> [EKCalendar] {
        var lists: [EKCalendar] = []
        try listIds.forEach { id in
            guard let list = eventStore.calendar(withIdentifier: id) else {
                throw PluginError.listNotFound
            }
            lists.append(list)
        }
        return lists
    }
}
