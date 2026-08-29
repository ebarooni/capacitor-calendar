import Capacitor

struct GetDefaultCalendarInput {
    private let useFallbackCalendar: Bool

    init(call: CAPPluginCall) {
        self.useFallbackCalendar = call.getBool("useFallbackCalendar", false)
    }

    func getUseFallbackCalendar() -> Bool {
        return useFallbackCalendar
    }
}
