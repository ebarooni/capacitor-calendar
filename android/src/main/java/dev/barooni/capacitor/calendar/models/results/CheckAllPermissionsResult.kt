package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSObject
import com.getcapacitor.PermissionState
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope
import dev.barooni.capacitor.calendar.models.templates.JSResult

data class CheckAllPermissionsResult(
    val permissionStates: Map<CalendarPermissionScope, PermissionState>,
) : JSResult {
    override fun toJSON(): JSObject {
        val result = JSObject()
        permissionStates.forEach { (scope, state) -> result.put(scope.value, state.toString()) }
        return result
    }
}
