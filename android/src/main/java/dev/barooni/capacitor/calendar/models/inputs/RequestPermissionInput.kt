package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope

data class RequestPermissionInput(val call: PluginCall, val callbackName: String = "") {
    val scope: CalendarPermissionScope

    init {
        val rawScope = call.getString("scope") ?: throw PluginError.MissingScope
        scope = CalendarPermissionScope.fromValue(rawScope) ?: throw PluginError.InvalidScope
    }
}
