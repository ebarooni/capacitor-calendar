package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSObject
import dev.barooni.capacitor.calendar.models.data.CalendarEvent
import dev.barooni.capacitor.calendar.models.templates.JSResult

data class GetEventByIdResult(
    private val event: CalendarEvent?,
) : JSResult {
    override fun toJSON(): JSObject {
        val result = JSObject()
        result.put("result", event?.toJSObject() ?: JSObject.NULL)
        return result
    }
}
