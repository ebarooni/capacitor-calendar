package dev.barooni.capacitor.calendar.model

import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import java.util.Calendar

data class CalendarEvent(
    val title: String,
    val calendarId: String?,
    val location: String?,
    val startMillis: Long,
    val endMillis: Long,
    val isAllDay: Boolean?,
    val url: String?,
    val notes: String?,
    val recurrenceRule: RecurrenceRule?,
) {
    init {
        require(title.isNotBlank())
    }

    companion object {
        fun fromJSObject(jsObject: JSObject): CalendarEvent {
            val title = jsObject.getString("title")
                ?: throw Exception("[CapacitorCalendar.${::fromJSObject.name}] A title for the event was not provided")
            val calendarId = jsObject.getString("calendarId")
            val location = jsObject.getString("location")
            val startDate = jsObject.getString("startDate")
            val endDate = jsObject.getString("endDate")
            val isAllDay = jsObject.getBoolean("isAllDay", false)
            val url = jsObject.getString("url")
            val notes = jsObject.getString("notes")
            val recurrenceRule = jsObject.getJSObject("recurrence")?.let { RecurrenceRule(it) }

            val startMillis = startDate?.toLong() ?: Calendar.getInstance().timeInMillis
            val endMillis = endDate?.toLong() ?: (startMillis + 3600 * 1000)

            return CalendarEvent(
                title,
                calendarId,
                location,
                startMillis,
                endMillis,
                isAllDay,
                url,
                notes,
                recurrenceRule
            )
        }

        fun fromPluginCall(call: PluginCall): CalendarEvent {
            val title = call.getString("title")
                ?: throw Exception("[CapacitorCalendar.${::fromPluginCall.name}] A title for the event was not provided")
            val calendarId = call.getString("calendarId")
            val location = call.getString("location")
            val startDate = call.getLong("startDate")
            val endDate = call.getLong("endDate")
            val isAllDay = call.getBoolean("isAllDay", false)
            val url = call.getString("url")
            val notes = call.getString("notes")
            val recurrenceRule = call.getObject("recurrence")?.let { RecurrenceRule(it) }

            val startMillis = startDate ?: Calendar.getInstance().timeInMillis
            val endMillis = endDate ?: (startMillis + 3600 * 1000)

            return CalendarEvent(
                title,
                calendarId,
                location,
                startMillis,
                endMillis,
                isAllDay,
                url,
                notes,
                recurrenceRule
            )
        }
    }
}
