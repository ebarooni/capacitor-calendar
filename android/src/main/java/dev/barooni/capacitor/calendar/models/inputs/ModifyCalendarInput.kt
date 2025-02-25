package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.utils.ImplementationHelper

data class ModifyCalendarInput(
    private val call: PluginCall,
) {
    val id = call.getString("id")?.toLong() ?: throw PluginError.MissingId
    val title = call.getString("title")
    val color = call.getString("color")?.let { ImplementationHelper.hexToColorInt(it) }
}
