package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope

sealed class RequestPermissionInput {
    abstract val call: PluginCall
    abstract val scope: CalendarPermissionScope
    abstract val callbackName: String

    data class FromCall(
        override val call: PluginCall,
        override val callbackName: String,
    ) : RequestPermissionInput() {
        override val scope: CalendarPermissionScope =
            call
                .getString("scope")
                ?.let { CalendarPermissionScope.fromValue(it) }
                ?: throw PluginError.MissingScope

        init {
            if (scope == CalendarPermissionScope.WRITE_REMINDERS || scope == CalendarPermissionScope.READ_REMINDERS) {
                throw PluginError.InvalidScope
            }
        }
    }

    data class FromScope(
        override val call: PluginCall,
        override val scope: CalendarPermissionScope,
        override val callbackName: String,
    ) : RequestPermissionInput() {
        init {
            if (scope == CalendarPermissionScope.WRITE_REMINDERS || scope == CalendarPermissionScope.READ_REMINDERS) {
                throw PluginError.InvalidScope
            }
        }
    }
}
