package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall

data class GetDefaultCalendarInput(
    private val call: PluginCall,
) {
    val useFallbackCalendar: Boolean = call.getBoolean("useFallbackCalendar", false)
}
