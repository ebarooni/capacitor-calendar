package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import dev.barooni.capacitor.calendar.models.data.CalendarEvent
import dev.barooni.capacitor.calendar.models.templates.JSResult

data class ListEventsInRangeResult(
    private val events: List<CalendarEvent>,
) : JSResult {
    override fun toJSON(): JSObject {
        val result = JSObject()
        val array = JSArray()
        events.forEach { event ->
            val obj = JSObject()
            obj.put("id", event.id)
            obj.put("title", event.title)
            obj.put("calendarId", event.calendarId)
            obj.put("location", event.location)
            obj.put("startDate", event.startDate)
            obj.put("endDate", event.endDate)
            obj.put("isAllDay", event.isAllDay)
            event.alerts.let { alerts ->
                val alertsJSArray = JSArray()
                alerts.forEach { alert -> alertsJSArray.put(alert) }
                obj.put("alerts", alertsJSArray)
            }
            obj.put("url", event.url)
            obj.put("description", event.description)
            obj.put("availability", event.availability)
            obj.put("organizer", event.organizer)
            obj.put("color", event.color)
            obj.put("duration", event.duration)
            obj.put("isDetached", event.isDetached)
            obj.put("birthdayContactIdentifier", event.birthdayContactIdentifier)
            obj.put("status", event.status)
            obj.put("creationDate", event.creationDate)
            obj.put("lastModifiedDate", event.lastModifiedDate)
            event.attendees.let { attendees ->
                val attendeesJSArray = JSArray()
                attendees.forEach { attendee ->
                    val attendeeObj = JSObject()
                    attendeeObj.put("email", attendee.email)
                    attendeeObj.put("name", attendee.name)
                    attendeeObj.put("role", attendee.relationship)
                    attendeeObj.put("status", attendee.status)
                    attendeeObj.put("type", attendee.type)
                    attendeesJSArray.put(attendeeObj)
                }
                obj.put("attendees", attendeesJSArray)
            }
            obj.put("timezone", event.timezone)
            array.put(obj)
        }
        result.put("result", array)
        return result
    }
}
