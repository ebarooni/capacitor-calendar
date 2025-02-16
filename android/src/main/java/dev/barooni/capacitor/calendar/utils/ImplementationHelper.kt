package dev.barooni.capacitor.calendar.utils

import android.content.ContentResolver
import android.content.ContentValues
import android.provider.CalendarContract
import com.getcapacitor.JSArray
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.data.CalendarInfo
import dev.barooni.capacitor.calendar.models.data.EventGuest
import org.json.JSONObject
import java.util.Calendar

class ImplementationHelper {
    companion object {
        fun getCalendarFromTimestamp(timestamp: Long?): Calendar =
            Calendar.getInstance().apply {
                timeInMillis = timestamp ?: System.currentTimeMillis()
            }

        fun jsArrayToComaSeparatedString(array: JSArray?): String? {
            val list = array?.toList<Any>() ?: return null

            if (!list.all { it is String }) {
                throw PluginError.InvalidInvitees
            }

            return list.joinToString(", ")
        }

        fun jsArrayToIntArray(array: JSArray?): List<Int>? {
            val list = array?.toList<Int>() ?: return null
            return list
        }

        fun hexToColorInt(hex: String?): Int? =
            if (hex == null) {
                null
            } else {
                android.graphics.Color.parseColor(hex)
            }

        fun intToHexColor(colorInt: Int): String = String.format("#%08X", colorInt)

        fun eventGuestsFromCall(call: PluginCall): List<EventGuest>? {
            val attendeesJson = call.getArray("attendees") ?: return null
            return attendeesJson.toList<JSONObject>().map { guest ->
                EventGuest(
                    email = if (guest.has("email")) guest.getString("email") else throw PluginError.AttendeeEmailMissing,
                    name = if (guest.has("name")) guest.getString("name") else null,
                )
            }
        }

        fun insertAttendeesToEvent(
            eventId: Long,
            cr: ContentResolver,
            attendees: List<EventGuest>,
        ) {
            attendees.forEach { attendee ->
                val attendeeValues =
                    ContentValues().apply {
                        put(CalendarContract.Attendees.EVENT_ID, eventId)
                        attendee.name?.let { put(CalendarContract.Attendees.ATTENDEE_NAME, it) }
                        put(CalendarContract.Attendees.ATTENDEE_EMAIL, attendee.email)
                        put(CalendarContract.Attendees.ATTENDEE_RELATIONSHIP, CalendarContract.Attendees.RELATIONSHIP_ATTENDEE)
                        put(CalendarContract.Attendees.ATTENDEE_TYPE, CalendarContract.Attendees.TYPE_REQUIRED)
                        put(CalendarContract.Attendees.ATTENDEE_STATUS, CalendarContract.Attendees.ATTENDEE_STATUS_INVITED)
                    }
                cr.insert(CalendarContract.Attendees.CONTENT_URI, attendeeValues)
            }
        }

        fun deleteAttendeesFromEvent(
            eventId: Long,
            cr: ContentResolver,
        ) {
            cr.delete(
                CalendarContract.Attendees.CONTENT_URI,
                "${CalendarContract.Attendees.EVENT_ID} = ?",
                arrayOf(eventId.toString()),
            )
        }

        fun insertAlertsToEvents(
            eventId: Long,
            cr: ContentResolver,
            alerts: List<Int>,
        ) {
            alerts.forEach { alert ->
                val alertValues =
                    ContentValues().apply {
                        put(CalendarContract.Reminders.EVENT_ID, eventId)
                        put(CalendarContract.Reminders.MINUTES, alert)
                        put(CalendarContract.Reminders.METHOD, CalendarContract.Reminders.METHOD_ALERT)
                    }
                cr.insert(CalendarContract.Reminders.CONTENT_URI, alertValues)
            }
        }

        fun deleteAlertsFromEvent(
            eventId: Long,
            cr: ContentResolver,
        ) {
            cr.delete(
                CalendarContract.Reminders.CONTENT_URI,
                "${CalendarContract.Reminders.EVENT_ID} = ?",
                arrayOf(eventId.toString()),
            )
        }

        fun getDefaultCalendarId(cr: ContentResolver): Long {
            val uri = CalendarContract.Calendars.CONTENT_URI
            val projection =
                arrayOf(
                    CalendarContract.Calendars._ID,
                    CalendarContract.Calendars.IS_PRIMARY,
                )

            var fallbackCalendarId: Long? = null
            cr.query(uri, projection, null, null, null)?.use { cursor ->
                if (cursor.count == 0) {
                    throw PluginError.NoCalendarsAvailable
                }

                while (cursor.moveToNext()) {
                    val id = cursor.getLong(cursor.getColumnIndexOrThrow(CalendarContract.Calendars._ID))
                    val isPrimary = cursor.getInt(cursor.getColumnIndexOrThrow(CalendarContract.Calendars.IS_PRIMARY)) == 1

                    if (isPrimary) {
                        return id
                    }

                    if (fallbackCalendarId == null) {
                        fallbackCalendarId = id
                    }
                }
            }

            return fallbackCalendarId ?: throw PluginError.NoCalendarsAvailable
        }

        fun listCalendars(cr: ContentResolver): List<CalendarInfo> {
            val uri = CalendarContract.Calendars.CONTENT_URI
            val projection =
                arrayOf(
                    CalendarContract.Calendars._ID,
                    CalendarContract.Calendars.CALENDAR_DISPLAY_NAME,
                    CalendarContract.Calendars.NAME,
                    CalendarContract.Calendars.CALENDAR_COLOR,
                    CalendarContract.Calendars.VISIBLE,
                    CalendarContract.Calendars.ACCOUNT_NAME,
                    CalendarContract.Calendars.OWNER_ACCOUNT,
                    CalendarContract.Calendars.MAX_REMINDERS,
                    CalendarContract.Calendars.CALENDAR_LOCATION,
                    CalendarContract.Calendars.IS_PRIMARY,
                )

            val calendars = mutableListOf<CalendarInfo>()

            cr.query(uri, projection, null, null, null)?.use { cursor ->
                if (cursor.count == 0) {
                    return emptyList()
                }

                while (cursor.moveToNext()) {
                    val id = cursor.getLong(cursor.getColumnIndexOrThrow(CalendarContract.Calendars._ID)).toString()
                    val title =
                        cursor
                            .getColumnIndex(CalendarContract.Calendars.CALENDAR_DISPLAY_NAME)
                            .let { if (it < 0) null else cursor.getString(it) }
                    val internalName =
                        cursor.getColumnIndex(CalendarContract.Calendars.NAME).let {
                            if (it <
                                0
                            ) {
                                null
                            } else {
                                cursor.getString(it)
                            }
                        }
                    val colorInt =
                        cursor.getColumnIndex(CalendarContract.Calendars.CALENDAR_COLOR).let {
                            if (it <
                                0
                            ) {
                                null
                            } else {
                                cursor.getInt(it)
                            }
                        }
                    val color = colorInt?.let { intToHexColor(it) }
                    val visibleInt =
                        cursor.getColumnIndex(CalendarContract.Calendars.VISIBLE).let {
                            if (it <
                                0
                            ) {
                                null
                            } else {
                                cursor.getInt(it)
                            }
                        }
                    val visible = visibleInt?.let { it == 1 }
                    val accountName =
                        cursor.getColumnIndex(CalendarContract.Calendars.ACCOUNT_NAME).let {
                            if (it <
                                0
                            ) {
                                null
                            } else {
                                cursor.getString(it)
                            }
                        }
                    val ownerAccount =
                        cursor.getColumnIndex(CalendarContract.Calendars.OWNER_ACCOUNT).let {
                            if (it <
                                0
                            ) {
                                null
                            } else {
                                cursor.getString(it)
                            }
                        }
                    val maxReminders =
                        cursor.getColumnIndex(CalendarContract.Calendars.MAX_REMINDERS).let {
                            if (it <
                                0
                            ) {
                                null
                            } else {
                                cursor.getInt(it)
                            }
                        }
                    val location =
                        cursor.getColumnIndex(CalendarContract.Calendars.CALENDAR_LOCATION).let {
                            if (it <
                                0
                            ) {
                                null
                            } else {
                                cursor.getString(it)
                            }
                        }
                    val isPrimary =
                        cursor.getColumnIndexOrThrow(CalendarContract.Calendars.IS_PRIMARY).let {
                            if (it < 0) null else cursor.getInt(it) == 1
                        }
                    calendars.add(
                        CalendarInfo(id, title, internalName, color, visible, accountName, ownerAccount, maxReminders, location, isPrimary),
                    )
                }
            }
            return calendars
        }
    }
}
