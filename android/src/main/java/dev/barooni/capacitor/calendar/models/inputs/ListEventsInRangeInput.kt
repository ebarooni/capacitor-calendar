package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.utils.ImplementationHelper

data class ListEventsInRangeInput(
    private var call: PluginCall,
) {
    val from: Long =
        call.getLong("from")?.let { ImplementationHelper.getCalendarFromTimestamp(it).timeInMillis } ?: throw PluginError.FromDateMissing
    val to: Long =
        call.getLong("to")?.let { ImplementationHelper.getCalendarFromTimestamp(it).timeInMillis } ?: throw PluginError.ToDateMissing
}
