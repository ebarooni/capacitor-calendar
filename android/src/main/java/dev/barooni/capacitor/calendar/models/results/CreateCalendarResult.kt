package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSObject
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.templates.JSResult

data class CreateCalendarResult(
    private val id: String?,
) : JSResult {
    init {
        if (id == null) {
            throw PluginError.FailedToRetrieveCalendarId
        }
    }

    override fun toJSON(): JSObject {
        val result = JSObject()
        result.put("id", id)
        return result
    }
}
