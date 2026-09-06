import EventKit

struct RecurrenceInput {
    enum Frequency: String {
        case daily
        case weekly
        case monthly
        case yearly

        func toEKFrequency() -> EKRecurrenceFrequency {
            switch self {
            case .daily: return .daily
            case .weekly: return .weekly
            case .monthly: return .monthly
            case .yearly: return .yearly
            }
        }

        static func from(ekFrequency: EKRecurrenceFrequency) -> Frequency? {
            switch ekFrequency {
            case .daily: return .daily
            case .weekly: return .weekly
            case .monthly: return .monthly
            case .yearly: return .yearly
            @unknown default: return nil
            }
        }
    }

    let frequency: Frequency
    let interval: Int
    let count: Int?
    let end: EKRecurrenceEnd?

    let byWeekDay: [EKRecurrenceDayOfWeek]?
    let byMonthDay: [NSNumber]?
    let byMonth: [NSNumber]?

    let weeksOfTheYear: [NSNumber]?
    let daysOfTheYear: [NSNumber]?
}
