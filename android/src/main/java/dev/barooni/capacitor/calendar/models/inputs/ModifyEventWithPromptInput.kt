package dev.barooni.capacitor.calendar.models.inputs

import android.content.ContentUris
import android.content.Intent
import android.net.Uri
import android.provider.CalendarContract
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError

data class ModifyEventWithPromptInput(
    val call: PluginCall,
    val callbackName: String,
) {
    private val input = CreateEventWithPromptInput(call, callbackName)
    private val id: Long
    private val title: String? = call.getString("title")
    val intent: Intent = Intent(Intent.ACTION_EDIT).setData(CalendarContract.Events.CONTENT_URI)

    init {
        val idString = call.getString("id") ?: throw PluginError.MissingId
        id = idString.toLong()
        val uri: Uri = ContentUris.withAppendedId(CalendarContract.Events.CONTENT_URI, id)
        intent.setData(uri)
        setEventUpdates()
    }

    private fun setEventUpdates() {
        title?.let { intent.putExtra(CalendarContract.Events.TITLE, it) }
        input.location?.let { intent.putExtra(CalendarContract.Events.EVENT_LOCATION, it) }
        input.startDate?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, it) }
        input.endDate?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, it) }
        input.isAllDay?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_ALL_DAY, it) }
        input.description?.let { intent.putExtra(CalendarContract.Events.DESCRIPTION, it) }
        input.availability?.let { intent.putExtra(CalendarContract.Events.AVAILABILITY, it) }
        input.invitees?.let { intent.putExtra(Intent.EXTRA_EMAIL, it) }
        input.recurrence?.let {
            intent.putExtra(CalendarContract.Events.RRULE, it.toRRule())
        }
    }
}
