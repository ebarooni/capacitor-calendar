package dev.barooni.capacitor.calendar

import android.content.ContentResolver
import android.content.Context
import android.provider.CalendarContract

class CapacitorCalendar() {
    var eventsCount: Int = 0

    fun getTotalEventsCount(context: Context): Int {
        val contentResolver: ContentResolver = context.contentResolver
        val uri = CalendarContract.Events.CONTENT_URI
        val projection = arrayOf(CalendarContract.Events._ID)
        val cursor = contentResolver.query(uri, projection, null, null, null)
        val count = cursor?.count ?: 0
        cursor?.close()
        return count
    }
}