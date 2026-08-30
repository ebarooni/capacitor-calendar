package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.utils.ImplementationHelper

data class ModifyCalendarInput(
    private val call: PluginCall,
) {
    val id: Long =
        call.getString("id")?.let { idString ->
            idString.toLongOrNull() ?: throw PluginError.InvalidCalendarId
        } ?: throw PluginError.CalendarIdMissing
    val title = call.getString("title")
    val color = call.getString("color")?.let { ImplementationHelper.hexToColorInt(it) }

    init {
        if (title == null && color == null) {
            throw PluginError.NoFieldsToModify
        }
    }
}
