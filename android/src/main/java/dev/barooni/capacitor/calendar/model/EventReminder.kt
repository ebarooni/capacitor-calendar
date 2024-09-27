package dev.barooni.capacitor.calendar.model

import android.util.Log
import com.getcapacitor.JSArray

data class EventReminder(
    val offset: Float
) {
    companion object {
        fun from(offset: Any?): List<EventReminder> {
            return when (offset) {
                is Float -> from(offset)
                is JSArray -> from(offset)
                else -> emptyList()
            }
        }

        private fun from(offset: Float): List<EventReminder> {
            return listOf(EventReminder(offset))
        }

        private fun from(jsArray: JSArray): List<EventReminder> {
            return jsArray.toList<Any>().mapNotNull {
                try {
                    val offset = it.toString().toFloat()
                    if (offset > -1) offset else null
                } catch (e: NumberFormatException) {
                    Log.e("Error", "Failed to convert alert to float: $it", e)
                    null
                }
            }.map {
                EventReminder(it)
            }
        }
    }
}