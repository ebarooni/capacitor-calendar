package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSObject
import com.getcapacitor.PermissionState
import dev.barooni.capacitor.calendar.models.templates.JSResult

data class CheckPermissionResult(
    val state: PermissionState,
) : JSResult {
    override fun toJSON(): JSObject {
        val result = JSObject()
        result.put("result", state.toString())
        return result
    }
}
