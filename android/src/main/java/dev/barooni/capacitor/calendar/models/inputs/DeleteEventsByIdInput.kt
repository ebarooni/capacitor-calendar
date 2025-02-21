package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.utils.ImplementationHelper

data class DeleteEventsByIdInput(
    private val call: PluginCall,
) {
    var ids = call.getArray("ids")?.let { ImplementationHelper.jsArrayToLongArray(it) } ?: throw PluginError.MissingId
}
