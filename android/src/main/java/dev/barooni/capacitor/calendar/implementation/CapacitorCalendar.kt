package dev.barooni.capacitor.calendar.implementation

import android.content.ContentValues
import android.content.Intent
import android.net.Uri
import android.provider.CalendarContract
import com.getcapacitor.PermissionState
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.CapacitorCalendarPlugin
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope
import dev.barooni.capacitor.calendar.models.inputs.CheckPermissionInput
import dev.barooni.capacitor.calendar.models.inputs.CreateEventInput
import dev.barooni.capacitor.calendar.models.inputs.CreateEventWithPromptInput
import dev.barooni.capacitor.calendar.models.inputs.ModifyEventWithPromptInput
import dev.barooni.capacitor.calendar.models.inputs.RequestAllPermissionsInput
import dev.barooni.capacitor.calendar.models.inputs.RequestPermissionInput
import dev.barooni.capacitor.calendar.models.results.CheckAllPermissionsResult
import dev.barooni.capacitor.calendar.models.results.CheckPermissionResult
import dev.barooni.capacitor.calendar.models.results.CreateEventResult
import dev.barooni.capacitor.calendar.utils.ImplementationHelper

class CapacitorCalendarNew(
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
}
