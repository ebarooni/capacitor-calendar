package dev.barooni.capacitor.calendar

import android.content.Context
import android.provider.CalendarContract
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import java.util.Calendar
import java.util.TimeZone

class CapacitorCalendar {
    @Throws(Exception::class)
    fun listEventsInRange(
        context: Context,
        startDate: Long,
        endDate: Long,
    ): JSArray {
        val projection =
            arrayOf(
                CalendarContract.Events._ID,
                CalendarContract.Events.TITLE,
                CalendarContract.Events.EVENT_LOCATION,
                CalendarContract.Events.CALENDAR_COLOR,
                CalendarContract.Events.ORGANIZER,
                CalendarContract.Events.DESCRIPTION,
                CalendarContract.Events.DTSTART,
                CalendarContract.Events.DTEND,
                CalendarContract.Events.EVENT_TIMEZONE,
                CalendarContract.Events.EVENT_END_TIMEZONE,
                CalendarContract.Events.DURATION,
                CalendarContract.Events.ALL_DAY,
                CalendarContract.Events.CALENDAR_ID,
            )
        val selection = "(${CalendarContract.Events.DTSTART} >= ?) AND (${CalendarContract.Events.DTEND} <= ?)"
        val selectionArgs = arrayOf(startDate.toString(), endDate.toString())

        val events = JSArray()

        context.contentResolver
            .query(
                CalendarContract.Events.CONTENT_URI,
                projection,
                selection,
                selectionArgs,
                null,
            )?.use { cursor ->
                val idColumnIndex = cursor.getColumnIndex(CalendarContract.Events._ID)
                val nameColumnIndex = cursor.getColumnIndex(CalendarContract.Events.TITLE)
                val locationColumnIndex = cursor.getColumnIndex(CalendarContract.Events.EVENT_LOCATION)
                val calendarColorColumnIndex = cursor.getColumnIndex(CalendarContract.Events.CALENDAR_COLOR)
                val organizerColumnIndex = cursor.getColumnIndex(CalendarContract.Events.ORGANIZER)
                val descriptionColumnIndex = cursor.getColumnIndex(CalendarContract.Events.DESCRIPTION)
                val dtStartColumnIndex = cursor.getColumnIndex(CalendarContract.Events.DTSTART)
                val dtEndColumnIndex = cursor.getColumnIndex(CalendarContract.Events.DTEND)
                val eventTimezoneColumnIndex = cursor.getColumnIndex(CalendarContract.Events.EVENT_TIMEZONE)
                val eventEndTimezoneColumnIndex = cursor.getColumnIndex(CalendarContract.Events.EVENT_END_TIMEZONE)
                val durationColumnIndex = cursor.getColumnIndex(CalendarContract.Events.DURATION)
                val isAllDayColumnIndex = cursor.getColumnIndex(CalendarContract.Events.ALL_DAY)
                val calendarIdColumnIndex = cursor.getColumnIndex(CalendarContract.Events.CALENDAR_ID)

                while (cursor.moveToNext()) {
                    val id = cursor.getLong(idColumnIndex)
                    val title = cursor.getString(nameColumnIndex)
                    val location = cursor.getString(locationColumnIndex)
                    val calendarColor = cursor.getInt(calendarColorColumnIndex)
                    val organizer = cursor.getString(organizerColumnIndex)
                    val desc = cursor.getString(descriptionColumnIndex)
                    val dtStart = cursor.getLong(dtStartColumnIndex)
                    val dtEnd = cursor.getLong(dtEndColumnIndex)
                    val eventTimezone = cursor.getString(eventTimezoneColumnIndex)
                    val eventEndTimezone = cursor.getString(eventEndTimezoneColumnIndex)
                    val duration = cursor.getString(durationColumnIndex)
                    val allDay = cursor.getInt(isAllDayColumnIndex) == 1
                    val calendarId = cursor.getLong(calendarIdColumnIndex)

                    val event =
                        JSObject().apply {
                            put("id", id.toString())
                            title?.takeIf { it.isNotEmpty() }?.let { put("title", it) }
                            location?.takeIf { it.isNotEmpty() }?.let { put("location", it) }
                            calendarColor.takeIf { it != 0 }?.let { put("eventColor", String.format("#%06X", 0xFFFFFF and it)) }
                            organizer?.takeIf { it.isNotEmpty() }?.let { put("organizer", it) }
                            desc?.takeIf { it.isNotEmpty() }?.let { put("description", it) }
                            dtStart.takeIf { it != 0.toLong() }?.let { put("startDate", it) }
                            dtEnd.takeIf { it != 0.toLong() }?.let { put("endDate", it) }
                            eventTimezone?.takeIf { it.isNotEmpty() }?.let { timezone ->
                                val abbreviation = getTimeZoneAbbreviation(timezone)
                                val obj = JSObject()
                                obj.put("region", timezone)
                                obj.put("abbreviation", abbreviation)
                                put("eventTimezone", obj)
                            }
                            eventEndTimezone?.takeIf { it.isNotEmpty() }?.let {
                                val abbreviation = getTimeZoneAbbreviation(it)
                                val obj = JSObject()
                                obj.put("region", it)
                                obj.put("abbreviation", abbreviation)
                                put("eventEndTimezone", obj)
                            }
                            duration?.takeIf { it.isNotEmpty() }?.let { put("duration", it) }
                            put("isAllDay", allDay)
                            calendarId.takeIf { it != 0.toLong() }?.let { put("calendarId", it.toString()) }
                        }
                    events.put(event)
                }
            } ?: throw Exception("Cursor is null")
        return events
    }

    fun getTimeZoneAbbreviation(timeZoneId: String): String {
        val timeZone = TimeZone.getTimeZone(timeZoneId)
        val now = Calendar.getInstance(timeZone)
        return timeZone.getDisplayName(timeZone.inDaylightTime(now.time), TimeZone.SHORT)
    }
}
