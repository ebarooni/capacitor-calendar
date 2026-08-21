/**
 Mirrors the TypeScript `EventSpan` enum.
 Maps to EventKit's `EKSpan.thisEvent` and `EKSpan.futureEvents`.
 */
enum EventSpan: Int {
    case thisEvent = 0
    case thisAndFutureEvents = 1
}
