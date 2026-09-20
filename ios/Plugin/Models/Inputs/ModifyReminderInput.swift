import Capacitor
import EventKit

struct ModifyReminderInput {
    private let id: String
    private let title: String?
    private let listId: String?
    private let priority: Int?
    private let isCompleted: Bool?
    private let startDatePresent: Bool
    private let startDate: Double?
    private let dueDatePresent: Bool
    private let dueDate: Double?
    private let completionDatePresent: Bool
    private let completionDate: Double?
    private let notesPresent: Bool
    private let notes: String?
    private let urlPresent: Bool
    private let url: String?
    private let locationPresent: Bool
    private let location: String?
    private let recurrencePresent: Bool
    private var frequency: EKRecurrenceFrequency?
    private var interval: Int?
    private var end: Double?
    private let alertsPresent: Bool
    private let alerts: [Double]?
    private let commit: Bool

    init(call: CAPPluginCall) throws {
        guard let id = call.getString("id") else {
            throw PluginError.idMissing
        }
        self.id = id
        self.title = call.getString("title")
        self.listId = call.getString("listId")
        self.priority = call.getInt("priority")
        self.isCompleted = call.getBool("isCompleted")

        self.startDatePresent = call.hasOption("startDate")
        self.startDate = call.getDouble("startDate")
        self.dueDatePresent = call.hasOption("dueDate")
        self.dueDate = call.getDouble("dueDate")
        self.completionDatePresent = call.hasOption("completionDate")
        self.completionDate = call.getDouble("completionDate")
        self.notesPresent = call.hasOption("notes")
        self.notes = call.getString("notes")
        self.urlPresent = call.hasOption("url")
        self.url = call.getString("url")
        self.locationPresent = call.hasOption("location")
        self.location = call.getString("location")

        self.recurrencePresent = call.hasOption("recurrence")
        if let recurrence = call.getObject("recurrence") {
            guard recurrence["frequency"] != nil else {
                throw PluginError.missingFrequency
            }
            guard let frequencyString = recurrence["frequency"] as? String,
                  let frequency = RecurrenceInput.Frequency(rawValue: frequencyString) else {
                throw PluginError.invalidFrequency
            }
            self.frequency = frequency.toEKFrequency()
            guard let interval = ImplementationHelper.int(from: recurrence["interval"]) else {
                throw PluginError.missingInterval
            }
            self.interval = interval
            self.end = ImplementationHelper.double(from: recurrence["end"])
        }

        self.alertsPresent = call.hasOption("alerts")
        self.alerts = call.getArray("alerts") as? [Double]
        self.commit = call.getBool("commit", true)
    }

    func getId() -> String {
        return id
    }

    func getTitle() -> String? {
        return title
    }

    func getListId() -> String? {
        return listId
    }

    func getPriority() -> Int? {
        return priority
    }

    func getIsCompleted() -> Bool? {
        return isCompleted
    }

    func isStartDatePresent() -> Bool {
        return startDatePresent
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

    func isDueDatePresent() -> Bool {
        return dueDatePresent
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

    func isCompletionDatePresent() -> Bool {
        return completionDatePresent
    }

    func getCompletionDate() -> Date? {
        guard let completionDate = completionDate else { return nil }
        return ImplementationHelper.dateFromTimestamp(completionDate)
    }

    func isNotesPresent() -> Bool {
        return notesPresent
    }

    func getNotes() -> String? {
        return notes
    }

    func isUrlPresent() -> Bool {
        return urlPresent
    }

    func getUrl() -> URL? {
        guard let url = url else { return nil }
        return URL(string: url)
    }

    func isLocationPresent() -> Bool {
        return locationPresent
    }

    func getLocation() -> String? {
        return location
    }

    func isAlertsPresent() -> Bool {
        return alertsPresent
    }

    func getAlerts() -> [EKAlarm]? {
        guard let alerts = alerts, !alerts.isEmpty else { return nil }
        return alerts.map { EKAlarm(relativeOffset: $0 * 60) }
    }

    func isRecurrencePresent() -> Bool {
        return recurrencePresent
    }

    func getRecurrenceRule() -> [EKRecurrenceRule]? {
        guard let frequency = frequency, let interval = interval else { return nil }
        let recurrenceEnd = end.flatMap { EKRecurrenceEnd(end: ImplementationHelper.dateFromTimestamp($0)) }
        return [EKRecurrenceRule(recurrenceWith: frequency, interval: interval, end: recurrenceEnd)]
    }

    func getCommit() -> Bool {
        return commit
    }
}
