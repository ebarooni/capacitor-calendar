package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.data.EventGuest
import dev.barooni.capacitor.calendar.utils.ImplementationHelper

data class ModifyEvent(
    private val call: PluginCall,
) {
    val id: Long = call.getString("id")?.toLong() ?: throw PluginError.IdMissing
    val title: String? = call.getString("title")
    val calendarId: Long? = call.getString("calendarId")?.toLong()
    val location: String? = call.getString("calendar")
    val startDate: Long? = call.getLong("startDate")?.let { ImplementationHelper.getCalendarFromTimestamp(it).timeInMillis }
    val endDate: Long? = call.getLong("endDate")?.let { ImplementationHelper.getCalendarFromTimestamp(it).timeInMillis }
    val isAllDay: Int? = call.getBoolean("isAllDay")?.let { if (it) 1 else 0 }
    val alerts: List<Int>? = ImplementationHelper.jsArrayToIntArray(call.getArray("alerts"))
    val description: String? = call.getString("description")
    val availability: Int? = call.getInt("availability")
    val organizer: String? = call.getString("organizer")
    val color: Int? = ImplementationHelper.hexToColorInt(call.getString("color"))
    val duration: String? = call.getString("duration")
    val attendees: List<EventGuest>? = ImplementationHelper.eventGuestsFromCall(call)
}
