package dev.barooni.capacitor.calendar.models.inputs

import android.provider.CalendarContract
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.utils.ImplementationHelper

data class CreateCalendarInput(
    private val call: PluginCall,
) {
    val title = call.getString("title") ?: throw PluginError.TitleMissing
    val color =
        ImplementationHelper.hexToColorInt(call.getString("color"))
            ?: ImplementationHelper.DEFAULT_CALENDAR_COLOR
    val accountName = call.getString("accountName") ?: throw PluginError.AccountNameMissing
    val ownerAccount = call.getString("ownerAccount") ?: throw PluginError.OwnerAccountMissing
    val accountType = CalendarContract.ACCOUNT_TYPE_LOCAL
    val accessLevel = CalendarContract.Calendars.CAL_ACCESS_OWNER
    val allowedReminders = CalendarContract.Reminders.METHOD_ALERT
}
