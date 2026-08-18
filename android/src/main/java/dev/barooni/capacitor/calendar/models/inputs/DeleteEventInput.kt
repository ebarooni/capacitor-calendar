package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.enums.EventSpan

data class DeleteEventInput(
    private val call: PluginCall,
) {
    val id = call.getString("id")?.toLongOrNull() ?: throw PluginError.MissingId
    val span: EventSpan = call.getInt("span")?.let { EventSpan.fromInt(it) } ?: EventSpan.THIS_EVENT
}
