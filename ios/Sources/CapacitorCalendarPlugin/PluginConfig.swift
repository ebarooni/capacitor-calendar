import Capacitor

struct PluginConfig {
    static let identifier = "CapacitorCalendarPlugin"
    static let jsName = "CapacitorCalendar"
    static let methods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "createEventWithPrompt", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkPermission", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkAllPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermission", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestAllPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "selectCalendarsWithPrompt", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "listCalendars", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getDefaultCalendar", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createEvent", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getDefaultRemindersList", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getRemindersLists", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createReminder", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openCalendar", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openReminders", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "listEventsInRange", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "deleteEventsById", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createCalendar", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "deleteCalendar", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getRemindersFromLists", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "deleteRemindersById", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestWriteOnlyCalendarAccess", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestFullCalendarAccess", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestFullRemindersAccess", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestReadOnlyCalendarAccess", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "modifyEventWithPrompt", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "modifyEvent", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "fetchAllCalendarSources", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "fetchAllRemindersSources", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "modifyReminder", returnType: CAPPluginReturnPromise)
    ]
}
