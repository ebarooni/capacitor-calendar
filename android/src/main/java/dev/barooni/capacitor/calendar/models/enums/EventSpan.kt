package dev.barooni.capacitor.calendar.models.enums

enum class EventSpan(
    val value: Int,
) {
    THIS_EVENT(0),
    THIS_AND_FUTURE_EVENTS(1),
    ;

    companion object {
        fun fromInt(value: Int): EventSpan? = entries.find { it.value == value }
    }
}
