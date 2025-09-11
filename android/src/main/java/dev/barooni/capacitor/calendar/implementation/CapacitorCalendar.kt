package dev.barooni.capacitor.calendar.implementation

import android.app.AlertDialog
import android.content.ContentUris
import android.content.ContentValues
import android.content.Intent
import android.net.Uri
import android.provider.CalendarContract
import com.getcapacitor.PermissionState
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.CapacitorCalendarPlugin
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.data.CalendarEvent
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope
import dev.barooni.capacitor.calendar.models.inputs.CheckPermissionInput
import dev.barooni.capacitor.calendar.models.inputs.CreateCalendarInput
import dev.barooni.capacitor.calendar.models.inputs.CreateEventInput
import dev.barooni.capacitor.calendar.models.inputs.CreateEventWithPromptInput
import dev.barooni.capacitor.calendar.models.inputs.DeleteCalendarInput
import dev.barooni.capacitor.calendar.models.inputs.DeleteEventInput
import dev.barooni.capacitor.calendar.models.inputs.DeleteEventWithPromptInput
import dev.barooni.capacitor.calendar.models.inputs.DeleteEventsByIdInput
import dev.barooni.capacitor.calendar.models.inputs.ListEventsInRangeInput
import dev.barooni.capacitor.calendar.models.inputs.ModifyCalendarInput
import dev.barooni.capacitor.calendar.models.inputs.ModifyEvent
import dev.barooni.capacitor.calendar.models.inputs.ModifyEventWithPromptInput
import dev.barooni.capacitor.calendar.models.inputs.OpenCalendarInput
import dev.barooni.capacitor.calendar.models.inputs.RequestAllPermissionsInput
import dev.barooni.capacitor.calendar.models.inputs.RequestPermissionInput
import dev.barooni.capacitor.calendar.models.results.CheckAllPermissionsResult
import dev.barooni.capacitor.calendar.models.results.CheckPermissionResult
import dev.barooni.capacitor.calendar.models.results.CreateCalendarResult
import dev.barooni.capacitor.calendar.models.results.CreateEventResult
import dev.barooni.capacitor.calendar.models.results.DeleteEventWithPromptResult
import dev.barooni.capacitor.calendar.models.results.DeleteEventsByIdResult
import dev.barooni.capacitor.calendar.models.results.GetDefaultCalendarResult
import dev.barooni.capacitor.calendar.models.results.ListCalendarsResult
import dev.barooni.capacitor.calendar.models.results.ListEventsInRangeResult
import dev.barooni.capacitor.calendar.utils.ImplementationHelper

class CapacitorCalendar(
    private val plugin: CapacitorCalendarPlugin,
) {
    fun checkPermission(input: CheckPermissionInput): CheckPermissionResult {
        val state = plugin.getPermissionState(input.scope.value) ?: throw PluginError.UnhandledPermissionState
        val result = CheckPermissionResult(state)
        return result
    }

    fun checkAllPermissions(): CheckAllPermissionsResult {
        val permissionStates: Map<CalendarPermissionScope, PermissionState> =
            CalendarPermissionScope.entries.associateWith { plugin.getPermissionState(it.value) ?: PermissionState.PROMPT }
        val result = CheckAllPermissionsResult(permissionStates)
        return result
    }

    fun requestPermission(
        input: RequestPermissionInput,
        callback: (String, PluginCall, String) -> Unit,
    ) {
        callback(input.scope.value, input.call, input.callbackName)
    }

    fun requestAllPermissions(
        input: RequestAllPermissionsInput,
        callback: (String, PluginCall, String) -> Unit,
    ) {
        callback(input.alias, input.call, input.callbackName)
    }

    fun createEventWithPrompt(
        input: CreateEventWithPromptInput,
        callback: (PluginCall, Intent, String) -> Unit,
    ) {
        callback(input.call, input.intent, input.callbackName)
    }

    fun modifyEventWithPrompt(
        input: ModifyEventWithPromptInput,
        callback: (PluginCall, Intent, String) -> Unit,
    ) {
        callback(input.call, input.intent, input.callbackName)
    }

    fun createEvent(input: CreateEventInput): CreateEventResult {
        val cr = plugin.context.contentResolver
        val calendarId: Long = input.calendarId ?: ImplementationHelper.getDefaultCalendarId(cr)

        val values =
            ContentValues().apply {
                put(CalendarContract.Events.TITLE, input.title)
                put(CalendarContract.Events.CALENDAR_ID, calendarId)
                put(CalendarContract.Events.EVENT_TIMEZONE, input.timezoneId)
                input.isAllDay?.let { put(CalendarContract.Events.ALL_DAY, it) }
                input.location?.let { put(CalendarContract.Events.EVENT_LOCATION, it) }
                input.startDate?.let { put(CalendarContract.Events.DTSTART, it) }
                input.endDate?.let { put(CalendarContract.Events.DTEND, it) }
                input.description?.let { put(CalendarContract.Events.DESCRIPTION, it) }
                input.availability?.let { put(CalendarContract.Events.AVAILABILITY, it) }
                input.organizer?.let { put(CalendarContract.Events.ORGANIZER, it) }
                input.duration?.let { put(CalendarContract.Events.DURATION, it) }
                input.color?.let { put(CalendarContract.Events.EVENT_COLOR, it) }
            }
        val uri: Uri? = cr.insert(CalendarContract.Events.CONTENT_URI, values)
        val eventId: Long = uri?.lastPathSegment?.toLong() ?: throw PluginError.FailedToRetrieveEventId
        input.attendees?.let { ImplementationHelper.insertAttendeesToEvent(eventId, cr, it) }
        input.alerts?.let { ImplementationHelper.insertAlertsToEvents(eventId, cr, it) }
        return CreateEventResult(eventId)
    }

    fun modifyEvent(input: ModifyEvent) {
        val cr = plugin.context.contentResolver
        val values =
            ContentValues().apply {
                input.title?.let { put(CalendarContract.Events.TITLE, it) }
                input.calendarId?.let { put(CalendarContract.Events.CALENDAR_ID, it) }
                input.location?.let { put(CalendarContract.Events.EVENT_LOCATION, it) }
                input.startDate?.let { put(CalendarContract.Events.DTSTART, it) }
                input.endDate?.let { put(CalendarContract.Events.DTEND, it) }
                input.isAllDay?.let { put(CalendarContract.Events.ALL_DAY, it) }
                input.description?.let { put(CalendarContract.Events.DESCRIPTION, it) }
                input.availability?.let { put(CalendarContract.Events.AVAILABILITY, it) }
                input.organizer?.let { put(CalendarContract.Events.ORGANIZER, it) }
                input.color?.let { put(CalendarContract.Events.EVENT_COLOR, it) }
                input.duration?.let { put(CalendarContract.Events.DURATION, it) }
            }
        val uri = ContentUris.withAppendedId(CalendarContract.Events.CONTENT_URI, input.id)
        cr.update(uri, values, null, null)
        input.attendees?.let {
            ImplementationHelper.deleteAttendeesFromEvent(input.id, cr)
            ImplementationHelper.insertAttendeesToEvent(input.id, cr, it)
        }
        input.alerts?.let {
            ImplementationHelper.deleteAlertsFromEvent(input.id, cr)
            ImplementationHelper.insertAlertsToEvents(input.id, cr, it)
        }
    }

    fun listCalendars(): ListCalendarsResult {
        val cr = plugin.context.contentResolver
        val calendars = ImplementationHelper.listCalendars(cr)
        return ListCalendarsResult(calendars)
    }

    fun getDefaultCalendar(): GetDefaultCalendarResult {
        val cr = plugin.context.contentResolver
        val calendars = ImplementationHelper.listCalendars(cr)
        val primaryCalendar = calendars.find { it.isPrimary == true }
        return GetDefaultCalendarResult(primaryCalendar)
    }

    fun openCalendar(input: OpenCalendarInput) {
        val intent =
            Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse("content://com.android.calendar/time/${input.date}")
            }
        plugin.activity.startActivity(intent)
    }

    fun createCalendar(input: CreateCalendarInput): CreateCalendarResult {
        val values =
            ContentValues().apply {
                put(CalendarContract.Calendars.ACCOUNT_NAME, input.accountName)
                put(CalendarContract.Calendars.ACCOUNT_TYPE, input.accountType)
                put(CalendarContract.Calendars.NAME, input.title)
                put(CalendarContract.Calendars.CALENDAR_DISPLAY_NAME, input.title)
                put(CalendarContract.Calendars.CALENDAR_COLOR, input.color)
                put(CalendarContract.Calendars.CALENDAR_ACCESS_LEVEL, input.accessLevel)
                put(CalendarContract.Calendars.OWNER_ACCOUNT, input.ownerAccount)
                put(CalendarContract.Calendars.ALLOWED_REMINDERS, input.allowedReminders)
                put(CalendarContract.Calendars.VISIBLE, 1)
                put(CalendarContract.Calendars.SYNC_EVENTS, 1)
            }

        val uri: Uri =
            CalendarContract.Calendars.CONTENT_URI
                .buildUpon()
                .appendQueryParameter(CalendarContract.CALLER_IS_SYNCADAPTER, "true")
                .appendQueryParameter(CalendarContract.Calendars.ACCOUNT_NAME, input.accountName)
                .appendQueryParameter(CalendarContract.Calendars.ACCOUNT_TYPE, input.accountType)
                .build()

        val cr = plugin.context.contentResolver
        val calendarUri = cr.insert(uri, values)
        return CreateCalendarResult(calendarUri?.lastPathSegment)
    }

    fun deleteCalendar(input: DeleteCalendarInput) {
        val uri: Uri = ContentUris.withAppendedId(CalendarContract.Calendars.CONTENT_URI, input.id)
        val cr = plugin.context.contentResolver
        val rowsDeleted = cr.delete(uri, null, null)

        if (rowsDeleted < 1) {
            throw PluginError.FailedToDelete
        }
    }

    fun deleteEventsById(input: DeleteEventsByIdInput): DeleteEventsByIdResult {
        val cr = plugin.context.contentResolver
        val result = DeleteEventsByIdResult()
        input.ids.forEach { id ->
            val deleted = ImplementationHelper.deleteEvent(cr, id)
            if (deleted) {
                result.deleted(id)
            } else {
                result.failed(id)
            }
        }
        return result
    }

    fun deleteEvent(input: DeleteEventInput) {
        val cr = plugin.context.contentResolver
        val deleted = ImplementationHelper.deleteEvent(cr, input.id)
        if (!deleted) {
            throw PluginError.FailedToDelete
        }
    }

    fun deleteEventWithPrompt(
        input: DeleteEventWithPromptInput,
        onComplete: (DeleteEventWithPromptResult) -> Unit,
    ) {
        val cr = plugin.context.contentResolver
        val builder =
            AlertDialog
                .Builder(plugin.context)
                .setTitle(input.title)
                .setMessage(input.message)
                .setNegativeButton(input.cancelButtonText) { dialog, _ ->
                    dialog.dismiss()
                    val result = DeleteEventWithPromptResult(false)
                    onComplete(result)
                }.setPositiveButton(input.confirmButtonText) { _, _ ->
                    val result = DeleteEventWithPromptResult(ImplementationHelper.deleteEvent(cr, input.id))
                    onComplete(result)
                }

        val dialog = builder.create()
        dialog.show()
    }

    fun listEventsInRange(input: ListEventsInRangeInput): ListEventsInRangeResult {
        val cr = plugin.context.contentResolver
        val events = mutableListOf<CalendarEvent>()
        val builder = CalendarContract.Instances.CONTENT_URI.buildUpon()
        ContentUris.appendId(builder, input.from)
        ContentUris.appendId(builder, input.to)
        val uri = builder.build()
        val projection =
            arrayOf(
                CalendarContract.Instances.EVENT_ID,
                CalendarContract.Instances.TITLE,
                CalendarContract.Instances.CALENDAR_ID,
                CalendarContract.Instances.EVENT_LOCATION,
                CalendarContract.Instances.BEGIN,
                CalendarContract.Instances.END,
                CalendarContract.Instances.ALL_DAY,
                CalendarContract.Instances.DESCRIPTION,
                CalendarContract.Instances.AVAILABILITY,
                CalendarContract.Instances.ORGANIZER,
                CalendarContract.Instances.EVENT_COLOR,
                CalendarContract.Instances.DURATION,
                CalendarContract.Instances.STATUS,
                CalendarContract.Instances.EVENT_TIMEZONE,
            )
        val cursor = cr.query(uri, projection, null, null, "${CalendarContract.Instances.BEGIN} ASC")
        cursor?.use { cursorInstance ->
            while (cursorInstance.moveToNext()) {
                val id = cursorInstance.getLong(cursorInstance.getColumnIndexOrThrow(CalendarContract.Instances.EVENT_ID))
                val title =
                    cursorInstance.getColumnIndex(CalendarContract.Instances.TITLE).takeIf { it != -1 }?.let {
                        cursorInstance.getString(it)
                    } ?: ""
                val calendarId =
                    cursorInstance.getColumnIndex(CalendarContract.Instances.CALENDAR_ID).takeIf { it != -1 }?.let {
                        cursorInstance.getLong(it).toString()
                    }
                val location =
                    cursorInstance.getColumnIndex(CalendarContract.Instances.EVENT_LOCATION).takeIf { it != -1 }?.let {
                        cursorInstance.getString(it)
                    }
                val startDate = cursorInstance.getLong(cursorInstance.getColumnIndexOrThrow(CalendarContract.Instances.BEGIN))
                val endDate = cursorInstance.getLong(cursorInstance.getColumnIndexOrThrow(CalendarContract.Instances.END))
                val isAllDay =
                    cursorInstance.getColumnIndex(CalendarContract.Instances.ALL_DAY).takeIf { it != -1 }?.let {
                        cursorInstance.getInt(it) == 1
                    } ?: false
                val alerts = ImplementationHelper.getEventAlerts(cr, id)
                val description =
                    cursorInstance.getColumnIndex(CalendarContract.Instances.DESCRIPTION).takeIf { it != -1 }?.let {
                        cursorInstance.getString(it)
                    }
                val availability =
                    cursorInstance.getColumnIndex(CalendarContract.Instances.AVAILABILITY).takeIf { it != -1 }?.let {
                        cursorInstance.getInt(it)
                    }
                val organizer =
                    cursorInstance.getColumnIndex(CalendarContract.Instances.ORGANIZER).takeIf { it != -1 }?.let {
                        cursorInstance.getString(it)
                    }
                val color =
                    cursorInstance.getColumnIndex(CalendarContract.Instances.EVENT_COLOR).takeIf { it != -1 }?.let {
                        ImplementationHelper.intToHexColor(cursorInstance.getInt(it))
                    }
                val duration =
                    cursorInstance.getColumnIndex(CalendarContract.Instances.DURATION).takeIf { it != -1 }?.let {
                        cursorInstance.getString(it)
                    }
                val status =
                    cursorInstance.getColumnIndex(CalendarContract.Instances.STATUS).takeIf { it != -1 }?.let {
                        ImplementationHelper.mapEventStatus(cursorInstance.getInt(it))
                    }
                val attendees = ImplementationHelper.getEventAttendees(cr, id)
                val timezone =
                    cursorInstance.getColumnIndex(CalendarContract.Instances.EVENT_TIMEZONE).takeIf { it != -1 }?.let {
                        cursorInstance.getString(it)
                    }

                events.add(
                    CalendarEvent(
                        id.toString(),
                        title,
                        calendarId,
                        location,
                        startDate,
                        endDate,
                        isAllDay,
                        alerts,
                        null,
                        description,
                        availability,
                        organizer,
                        color,
                        duration,
                        null,
                        null,
                        status,
                        null,
                        null,
                        attendees,
                        timezone,
                    ),
                )
            }
        }
        cursor?.close()
        return ListEventsInRangeResult(events)
    }

    fun modifyCalendar(input: ModifyCalendarInput) {
        val cr = plugin.context.contentResolver
        val values =
            ContentValues().apply {
                input.title?.let { put(CalendarContract.Calendars.CALENDAR_DISPLAY_NAME, it) }
                input.color?.let { put(CalendarContract.Calendars.CALENDAR_COLOR, it) }
            }
        val uri: Uri = ContentUris.withAppendedId(CalendarContract.Calendars.CONTENT_URI, input.id)
        val rowsUpdated = cr.update(uri, values, null, null)
        if (rowsUpdated < 1) {
            throw PluginError.FailedToModify
        }
    }
}
