package dev.barooni.capacitor.calendar.models.data

import com.getcapacitor.JSObject
import org.json.JSONArray
import org.json.JSONException
import java.util.Calendar
import java.util.Locale
import java.util.TimeZone

data class EventRecurrenceRule(
    val byMonth: List<Int>? = null,
    val byMonthDay: List<Int>? = null,
    val byWeekDay: List<Int>? = null,
    val count: Int?,
    val end: Long?,
    val frequency: Frequency,
    val interval: Int = 1,
    val weeksOfTheYear: List<Int>? = null,
    val daysOfTheYear: List<Int>? = null,
) {
    enum class Frequency { Daily, Weekly, Monthly, Yearly }

    fun toRRule(): String {
        val parts = mutableListOf<String>()
        parts.add("FREQ=${frequency.name.uppercase()}")
        parts.add("INTERVAL=${interval.coerceAtLeast(1)}")

        if (count != null) {
            parts.add("COUNT=$count")
        } else if (end != null) {
            parts.add("UNTIL=${formatUntilUtc(end)}")
        }

        byWeekDay?.let { days ->
            val mapped = days.mapNotNull { mapWeekday(it) }.distinct()
            if (mapped.isNotEmpty()) parts.add("BYDAY=${mapped.joinToString(",")}")
        }

        byMonthDay?.let { if (it.isNotEmpty()) parts.add("BYMONTHDAY=${it.joinToString(",")}") }
        byMonth?.let { if (it.isNotEmpty()) parts.add("BYMONTH=${it.joinToString(",")}") }
        weeksOfTheYear?.let { if (it.isNotEmpty()) parts.add("BYWEEKNO=${it.joinToString(",")}") }
        daysOfTheYear?.let { if (it.isNotEmpty()) parts.add("BYYEARDAY=${it.joinToString(",")}") }

        return parts.joinToString(";")
    }

    companion object {
        fun parseRecurrence(obj: JSObject): EventRecurrenceRule? {
            val frequencyString = obj.getString("frequency") ?: return null
            val frequency =
                try {
                    Frequency.valueOf(
                        frequencyString
                            .trim()
                            .replaceFirstChar { it.uppercase() },
                    )
                } catch (_: IllegalArgumentException) {
                    return null
                }

            val interval = (obj.getInteger("interval") ?: 1).coerceAtLeast(1)
            val count = obj.getInteger("count")
            var until: Long?
            try {
                until = if (count != null) null else obj.getDouble("end").toLong()
            } catch (_: JSONException) {
                until = null
            }

            return EventRecurrenceRule(
                frequency = frequency,
                interval = interval,
                count = count,
                end = until,
                byWeekDay = readIntList(obj, "byWeekDay"),
                byMonthDay = readIntList(obj, "byMonthDay"),
                byMonth = readIntList(obj, "byMonth"),
                weeksOfTheYear = readIntList(obj, "weeksOfTheYear"),
                daysOfTheYear = readIntList(obj, "daysOfTheYear"),
            )
        }

        private fun formatUntilUtc(untilMs: Long): String {
            val calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"))
            calendar.timeInMillis = untilMs

            val year = calendar.get(Calendar.YEAR)
            val month = calendar.get(Calendar.MONTH) + 1
            val day = calendar.get(Calendar.DAY_OF_MONTH)
            val hour = calendar.get(Calendar.HOUR_OF_DAY)
            val minute = calendar.get(Calendar.MINUTE)
            val second = calendar.get(Calendar.SECOND)

            return String.format(
                Locale.US,
                "%04d%02d%02dT%02d%02d%02dZ",
                year,
                month,
                day,
                hour,
                minute,
                second,
            )
        }

        private fun mapWeekday(day: Int): String? =
            when (day) {
                1 -> "MO"
                2 -> "TU"
                3 -> "WE"
                4 -> "TH"
                5 -> "FR"
                6 -> "SA"
                7 -> "SU"
                else -> null
            }

        private fun readIntList(
            obj: JSObject,
            key: String,
        ): List<Int>? {
            var arr: JSONArray
            try {
                arr = obj.getJSONArray(key) ?: return null
            } catch (_: JSONException) {
                return null
            }
            val list = mutableListOf<Int>()
            for (i in 0 until arr.length()) {
                list.add(arr.getInt(i))
            }
            return list
        }
    }
}
