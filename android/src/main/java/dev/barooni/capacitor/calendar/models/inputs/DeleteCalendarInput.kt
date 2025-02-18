package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError

data class DeleteCalendarInput(
    private val call: PluginCall,
) {
    val id = call.getString("id")?.toLong() ?: throw PluginError.MissingId
}
