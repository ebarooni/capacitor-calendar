package dev.barooni.capacitor.calendar.models.enums

enum class CalendarPermissionScope(val value: String) {
    READ_CALENDAR("readCalendar"),
    READ_REMINDERS("readReminders"),
    WRITE_CALENDAR("writeCalendar"),
    WRITE_REMINDERS("writeReminders");

    companion object {
        fun fromValue(value: String): CalendarPermissionScope? {
            return entries.find { it.value == value }
        }
    }
}
