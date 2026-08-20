/**
 Mirrors the TypeScript `EventSpan` enum.
 EventKit only exposes `EKSpan.thisEvent` and `EKSpan.futureEvents`;
 `allEvents` is handled explicitly in delete paths.
 */
enum EventSpan: Int {
    case thisEvent = 0
    case thisAndFutureEvents = 1
    case allEvents = 2
}
