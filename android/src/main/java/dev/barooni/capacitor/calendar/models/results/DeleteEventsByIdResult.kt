package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import dev.barooni.capacitor.calendar.models.templates.JSResult

class DeleteEventsByIdResult : JSResult {
    private val deletedArray = JSArray()
    private val failedArray = JSArray()

    override fun toJSON(): JSObject {
        val result = JSObject()
        val obj = JSObject()
        obj.put("deleted", deletedArray)
        obj.put("failed", failedArray)
        result.put("result", obj)
        return result
    }

    fun deleted(id: Long) {
        deletedArray.put(id.toString())
    }

    fun failed(id: Long) {
        failedArray.put(id.toString())
    }
}
