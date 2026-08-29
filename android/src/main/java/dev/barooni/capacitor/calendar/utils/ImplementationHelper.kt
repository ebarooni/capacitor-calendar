package dev.barooni.capacitor.calendar.utils

import android.content.ContentResolver
import android.content.ContentUris
import android.content.ContentValues
import android.provider.CalendarContract
import com.getcapacitor.JSArray
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.data.CalendarInfo
import dev.barooni.capacitor.calendar.models.data.EventDeleteInfo
import dev.barooni.capacitor.calendar.models.data.EventGuest
import dev.barooni.capacitor.calendar.models.enums.EventSpan
import org.json.JSONObject
import java.util.Calendar
import java.util.Locale
import java.util.TimeZone

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

        fun jsArrayToLongArray(array: JSArray): List<Long> {
            val list = array.toList<String>()
            return list.map { it.toLongOrNull() ?: throw PluginError.MissingId }
        }

        fun hexToColorInt(hex: String?): Int? {
            if (hex == null) {
                return null
            }

            if (!hex.startsWith("#")) {
                throw PluginError.InvalidColor
            }

            val digits = hex.substring(1)
            return when (digits.length) {
                6 -> {
                    // RRGGBB with fully opaque alpha — Color.parseColor is correct for 6-digit.
                    try {
                        android.graphics.Color.parseColor(hex)
                    } catch (_: IllegalArgumentException) {
                        throw PluginError.InvalidColor
                    }
                }

                8 -> {
                    // RRGGBBAA (not AARRGGBB). Do not use Color.parseColor for 8-digit.
                    try {
                        val r = digits.substring(0, 2).toInt(16)
                        val g = digits.substring(2, 4).toInt(16)
                        val b = digits.substring(4, 6).toInt(16)
                        val a = digits.substring(6, 8).toInt(16)
                        android.graphics.Color.argb(a, r, g, b)
                    } catch (_: NumberFormatException) {
                        throw PluginError.InvalidColor
                    }
                }

                else -> {
                    throw PluginError.InvalidColor
                }
            }
        }

        fun intToHexColor(colorInt: Int): String {
            val alpha = android.graphics.Color.alpha(colorInt)
            val red = android.graphics.Color.red(colorInt)
            val green = android.graphics.Color.green(colorInt)
            val blue = android.graphics.Color.blue(colorInt)
            return if (alpha == 0xFF) {
                String.format(Locale.US, "#%02X%02X%02X", red, green, blue)
            } else {
                String.format(Locale.US, "#%02X%02X%02X%02X", red, green, blue, alpha)
            }
        }

        fun eventGuestsFromCall(call: PluginCall): List<EventGuest>? {
            val attendeesJson = call.getArray("attendees") ?: return null
            return attendeesJson.toList<JSONObject>().map { guest ->
                EventGuest(
                    email = if (guest.has("email")) guest.getString("email") else throw PluginError.AttendeeEmailMissing,
                    name = if (guest.has("name")) guest.getString("name") else null,
                    null,
                    null,
                    null,
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
            alerts.forEach { userMinutes ->
                val providerMinutes =
                    when {
                        userMinutes > 0 -> -kotlin.math.abs(userMinutes)

                        // after start -> store negative
                        userMinutes < 0 -> kotlin.math.abs(userMinutes)

                        // before start -> store positive
                        else -> 0
                    }
                val alertValues =
                    ContentValues().apply {
                        put(CalendarContract.Reminders.EVENT_ID, eventId)
                        put(CalendarContract.Reminders.MINUTES, providerMinutes)
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

        fun resolveDefaultCalendar(
            calendars: List<CalendarInfo>,
            useFallbackCalendar: Boolean,
        ): CalendarInfo? {
            if (calendars.isEmpty()) {
                return null
            }

            val primary = calendars.find { it.isPrimary == true }
            if (primary != null) {
                return primary
            }

            return if (useFallbackCalendar) calendars.first() else null
        }

        fun getDefaultCalendarId(cr: ContentResolver): Long {
            val calendar =
                resolveDefaultCalendar(listCalendars(cr), useFallbackCalendar = true)
                    ?: throw PluginError.NoCalendarsAvailable
            return calendar.id.toLong()
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

        fun requiresInstanceDateForDelete(
            cr: ContentResolver,
            eventId: Long,
            span: EventSpan,
        ): Boolean = needsInstanceDate(queryEventDeleteInfo(cr, eventId), span)

        fun ensureInstanceDatePresentIfRequired(
            cr: ContentResolver,
            eventId: Long,
            span: EventSpan,
            instanceDate: Long?,
        ) {
            if (requiresInstanceDateForDelete(cr, eventId, span) && instanceDate == null) {
                throw PluginError.InstanceDateMissing
            }
        }

        fun deleteEvent(
            cr: ContentResolver,
            eventId: Long,
            span: EventSpan,
            instanceDate: Long? = null,
        ): Boolean {
            val info = queryEventDeleteInfo(cr, eventId)
            val masterId = info.originalId ?: eventId
            val isException = info.originalId != null
            val isRecurringMaster = !info.rrule.isNullOrBlank() && !isException

            return when (span) {
                EventSpan.THIS_EVENT -> {
                    when {
                        isException -> {
                            deleteEventRow(cr, eventId)
                        }

                        isRecurringMaster -> {
                            val date = instanceDate ?: throw PluginError.InstanceDateMissing
                            insertCanceledException(cr, masterId, date)
                        }

                        else -> {
                            deleteEventRow(cr, eventId)
                        }
                    }
                }

                EventSpan.THIS_AND_FUTURE_EVENTS -> {
                    when {
                        isRecurringMaster -> {
                            // No instanceDate → treat as deleting from series start (whole series).
                            if (instanceDate == null) {
                                deleteEventRow(cr, masterId)
                            } else {
                                deleteThisAndFuture(cr, masterId, instanceDate)
                            }
                        }

                        isException -> {
                            val date =
                                instanceDate
                                    ?: info.originalInstanceTime
                                    ?: throw PluginError.InstanceDateMissing
                            deleteThisAndFuture(cr, masterId, date)
                        }

                        else -> {
                            deleteEventRow(cr, eventId)
                        }
                    }
                }
            }
        }

        private fun needsInstanceDate(
            info: EventDeleteInfo,
            span: EventSpan,
        ): Boolean {
            val isException = info.originalId != null
            val isRecurringMaster = !info.rrule.isNullOrBlank() && !isException
            return when (span) {
                // Only occurrence cancel on a series master needs an explicit instance time.
                EventSpan.THIS_EVENT -> isRecurringMaster

                // Masters fall back to whole-series delete; exceptions fall back to ORIGINAL_INSTANCE_TIME.
                EventSpan.THIS_AND_FUTURE_EVENTS -> isException && info.originalInstanceTime == null
            }
        }

        private fun deleteEventRow(
            cr: ContentResolver,
            eventId: Long,
        ): Boolean {
            val uri =
                ContentUris.withAppendedId(
                    CalendarContract.Events.CONTENT_URI,
                    eventId,
                )
            return cr.delete(uri, null, null) > 0
        }

        private fun insertCanceledException(
            cr: ContentResolver,
            masterId: Long,
            instanceDate: Long,
        ): Boolean {
            val values =
                ContentValues().apply {
                    put(CalendarContract.Events.ORIGINAL_INSTANCE_TIME, instanceDate)
                    put(CalendarContract.Events.STATUS, CalendarContract.Events.STATUS_CANCELED)
                }
            val uri =
                ContentUris.withAppendedId(
                    CalendarContract.Events.CONTENT_EXCEPTION_URI,
                    masterId,
                )
            return cr.insert(uri, values) != null
        }

        private fun deleteThisAndFuture(
            cr: ContentResolver,
            masterId: Long,
            instanceDate: Long,
        ): Boolean {
            val info = queryEventDeleteInfo(cr, masterId)
            val rrule = info.rrule
            if (rrule.isNullOrBlank()) {
                return false
            }

            // Targeting the first occurrence (or earlier) removes the whole series.
            val seriesStart = info.dtStart
            if (seriesStart != null && instanceDate <= seriesStart) {
                return deleteEventRow(cr, masterId)
            }

            val values =
                ContentValues().apply {
                    put(CalendarContract.Events.RRULE, rruleEndingBefore(rrule, instanceDate))
                }
            val uri =
                ContentUris.withAppendedId(
                    CalendarContract.Events.CONTENT_URI,
                    masterId,
                )
            return cr.update(uri, values, null, null) > 0
        }

        private fun rruleEndingBefore(
            rrule: String,
            instanceDateMs: Long,
        ): String {
            // UNTIL is inclusive; end the series one second before this occurrence.
            val untilMs = instanceDateMs - 1000L
            val untilPart = "UNTIL=${formatUntilUtc(untilMs)}"
            val parts =
                rrule
                    .split(";")
                    .filter { part ->
                        val key = part.substringBefore("=").uppercase()
                        key.isNotEmpty() && key != "UNTIL" && key != "COUNT"
                    }.toMutableList()
            parts.add(untilPart)
            return parts.joinToString(";")
        }

        private fun formatUntilUtc(untilMs: Long): String {
            val calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"))
            calendar.timeInMillis = untilMs

            val year = calendar.get(Calendar.YEAR)
            val month = calendar.get(Calendar.MONTH) + 1
            val day = calendar.get(Calendar.DAY_OF_MONTH)
            val hour = calendar.get(Calendar.HOUR_OF_DAY)
            val minute = calendar.get(Calendar.MINUTE)
            val second = calendar.get(Calendar.SECOND)

            return String.format(
                Locale.US,
                "%04d%02d%02dT%02d%02d%02dZ",
                year,
                month,
                day,
                hour,
                minute,
                second,
            )
        }

        private fun queryEventDeleteInfo(
            cr: ContentResolver,
            eventId: Long,
        ): EventDeleteInfo {
            val uri =
                ContentUris.withAppendedId(
                    CalendarContract.Events.CONTENT_URI,
                    eventId,
                )

            val projection =
                arrayOf(
                    CalendarContract.Events.DTSTART,
                    CalendarContract.Events.ORIGINAL_ID,
                    CalendarContract.Events.ORIGINAL_INSTANCE_TIME,
                    CalendarContract.Events.RRULE,
                )

            cr
                .query(
                    uri,
                    projection,
                    null,
                    null,
                    null,
                )?.use { cursor ->
                    if (!cursor.moveToFirst()) {
                        return EventDeleteInfo(
                            dtStart = null,
                            originalId = null,
                            originalInstanceTime = null,
                            rrule = null,
                        )
                    }

                    val dtStartIndex = cursor.getColumnIndex(CalendarContract.Events.DTSTART)
                    val originalIdIndex = cursor.getColumnIndex(CalendarContract.Events.ORIGINAL_ID)
                    val originalInstanceTimeIndex =
                        cursor.getColumnIndex(CalendarContract.Events.ORIGINAL_INSTANCE_TIME)
                    val rruleIndex = cursor.getColumnIndex(CalendarContract.Events.RRULE)

                    val dtStart =
                        if (dtStartIndex >= 0 && !cursor.isNull(dtStartIndex)) {
                            cursor.getLong(dtStartIndex)
                        } else {
                            null
                        }

                    val originalId =
                        if (originalIdIndex >= 0 && !cursor.isNull(originalIdIndex)) {
                            cursor.getLong(originalIdIndex)
                        } else {
                            null
                        }

                    val originalInstanceTime =
                        if (originalInstanceTimeIndex >= 0 && !cursor.isNull(originalInstanceTimeIndex)) {
                            cursor.getLong(originalInstanceTimeIndex)
                        } else {
                            null
                        }

                    val rrule =
                        if (rruleIndex >= 0 && !cursor.isNull(rruleIndex)) {
                            cursor.getString(rruleIndex)
                        } else {
                            null
                        }

                    return EventDeleteInfo(
                        dtStart = dtStart,
                        originalId = originalId,
                        originalInstanceTime = originalInstanceTime,
                        rrule = rrule,
                    )
                }

            return EventDeleteInfo(
                dtStart = null,
                originalId = null,
                originalInstanceTime = null,
                rrule = null,
            )
        }

        fun getEventAlerts(
            cr: ContentResolver,
            eventId: Long,
        ): List<Int> {
            val alerts = mutableListOf<Int>()

            val uri = CalendarContract.Reminders.CONTENT_URI
            val projection = arrayOf(CalendarContract.Reminders.MINUTES)
            val selection = "${CalendarContract.Reminders.EVENT_ID} = ?"
            val selectionArgs = arrayOf(eventId.toString())

            val cursor = cr.query(uri, projection, selection, selectionArgs, null)

            cursor?.use {
                while (it.moveToNext()) {
                    val providerMinutes = it.getInt(it.getColumnIndexOrThrow(CalendarContract.Reminders.MINUTES))

                    val userMinutes =
                        if (providerMinutes >= 0) {
                            -kotlin.math.abs(providerMinutes)
                        } else {
                            kotlin.math.abs(providerMinutes)
                        }

                    alerts.add(userMinutes)
                }
            }

            return alerts
        }

        fun getEventAttendees(
            cr: ContentResolver,
            eventId: Long,
        ): List<EventGuest> {
            val attendees = mutableListOf<EventGuest>()

            val uri = CalendarContract.Attendees.CONTENT_URI
            val projection =
                arrayOf(
                    CalendarContract.Attendees.ATTENDEE_EMAIL,
                    CalendarContract.Attendees.ATTENDEE_NAME,
                    CalendarContract.Attendees.ATTENDEE_RELATIONSHIP,
                    CalendarContract.Attendees.ATTENDEE_TYPE,
                )
            val selection = "${CalendarContract.Attendees.EVENT_ID} = ?"
            val selectionArgs = arrayOf(eventId.toString())

            val cursor = cr.query(uri, projection, selection, selectionArgs, null)

            cursor?.use { attendee ->
                while (attendee.moveToNext()) {
                    val email =
                        attendee
                            .getColumnIndex(CalendarContract.Attendees.ATTENDEE_EMAIL)
                            .takeIf { it != -1 }
                            ?.let { attendee.getString(it) }
                    val name =
                        attendee
                            .getColumnIndex(CalendarContract.Attendees.ATTENDEE_NAME)
                            .takeIf { it != -1 }
                            ?.let { attendee.getString(it) }
                    val relationship =
                        attendee
                            .getColumnIndex(CalendarContract.Attendees.ATTENDEE_RELATIONSHIP)
                            .takeIf { it != -1 }
                            ?.let { mapAttendeeRelationship(attendee.getInt(it)) }
                    val type =
                        attendee
                            .getColumnIndex(CalendarContract.Attendees.ATTENDEE_TYPE)
                            .takeIf { it != -1 }
                            ?.let { mapAttendeeType(attendee.getInt(it)) }
                    val status =
                        attendee
                            .getColumnIndex(CalendarContract.Attendees.ATTENDEE_STATUS)
                            .takeIf { it != -1 }
                            ?.let { mapAttendeeStatus(attendee.getInt(it)) }
                    attendees.add(EventGuest(email, name, relationship, type, status))
                }
            }

            return attendees
        }

        fun buildDurationFromBeginEnd(
            begin: Long,
            end: Long,
            isAllDay: Boolean,
        ): String {
            val diffMs = (end - begin).coerceAtLeast(0)

            return if (isAllDay) {
                val days = (diffMs / (24 * 60 * 60 * 1000)).coerceAtLeast(1)
                "P${days}D"
            } else {
                val totalSeconds = (diffMs / 1000).coerceAtLeast(1)
                val hours = totalSeconds / 3600
                val minutes = (totalSeconds % 3600) / 60
                val seconds = totalSeconds % 60

                buildString {
                    append("PT")
                    if (hours > 0) append("${hours}H")
                    if (minutes > 0) append("${minutes}M")
                    if (seconds > 0) append("${seconds}S")
                    if (hours == 0L && minutes == 0L && seconds == 0L) append("1S")
                }
            }
        }

        fun mapAttendeeRelationship(relationship: Int): String =
            when (relationship) {
                CalendarContract.Attendees.RELATIONSHIP_ATTENDEE -> "attendee"
                CalendarContract.Attendees.RELATIONSHIP_NONE -> "nonParticipant"
                CalendarContract.Attendees.RELATIONSHIP_ORGANIZER -> "organizer"
                CalendarContract.Attendees.RELATIONSHIP_PERFORMER -> "performer"
                CalendarContract.Attendees.RELATIONSHIP_SPEAKER -> "speaker"
                else -> "unknown"
            }

        fun mapAttendeeType(attendeeType: Int): String =
            when (attendeeType) {
                CalendarContract.Attendees.TYPE_NONE -> "none"
                CalendarContract.Attendees.TYPE_REQUIRED -> "required"
                CalendarContract.Attendees.TYPE_OPTIONAL -> "optional"
                CalendarContract.Attendees.TYPE_RESOURCE -> "resource"
                else -> "unknown"
            }

        fun mapAttendeeStatus(attendeeStatus: Int): String =
            when (attendeeStatus) {
                CalendarContract.Attendees.ATTENDEE_STATUS_NONE -> "none"
                CalendarContract.Attendees.ATTENDEE_STATUS_ACCEPTED -> "accepted"
                CalendarContract.Attendees.ATTENDEE_STATUS_DECLINED -> "declined"
                CalendarContract.Attendees.ATTENDEE_STATUS_INVITED -> "invited"
                CalendarContract.Attendees.ATTENDEE_STATUS_TENTATIVE -> "tentative"
                else -> "none"
            }

        fun mapEventStatus(status: Int): String =
            when (status) {
                CalendarContract.Events.STATUS_TENTATIVE -> "tentative"
                CalendarContract.Events.STATUS_CONFIRMED -> "confirmed"
                CalendarContract.Events.STATUS_CANCELED -> "canceled"
                else -> "none"
            }
    }
}
