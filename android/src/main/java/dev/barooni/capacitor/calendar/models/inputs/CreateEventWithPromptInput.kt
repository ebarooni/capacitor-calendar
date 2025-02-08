package dev.barooni.capacitor.calendar.models.inputs

import android.content.Intent
import android.provider.CalendarContract
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.utils.ImplementationHelper

data class CreateEventWithPromptInput(
    val call: PluginCall,
    val callbackName: String,
) {
    val title: String = call.getString("title", "") ?: ""
    val location: String? = call.getString("location")
    val startDate: Long = ImplementationHelper.getCalendarFromTimestamp(call.getLong("startDate")).timeInMillis
    val endDate: Long = ImplementationHelper.getCalendarFromTimestamp(call.getLong("endDate")).timeInMillis
    val isAllDay: Boolean = call.getBoolean("isAllDay") ?: false
    val description: String? = call.getString("description")
    val availability: Int? = call.getInt("availability")
    val invitees: String? = ImplementationHelper.jsArrayToComaSeparatedString(call.getArray("invitees"))
    val intent: Intent = Intent(Intent.ACTION_INSERT).setData(CalendarContract.Events.CONTENT_URI)
}
