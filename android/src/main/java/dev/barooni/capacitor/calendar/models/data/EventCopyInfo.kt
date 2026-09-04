package dev.barooni.capacitor.calendar.models.data

data class EventCopyInfo(
    val calendarId: Long,
    val title: String?,
    val description: String?,
    val location: String?,
    val dtStart: Long?,
    val dtEnd: Long?,
    val duration: String?,
    val allDay: Int?,
    val eventTimezone: String?,
    val eventEndTimezone: String?,
    val availability: Int?,
    val organizer: String?,
    val eventColor: Int?,
    val rrule: String?,
)
