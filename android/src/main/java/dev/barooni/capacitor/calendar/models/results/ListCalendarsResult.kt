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
            calendar.title?.let { obj.put("title", it) }
            calendar.internalName?.let { obj.put("internalTitle", it) }
            calendar.color?.let { obj.put("color", it) }
            obj.put("isImmutable", null)
            obj.put("allowsContentModifications", null)
            obj.put("type", null)
            obj.put("isSubscribed", null)
            obj.put("source", null)
            calendar.visible?.let { obj.put("visible", it) }
            calendar.accountName?.let { obj.put("accountName", it) }
            calendar.ownerAccount?.let { obj.put("ownerAccount", it) }
            calendar.maxReminders?.let { obj.put("maxReminders", it) }
            calendar.location?.let { obj.put("location", it) }
            array.put(obj)
        }
        return array
    }
}
