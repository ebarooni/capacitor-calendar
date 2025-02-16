import Foundation
import EventKit
import UIKit
import Capacitor

public class CapacitorReminders: NSObject {
    private let eventStore: EKEventStore
    private let recurrenceFrequencyMapping: [Int: EKRecurrenceFrequency] = [
        0: .daily,
        1: .weekly,
        2: .monthly,
        3: .yearly
    ]

    init(eventStore: EKEventStore) {
        self.eventStore = eventStore
    }

    public func createReminder(with parameters: ReminderCreationParameters) throws -> String {
        func setCalendar() {
            if let listId = parameters.listId, let list = eventStore.calendar(withIdentifier: listId) {
                newReminder.calendar = list
            } else {
                newReminder.calendar = eventStore.defaultCalendarForNewReminders()
            }
        }

        func setPriority() {
            guard let priority = parameters.priority else { return }
            newReminder.priority = max(0, min(9, priority))
        }

        let newReminder = EKReminder(eventStore: eventStore)
        setCalendar()
        setPriority()
        setReminderDateComponents(
            reminder: newReminder,
            startDate: parameters.startDate,
            dueDate: parameters.dueDate,
            completionDate: parameters.completionDate
        )
        setReminderFrequency(reminder: newReminder, recurrence: parameters.recurrence)
        newReminder.title = parameters.title
        if let isCompleted = parameters.isCompleted {
            newReminder.isCompleted = isCompleted
        }
        if let notes = parameters.notes {
            newReminder.notes = notes
        }
        if let url = parameters.url {
            newReminder.url = URL(string: url)
        }
        if let location = parameters.location {
            newReminder.location = location
        }

        do {
            try eventStore.save(newReminder, commit: true)
            return newReminder.calendarItemIdentifier
        } catch {
            throw CapacitorCalendarPluginError.unknownActionEventCreationPrompt
        }
    }

    public func getRemindersFromLists(listIds: JSArray?) async throws -> [[String: Any]] {
        return try await withCheckedThrowingContinuation { continuation in
            var lists: [EKCalendar]?
            if let ids = listIds {
                lists = []
                for id in ids {
                    if let list = eventStore.calendar(withIdentifier: "\(id)") {
                        lists?.append(list)
                    }
                }
            }

            let predicate = eventStore.predicateForReminders(in: lists)

            self.eventStore.fetchReminders(matching: predicate) {reminders in
                if let result = reminders {
                    continuation.resume(returning: self.dictionaryRepresentationOfReminder(events: result))
                } else {
                    continuation.resume(returning: [])
                }

            }
        }
    }

    public func deleteRemindersById(ids: JSArray) async throws -> EventDeleteResults {
        await withCheckedContinuation { continuation in

            var deletedEvents: [String] = []
            var failedToDeleteEvents: [String] = []

            for id in ids {
                guard let reminder = eventStore.calendarItem(withIdentifier: "\(id)") else {
                    failedToDeleteEvents.append("\(id)")
                    continue
                }

                do {
                    try eventStore.remove(reminder as! EKReminder, commit: false)
                    deletedEvents.append("\(id)")
                } catch {
                    failedToDeleteEvents.append("\(id)")
                }
            }

            do {
                try eventStore.commit()
            } catch {
                failedToDeleteEvents.append(contentsOf: deletedEvents)
                deletedEvents.removeAll()
            }

            continuation.resume(returning: EventDeleteResults(deleted: deletedEvents, failed: failedToDeleteEvents))
        }
    }

    public func modifyReminder(id: String, update: ReminderCreationParameters) throws {
        guard let reminder = eventStore.calendarItem(withIdentifier: id) as? EKReminder else {
            throw CapacitorCalendarPluginError.undefinedEvent
        }
        if (update.title) != nil {
            reminder.title = update.title
        }
        if let listId = update.listId, let list = eventStore.calendar(withIdentifier: listId) {
            reminder.calendar = list
        }
        if update.priority != nil {
            func setPriority() {
                guard let priority = update.priority else { return }
                reminder.priority = max(0, min(9, priority))
            }
            setPriority()
        }
        if let isCompleted = update.isCompleted {
            reminder.isCompleted = isCompleted
        }
        setReminderDateComponents(
            reminder: reminder,
            startDate: update.startDate,
            dueDate: update.dueDate,
            completionDate: update.completionDate
        )
        if let notes = update.notes {
            reminder.notes = notes
        }
        if let url = update.url {
            reminder.url = URL(string: url)
        }
        if let location = update.location {
            reminder.location = location
        }
        setReminderFrequency(reminder: reminder, recurrence: update.recurrence)

        do {
            try eventStore.save(reminder, commit: true)
        } catch {
            throw CapacitorCalendarPluginError.undefinedEvent
        }
    }

    private func setReminderFrequency(reminder: EKReminder, recurrence: RecurrenceParameters?) {
        guard let frequency = recurrence?.frequency, let interval = recurrence?.interval else { return }
        var endDate: EKRecurrenceEnd?
        if let end = recurrence?.end {
            endDate = EKRecurrenceEnd(end: Date(timeIntervalSince1970: end / 1000))
        }
        if let recurrenceFrequency = recurrenceFrequencyMapping[frequency] {
            reminder.recurrenceRules = [EKRecurrenceRule(
                recurrenceWith: recurrenceFrequency,
                interval: interval,
                end: endDate
            )]
        }
    }

    private func setReminderDateComponents(reminder: EKReminder, startDate: Double?, dueDate: Double?, completionDate: Double?) {
        func setStartDate() {
            if let startDate = startDate {
                reminder.startDateComponents = Calendar.current.dateComponents(
                    [.year, .month, .day, .hour, .minute],
                    from: Date(timeIntervalSince1970: startDate / 1000)
                )
                reminder.startDateComponents?.timeZone = Calendar.current.timeZone
            }
        }

        func setDueDate() {
            if let dueDate = dueDate {
                reminder.dueDateComponents = Calendar.current.dateComponents(
                    [.year, .month, .day, .hour, .minute],
                    from: Date(timeIntervalSince1970: dueDate / 1000)
                )
                reminder.dueDateComponents?.timeZone = Calendar.current.timeZone
            }
        }

        func setCompletionDate() {
            if let completionDate = completionDate {
                reminder.completionDate = Date(timeIntervalSince1970: completionDate / 1000)
                reminder.timeZone = Calendar.current.timeZone
            }
        }

        setStartDate()
        setDueDate()
        setCompletionDate()
    }

    private func dictionaryRepresentationOfReminder(events: [EKReminder]) -> [[String: Any]] {
        return events.map { event in
            var dict = [String: Any]()
            dict["id"] = event.calendarItemIdentifier
            dict["listId"] = event.calendar.calendarIdentifier
            dict["isCompleted"] = event.isCompleted
            dict["priority"] = event.priority

            if let title = event.title, !title.isEmpty {
                dict["title"] = title
            }
            if let url = event.url {
                dict["url"] = url.absoluteString
            }
            if let notes = event.notes {
                dict["notes"] = notes
            }
            if let location = event.location {
                dict["location"] = location
            }
            if let startDate = event.startDateComponents, let startMillis = convertDateComponentToMillis(dateComponent: startDate) {
                dict["startDate"] = startMillis
            }
            if let dueDate = event.dueDateComponents, let dueMillis = convertDateComponentToMillis(dateComponent: dueDate) {
                dict["dueDate"] = dueMillis
            }
            if let completionDate = event.completionDate {
                dict["completionDate"] = completionDate.timeIntervalSince1970 * 1000
            }
            if let recurrenceRules = event.recurrenceRules {
                let recurrence = extractReminderRecurrenceRules(rules: recurrenceRules)

                if !recurrence.isEmpty {
                    dict["recurrence"] = recurrence
                }
            }

            return dict
        }
    }

    private func convertDateComponentToMillis(dateComponent: DateComponents) -> Double? {
        let calendar = Calendar.current
        if let startDate = calendar.date(from: dateComponent) {
            return startDate.timeIntervalSince1970 * 1000
        } else {
            return nil
        }
    }

    private func extractReminderRecurrenceRules(rules: [EKRecurrenceRule]) -> [[String: Any]] {
        return rules.map { rule in
            var obj = [String: Any]()

            obj["frequency"] = rule.frequency.rawValue
            obj["interval"] = rule.interval

            if let endDate = rule.recurrenceEnd?.endDate {
                obj["end"] = endDate.timeIntervalSince1970 * 1000
            }

            return obj
        }
    }

    private func hexStringFromColor(color: CGColor) -> String {
        guard let components = color.components, components.count >= 3 else {
            return "#000000"
        }

        let red = Float(components[0])
        let green = Float(components[1])
        let blue = Float(components[2])
        return String(format: "#%02lX%02lX%02lX",
                      lroundf(red * 255),
                      lroundf(green * 255),
                      lroundf(blue * 255))
    }
}
