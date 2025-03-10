package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope

data class CheckPermissionInput(
    private val call: PluginCall,
) {
    val scope: CalendarPermissionScope

    init {
        val rawScope = call.getString("scope") ?: throw PluginError.MissingScope
        scope = CalendarPermissionScope.fromValue(rawScope) ?: throw PluginError.InvalidScope

        if (scope == CalendarPermissionScope.WRITE_REMINDERS || scope == CalendarPermissionScope.READ_REMINDERS) {
            throw PluginError.InvalidScope
        }
    }
}
