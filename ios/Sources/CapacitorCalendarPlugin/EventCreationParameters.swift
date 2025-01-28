import Foundation

public struct EventCreationParameters {
    public var title: String?
    public var calendarId: String?
    public var location: String?
    public var startDate: Double?
    public var endDate: Double?
    public var isAllDay: Bool?
    public var alertOffsetInMinutesSingle: Double?
    public var alertOffsetInMinutesMultiple: [Double]?
    public var notes: String?
    public var url: String?
}
