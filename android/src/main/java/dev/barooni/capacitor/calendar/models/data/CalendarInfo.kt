package dev.barooni.capacitor.calendar.models.data

data class CalendarInfo(
    val id: String,
    val title: String?,
    val internalName: String?,
    val color: String?,
    val visible: Boolean?,
    val accountName: String?,
    val ownerAccount: String?,
    val maxReminders: Int?,
    val location: String?,
    val isPrimary: Boolean?,
)
