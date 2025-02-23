package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import dev.barooni.capacitor.calendar.models.data.CalendarInfo
import dev.barooni.capacitor.calendar.models.templates.JSResult

data class ListCalendarsResult(
    private val calendars: List<CalendarInfo>,
) : JSResult {
    override fun toJSON(): JSObject {
        val result = JSObject()
        result.put("result", calendarsToJSArray())
        return result
    }

    private fun calendarsToJSArray(): JSArray {
        val array = JSArray()
        calendars.forEach { calendar ->
            val obj = JSObject()
            obj.put("id", calendar.id)
            obj.put("title", calendar.title)
            obj.put("internalTitle", calendar.internalName)
            obj.put("color", calendar.color)
            obj.put("isImmutable", null)
            obj.put("allowsContentModifications", null)
            obj.put("type", null)
            obj.put("isSubscribed", null)
            obj.put("source", null)
            obj.put("visible", calendar.visible)
            obj.put("accountName", calendar.accountName)
            obj.put("ownerAccount", calendar.ownerAccount)
            obj.put("maxReminders", calendar.maxReminders)
            obj.put("location", calendar.location)
            array.put(obj)
        }
        return array
    }
}
