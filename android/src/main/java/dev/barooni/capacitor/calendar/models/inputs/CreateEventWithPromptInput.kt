package dev.barooni.capacitor.calendar.models.inputs

import android.content.Intent
import android.provider.CalendarContract
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.utils.ImplementationHelper

data class CreateEventWithPromptInput(
    val call: PluginCall,
    val callbackName: String,
) {
    private val title: String = call.getString("title", "") ?: ""
    val location: String? = call.getString("location")
    val startDate: Long? = call.getLong("startDate")?.let { ImplementationHelper.getCalendarFromTimestamp(it).timeInMillis }
    val endDate: Long? = call.getLong("endDate")?.let { ImplementationHelper.getCalendarFromTimestamp(it).timeInMillis }
    val isAllDay: Boolean? = call.getBoolean("isAllDay")
    val description: String? = call.getString("description")
    val availability: Int? = call.getInt("availability")
    val invitees: String? = ImplementationHelper.jsArrayToComaSeparatedString(call.getArray("invitees"))
    val intent: Intent = Intent(Intent.ACTION_INSERT).setData(CalendarContract.Events.CONTENT_URI)

    init {
        setEventData()
    }

    private fun setEventData() {
        intent.putExtra(CalendarContract.Events.TITLE, title)
        location?.let { intent.putExtra(CalendarContract.Events.EVENT_LOCATION, it) }
        startDate?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, it) }
        endDate?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, it) }
        isAllDay?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_ALL_DAY, it) }
        description?.let { intent.putExtra(CalendarContract.Events.DESCRIPTION, it) }
        availability?.let { intent.putExtra(CalendarContract.Events.AVAILABILITY, it) }
        invitees?.let { intent.putExtra(Intent.EXTRA_EMAIL, it) }
    }
}
