package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSObject
import dev.barooni.capacitor.calendar.models.templates.JSResult

class CreateEventWithPromptResult : JSResult {
    override fun toJSON(): JSObject {
        val result = JSObject()
        result.put("result", null)
        return result
    }
}
