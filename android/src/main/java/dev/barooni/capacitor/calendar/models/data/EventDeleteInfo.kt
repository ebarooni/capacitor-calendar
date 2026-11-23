package dev.barooni.capacitor.calendar.models.data

data class EventDeleteInfo(
    val dtStart: Long?,
    val originalId: Long?,
    val originalInstanceTime: Long?,
    val rrule: String?,
    val dtEnd: Long? = null,
    val duration: String? = null,
    val exdate: String? = null,
    val timezone: String? = null,
    val isAllDay: Boolean = false,
    val syncId: String? = null,
)
