package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.data.EventGuest
import dev.barooni.capacitor.calendar.utils.ImplementationHelper
import java.util.TimeZone

data class CreateEventInput(
    private val call: PluginCall,
) {
    private val input: CreateEventWithPromptInput = CreateEventWithPromptInput(call, "")
    val title: String = call.getString("title") ?: throw PluginError.TitleMissing
    val isAllDay: Int? = input.isAllDay?.let { if (it) 1 else 0 }
    val alerts: List<Int>? = ImplementationHelper.jsArrayToIntArray(call.getArray("alerts"))
    val calendarId: Long? = call.getString("calendarId")?.toLong()
    val location: String? = input.location
    val startDate: Long? = input.startDate
    val endDate: Long? = input.endDate
    val description: String? = input.description
    val availability: Int? = input.availability
    val organizer: String? = call.getString("organizer")
    val duration: String? = call.getString("duration")
    val color: Int? = ImplementationHelper.hexToColorInt(call.getString("color"))
    val attendees: List<EventGuest>? = ImplementationHelper.eventGuestsFromCall(call)
    val timezoneId = TimeZone.getDefault().id
}
