package dev.barooni.capacitor.calendar.implementation

import com.getcapacitor.PermissionState
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.CapacitorCalendarPlugin
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope
import dev.barooni.capacitor.calendar.models.inputs.CheckPermissionInput
import dev.barooni.capacitor.calendar.models.inputs.RequestAllPermissionsInput
import dev.barooni.capacitor.calendar.models.inputs.RequestPermissionInput
import dev.barooni.capacitor.calendar.models.results.CheckAllPermissionsResult
import dev.barooni.capacitor.calendar.models.results.CheckPermissionResult

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
}
