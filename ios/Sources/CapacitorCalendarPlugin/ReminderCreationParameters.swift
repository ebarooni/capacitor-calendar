import Foundation

public struct ReminderCreationParameters {
    let title: String?
    let listId: String?
    let priority: Int?
    let isCompleted: Bool?
    let startDate: Double?
    let dueDate: Double?
    let completionDate: Double?
    let notes: String?
    let url: String?
    let location: String?
    let recurrence: RecurrenceParameters?
}
