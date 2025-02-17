package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.utils.ImplementationHelper

data class OpenCalendarInput(
    private val call: PluginCall,
) {
    val date: Long = ImplementationHelper.getCalendarFromTimestamp(call.getLong("date")).timeInMillis
}
