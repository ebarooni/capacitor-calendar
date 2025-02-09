package dev.barooni.capacitor.calendar.models.inputs

import android.content.ContentUris
import android.content.Intent
import android.net.Uri
import android.provider.CalendarContract
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError

data class ModifyEventWithPromptInput(val call: PluginCall, val callbackName: String) {
    val id: Long
    val title: String? = call.getString("title")
    val location: String?
    val startDate: Long?
    val endDate: Long?
    val isAllDay: Boolean? = call.getBoolean("isAllDay")
    val description: String?
    val availability: Int?
    val invitees: String?
    val intent: Intent = Intent(Intent.ACTION_EDIT).setData(CalendarContract.Events.CONTENT_URI)

    init {
        val input = CreateEventWithPromptInput(call, callbackName)
        val idString = call.getString("id") ?: throw PluginError.IdMissing
        id = idString.toLong()
        location = input.location
        startDate = call.getLong("startDate")?.let {
            input.startDate
        } ?: run {
            null
        }
        endDate = call.getLong("endDate")?.let {
            input.endDate
        } ?: run {
            null
        }
        description = input.description
        availability = input.availability
        invitees = input.invitees
        val uri: Uri = ContentUris.withAppendedId(CalendarContract.Events.CONTENT_URI, id)
        intent.setData(uri)
        setEventUpdates()
    }

    private fun setEventUpdates() {
        title?.let { intent.putExtra(CalendarContract.Events.TITLE, it) }
        location?.let { intent.putExtra(CalendarContract.Events.EVENT_LOCATION, it) }
        startDate?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, it) }
        endDate?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, it) }
        isAllDay?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_ALL_DAY, it) }
        description?.let { intent.putExtra(CalendarContract.Events.DESCRIPTION, it) }
        availability?.let { intent.putExtra(CalendarContract.Events.AVAILABILITY, it) }
        invitees?.let { intent.putExtra(Intent.EXTRA_EMAIL, it) }
    }
}
