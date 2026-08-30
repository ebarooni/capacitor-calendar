package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError

data class DeleteCalendarInput(
    private val call: PluginCall,
) {
    val id: Long =
        call.getString("id")?.let { idString ->
            idString.toLongOrNull() ?: throw PluginError.InvalidCalendarId
        } ?: throw PluginError.CalendarIdMissing
}
