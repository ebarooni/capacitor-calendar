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
        val values =
            ContentValues().apply {
                put(CalendarContract.Events.TITLE, input.title)
                put(CalendarContract.Events.ALL_DAY, input.isAllDay)
                input.calendarId?.let { put(CalendarContract.Events.CALENDAR_ID, it) }
                input.location?.let { put(CalendarContract.Events.EVENT_LOCATION, it) }
                put(CalendarContract.Events.DTSTART, input.startDate)
                put(CalendarContract.Events.DTEND, input.endDate)
                input.description?.let { put(CalendarContract.Events.DESCRIPTION, it) }
                input.availability?.let { put(CalendarContract.Events.AVAILABILITY, it) }
                input.organizer?.let { put(CalendarContract.Events.ORGANIZER, it) }
                input.duration?.let { put(CalendarContract.Events.DURATION, it) }
                input.color?.let { put(CalendarContract.Events.EVENT_COLOR, it) }
            }
        val uri: Uri? = cr.insert(CalendarContract.Events.CONTENT_URI, values)
        val eventID: Long = uri?.lastPathSegment?.toLong() ?: throw PluginError.FailedToRetrieveEventId
        // TODO: Implement reminders and attendees
        return CreateEventResult(eventID)
    }
}
