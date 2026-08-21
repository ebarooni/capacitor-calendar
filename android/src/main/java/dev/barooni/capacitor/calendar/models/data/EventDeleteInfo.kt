package dev.barooni.capacitor.calendar.models.data

data class EventDeleteInfo(
    val dtStart: Long?,
    val originalId: Long?,
    val rrule: String?,
)
