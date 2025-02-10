package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSObject
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.templates.JSResult

data class CreateEventResult(
    val id: Long?,
) : JSResult {
    init {
        if (id == null) {
            throw PluginError.FailedToRetrieveEventId
        }
    }

    override fun toJSON(): JSObject {
        val result = JSObject()
        result.put("id", id.toString())
        return result
    }
}
