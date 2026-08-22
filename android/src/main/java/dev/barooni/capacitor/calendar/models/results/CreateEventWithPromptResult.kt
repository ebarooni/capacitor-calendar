package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSObject
import dev.barooni.capacitor.calendar.models.templates.JSResult

class CreateEventWithPromptResult(
    private val id: Long? = null,
) : JSResult {
    override fun toJSON(): JSObject {
        val result = JSObject()
        result.put("id", id?.toString())
        return result
    }
}
