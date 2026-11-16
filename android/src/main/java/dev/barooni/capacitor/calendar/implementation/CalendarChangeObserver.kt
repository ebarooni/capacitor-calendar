package dev.barooni.capacitor.calendar.implementation

import android.content.ContentResolver
import android.database.ContentObserver
import android.os.Handler
import android.os.Looper
import android.provider.CalendarContract
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import dev.barooni.capacitor.calendar.models.data.CalendarEvent
import dev.barooni.capacitor.calendar.models.results.toJSObject
import dev.barooni.capacitor.calendar.utils.ImplementationHelper
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledExecutorService
import java.util.concurrent.ScheduledFuture
import java.util.concurrent.TimeUnit

/**
 * Watches the calendar provider. After each change it waits for the changes to settle,
 * reads the watched window again and compares it with the last snapshot.
 * Android does not say what changed, so the comparison finds it.
 */
class CalendarChangeObserver(
    private val contentResolver: ContentResolver,
    private val queryEvents: (from: Long, to: Long, calendarIds: List<Long>?) -> List<CalendarEvent>,
    private val hasListeners: () -> Boolean,
    private val emit: (JSObject) -> Unit,
) {
    private data class Entry(
        val id: String,
        val fingerprint: Int,
    )

    private var executor: ScheduledExecutorService? = null
    private var pending: ScheduledFuture<*>? = null
    private var contentObserver: ContentObserver? = null
    private var from = 0L
    private var to = 0L
    private var calendarIds: List<Long>? = null
    private var includeEvents = true
    private var eventSnapshot: Map<String, Entry> = emptyMap()
    private var calendarSnapshot: Map<String, Int> = emptyMap()
    private var listenerSeen = false

    /**
     * Stops a running watch, reads the baseline and starts to observe.
     * Throws when the baseline cannot be read. Then nothing is observed.
     */
    @Synchronized
    fun start(
        from: Long,
        to: Long,
        calendarIds: List<Long>?,
        includeEvents: Boolean,
    ) {
        stop()
        this.from = from
        this.to = to
        this.calendarIds = calendarIds
        this.includeEvents = includeEvents
        eventSnapshot = toEntries(queryEvents(from, to, calendarIds))
        calendarSnapshot = readCalendars()
        executor = Executors.newSingleThreadScheduledExecutor()
        val observer =
            object : ContentObserver(Handler(Looper.getMainLooper())) {
                override fun onChange(selfChange: Boolean) {
                    scheduleCheck()
                }
            }
        contentResolver.registerContentObserver(CalendarContract.Events.CONTENT_URI, true, observer)
        contentResolver.registerContentObserver(CalendarContract.Calendars.CONTENT_URI, true, observer)
        contentObserver = observer
    }

    @Synchronized
    fun stop() {
        contentObserver?.let { contentResolver.unregisterContentObserver(it) }
        contentObserver = null
        pending?.cancel(false)
        pending = null
        executor?.shutdownNow()
        executor = null
        eventSnapshot = emptyMap()
        calendarSnapshot = emptyMap()
        listenerSeen = false
    }

    @Synchronized
    private fun scheduleCheck() {
        val currentExecutor = executor ?: return
        pending?.cancel(false)
        pending = currentExecutor.schedule({ check() }, DEBOUNCE_MS, TimeUnit.MILLISECONDS)
    }

    @Synchronized
    private fun check() {
        if (executor == null) {
            return
        }
        // After `removeAllListeners` nobody listens. Then the watch ends by itself.
        if (!hasListeners()) {
            if (listenerSeen) {
                stop()
            }
            return
        }
        listenerSeen = true
        try {
            val freshEvents = queryEvents(from, to, calendarIds)
            val freshEntries = toEntries(freshEvents)
            val freshCalendars = readCalendars()

            val created = freshEvents.filter { key(it) !in eventSnapshot }
            val updated =
                freshEvents.filter { event ->
                    eventSnapshot[key(event)]?.let { it.fingerprint != freshEntries[key(event)]?.fingerprint } == true
                }
            val freshIds = freshEntries.values.map { it.id }.toSet()
            val deletedIds =
                eventSnapshot
                    .filterKeys { it !in freshEntries }
                    .values
                    .map { it.id }
                    .filter { it !in freshIds }
                    .distinct()
            val calendarsChanged = freshCalendars != calendarSnapshot

            eventSnapshot = freshEntries
            calendarSnapshot = freshCalendars

            if (created.isEmpty() && updated.isEmpty() && deletedIds.isEmpty() && !calendarsChanged) {
                return
            }
            val payload = JSObject()
            if (includeEvents) {
                if (created.isNotEmpty()) {
                    payload.put("created", toJSArray(created))
                }
                if (updated.isNotEmpty()) {
                    payload.put("updated", toJSArray(updated))
                }
            }
            if (deletedIds.isNotEmpty()) {
                payload.put("deletedIds", JSArray(deletedIds))
            }
            if (calendarsChanged) {
                payload.put("calendarsChanged", true)
            }
            payload.put("precise", includeEvents || (created.isEmpty() && updated.isEmpty()))
            emit(payload)
        } catch (error: Exception) {
            // The snapshot stays as it is. The next check compares with it again.
            emit(JSObject().put("precise", false))
        }
    }

    private fun readCalendars(): Map<String, Int> =
        ImplementationHelper.listCalendars(contentResolver).associate { it.id to it.hashCode() }

    private fun toEntries(events: List<CalendarEvent>): Map<String, Entry> =
        events.associate { key(it) to Entry(it.id, it.hashCode()) }

    // One event id has one instance for each occurrence of a series.
    private fun key(event: CalendarEvent): String = "${event.id}|${event.startDate}"

    private fun toJSArray(events: List<CalendarEvent>): JSArray {
        val array = JSArray()
        events.forEach { array.put(it.toJSObject()) }
        return array
    }

    private companion object {
        const val DEBOUNCE_MS = 400L
    }
}
