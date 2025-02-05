package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSObject
import com.getcapacitor.PermissionState
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.inputs.RequestPermissionInput
import dev.barooni.capacitor.calendar.models.templates.JSResult

data class RequestPermissionResult(val call: PluginCall, val getPermissionState: (String) -> PermissionState?): JSResult {
    private val state: PermissionState

    init {
        val input = RequestPermissionInput(call)
        state = getPermissionState(input.scope.value) ?: throw PluginError.UnhandledPermissionState
    }

    override fun toJSON(): JSObject {
        val result = JSObject()
        result.put("result", state.toString())
        return result
    }
}
