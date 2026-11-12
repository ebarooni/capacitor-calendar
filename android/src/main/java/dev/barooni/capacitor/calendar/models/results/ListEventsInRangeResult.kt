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
            array.put(event.toJSObject())
        }
        result.put("result", array)
        return result
    }
}

internal fun CalendarEvent.toJSObject(): JSObject {
    val obj = JSObject()
    obj.put("id", id)
    obj.put("masterId", masterId)
    obj.put("title", title)
    obj.put("calendarId", calendarId)
    obj.put("calendarItemExternalIdentifier", calendarItemExternalIdentifier)
    obj.put("location", location)
    obj.put("startDate", startDate)
    obj.put("seriesStartDate", seriesStartDate)
    obj.put("endDate", endDate)
    obj.put("isAllDay", isAllDay)
    alerts.let { alerts ->
        val alertsJSArray = JSArray()
        alerts.forEach { alert -> alertsJSArray.put(alert) }
        obj.put("alerts", alertsJSArray)
    }
    obj.put("url", url)
    obj.put("description", description)
    obj.put("availability", availability)
    obj.put("organizer", organizer)
    obj.put("color", color)
    obj.put("duration", duration)
    obj.put("isDetached", isDetached)
    obj.put("isPartOfSeries", isPartOfSeries)
    obj.put("birthdayContactIdentifier", birthdayContactIdentifier)
    obj.put("status", status)
    obj.put("creationDate", creationDate)
    obj.put("lastModifiedDate", lastModifiedDate)
    attendees.let { attendees ->
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
    obj.put("timezone", timezone)
    return obj
}
