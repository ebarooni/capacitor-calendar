package dev.barooni.capacitor.calendar.utils

import com.getcapacitor.JSArray
import dev.barooni.capacitor.calendar.PluginError
import java.util.Calendar

class ImplementationHelper {
    companion object {
        fun getCalendarFromTimestamp(timestamp: Long?): Calendar =
            Calendar.getInstance().apply {
                timeInMillis = timestamp ?: System.currentTimeMillis()
            }

        fun jsArrayToComaSeparatedString(array: JSArray?): String? {
            val list = array?.toList<Any>() ?: return null

            if (!list.all { it is String }) {
                throw PluginError.InvalidInvitees
            }

            return list.joinToString(", ")
        }

        fun jsArrayToIntArray(array: JSArray?): List<Int>? {
            val list = array?.toList<Int>() ?: return null
            return list
        }

        fun hexToColorInt(hex: String?): Int? {
            return if (hex == null) {
                null
            } else {
                android.graphics.Color.parseColor(hex)
            }
        }
    }
}
