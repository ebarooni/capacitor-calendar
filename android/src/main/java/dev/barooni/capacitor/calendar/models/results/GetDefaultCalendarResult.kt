package dev.barooni.capacitor.calendar.models.results

import com.getcapacitor.JSObject
import dev.barooni.capacitor.calendar.models.data.CalendarInfo
import dev.barooni.capacitor.calendar.models.templates.JSResult

data class GetDefaultCalendarResult(
    private val calendar: CalendarInfo?,
) : JSResult {
    override fun toJSON(): JSObject =
        JSObject().apply {
            put(
                "result",
                calendar?.let { cal ->
                    JSObject().apply {
                        put("id", cal.id)
                        put("title", cal.title)
                        put("internalTitle", cal.internalName)
                        put("color", cal.color)
                        put("isImmutable", null)
                        put("allowsContentModifications", null)
                        put("type", null)
                        put("isSubscribed", null)
                        put("source", null)
                        put("visible", cal.visible)
                        put("accountName", cal.accountName)
                        put("ownerAccount", cal.ownerAccount)
                        put("maxReminders", cal.maxReminders)
                        put("location", cal.location)
                    }
                },
            )
        }
}
