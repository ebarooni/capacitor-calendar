package dev.barooni.capacitor.calendar.model

import com.getcapacitor.JSObject
import java.time.Instant
import java.time.ZoneId
import java.time.format.DateTimeFormatter

data class RecurrenceRule(
    val frequency: RecurrenceFrequency,
    val interval: Int,
    val end: Long?,
) {

    init {
        require(interval > 0)
    }

    constructor(rule: JSObject) : this(
        rule.getString("frequency")?.let {
            when (it.toInt()) {
                0 -> RecurrenceFrequency.DAILY
                1 -> RecurrenceFrequency.WEEKLY
                2 -> RecurrenceFrequency.MONTHLY
                3 -> RecurrenceFrequency.YEARLY
                else -> throw IllegalArgumentException("frequency is not a valid ${RecurrenceRule::class.qualifiedName}")
            }
        }
            ?: throw IllegalArgumentException("'frequency' is either not defined or not a valid integer"),
        rule.getInteger("interval")
            ?: throw IllegalArgumentException("'interval' is either not defined or not a valid integer"),
        rule.getString("end")?.toLong(),
    )

    /**
     * @return a RFC 5545 compliant recurrence rule
     */
    override fun toString(): String {
        val stringBuilder = StringBuilder()

        stringBuilder.append("FREQ=${frequency};")
        stringBuilder.append("INTERVAL=${interval};")

        if (end != null) {
            val instant = Instant.ofEpochMilli(end).atZone(ZoneId.of("UTC"))
            stringBuilder.append(
                "UNTIL=${
                    DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss'Z'").format(instant)
                };"
            )
        }

        return stringBuilder.removeSuffix(";").toString()
    }

}