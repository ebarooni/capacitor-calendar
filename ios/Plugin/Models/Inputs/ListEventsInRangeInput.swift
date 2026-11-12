import Capacitor
import EventKit

struct ListEventsInRangeInput {
    private var from: Double
    private var to: Double
    private var calendarIds: [String]?

    init(call: CAPPluginCall) throws {
        guard let from = call.getDouble("from") else {
            throw PluginError.fromDateMissing
        }
        self.from = from
        guard let to = call.getDouble("to") else {
            throw PluginError.toDateMissing
        }
        self.to = to
        self.calendarIds = call.getArray("calendarIds") as? [String]
    }

    func getFrom() -> Date {
        return ImplementationHelper.dateFromTimestamp(from)
    }

    func getTo() -> Date {
        return ImplementationHelper.dateFromTimestamp(to)
    }

    func getCalendars(from eventStore: EKEventStore) throws -> [EKCalendar]? {
        guard let ids = calendarIds, !ids.isEmpty else {
            return nil
        }
        return try ids.map { id in
            guard let calendar = eventStore.calendar(withIdentifier: id) else {
                throw PluginError.calendarNotFound
            }
            return calendar
        }
    }
}
