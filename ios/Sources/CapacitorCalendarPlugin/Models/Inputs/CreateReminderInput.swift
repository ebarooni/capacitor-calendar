import Capacitor
import EventKit

struct CreateReminderInput {
    private let title: String
    private let listId: String?
    private let priority: Int?
    private let isCompleted: Bool
    private let startDate: Double?
    private let dueDate: Double?
    private let completionDate: Double?
    private let notes: String?
    private let url: String?
    private let location: String?
    private var frequency: EKRecurrenceFrequency?
    private var interval: Int?
    private var end: Double?
    private let alerts: [Double]?

    init(call: CAPPluginCall) throws {
        guard let title = call.getString("title") else {
            throw PluginError.titleMissing
        }
        self.title = title
        self.listId = call.getString("listId")
        self.priority = call.getInt("priority")
        self.isCompleted = call.getBool("isCompleted") ?? false
        self.startDate = call.getDouble("startDate")
        self.dueDate = call.getDouble("dueDate")
        self.completionDate = call.getDouble("completionDate")
        self.notes = call.getString("notes")
        self.url = call.getString("url")
        self.location = call.getString("location")
        if let recurrence = call.getObject("recurrence") {
            guard let frequency = recurrence["frequency"] as? Int else {
                throw PluginError.missingFrequency
            }
            self.frequency = EKRecurrenceFrequency(rawValue: frequency)
            guard let interval = recurrence["interval"] as? Int else {
                throw PluginError.missingInterval
            }
            self.interval = interval
            let end = recurrence["end"] as? Double
        }
        self.alerts = call.getArray("alerts") as? [Double]
    }

    func getTitle() -> String {
        return title
    }

    func getListId(from eventStore: EKEventStore) -> String? {
        if let id = listId {
            return id
        } else {
            return eventStore.defaultCalendarForNewReminders()?.calendarIdentifier
        }
    }

    func getPriority() -> Int? {
        return priority
    }

    func getIsCompleted() -> Bool {
        return isCompleted
    }

    func getStartDate() -> DateComponents? {
        guard let startDate = startDate else { return nil }
        var component = Calendar.current.dateComponents(
            [.year, .month, .day, .hour, .minute],
            from: ImplementationHelper.dateFromTimestamp(startDate)
        )
        component.timeZone = Calendar.current.timeZone
        return component
    }

    func getDueDate() -> DateComponents? {
        guard let dueDate = dueDate else { return nil }
        var component = Calendar.current.dateComponents(
            [.year, .month, .day, .hour, .minute],
            from: ImplementationHelper.dateFromTimestamp(dueDate)
        )
        component.timeZone = Calendar.current.timeZone
        return component
    }

    func getCompletionDate() -> Date? {
        guard let completionDate = completionDate else { return nil }
        return ImplementationHelper.dateFromTimestamp(completionDate)
    }

    func getNotes() -> String? {
        return notes
    }

    func getUrl() -> URL? {
        guard let url = url else { return nil }
        return URL(string: url)
    }

    func getLocation() -> String? {
        return location
    }

    func getAlerts() -> [EKAlarm]? {
        guard let alerts = alerts else { return nil }
        return alerts.map { EKAlarm(relativeOffset: $0 * 60) }
    }

    func getRecurrenceRule() -> [EKRecurrenceRule]? {
        guard let frequency = frequency, let interval = interval else { return nil }
        let recurrenceEnd = end.flatMap { EKRecurrenceEnd(end: ImplementationHelper.dateFromTimestamp($0)) }
        return [EKRecurrenceRule(recurrenceWith: frequency, interval: interval, end: recurrenceEnd)]
    }

}
