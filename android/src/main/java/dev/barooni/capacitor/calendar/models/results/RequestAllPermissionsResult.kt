package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSObject
import com.getcapacitor.PermissionState
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope
import dev.barooni.capacitor.calendar.models.templates.JSResult

data class RequestAllPermissionsResult(
    val getPermissionState: (String) -> PermissionState?,
) : JSResult {
    private val permissions: JSObject = JSObject()

    init {
        val writeCalendarState =
            getPermissionState(CalendarPermissionScope.WRITE_CALENDAR.value) ?: throw PluginError.UnhandledPermissionState
        permissions.put(CalendarPermissionScope.WRITE_CALENDAR.value, writeCalendarState.toString())
        val readCalendarState =
            getPermissionState(CalendarPermissionScope.WRITE_CALENDAR.value) ?: throw PluginError.UnhandledPermissionState
        permissions.put(CalendarPermissionScope.READ_CALENDAR.value, readCalendarState.toString())
        permissions.put(CalendarPermissionScope.WRITE_REMINDERS.value, PermissionState.PROMPT.toString())
        permissions.put(CalendarPermissionScope.READ_REMINDERS.value, PermissionState.PROMPT.toString())
    }

    override fun toJSON(): JSObject {
        val result = JSObject()
        result.put("result", permissions)
        return result
    }
}
