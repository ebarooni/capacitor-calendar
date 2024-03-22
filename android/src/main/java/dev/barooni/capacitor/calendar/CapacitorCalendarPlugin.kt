package dev.barooni.capacitor.calendar

import android.Manifest
import android.content.Intent
import android.provider.CalendarContract
import androidx.activity.result.ActivityResult
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.ActivityCallback
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.Permission
import com.getcapacitor.annotation.PermissionCallback

@CapacitorPlugin(
    name = "CapacitorCalendar",
    permissions = [
        Permission(
            alias = "readCalendar",
            strings = [
                Manifest.permission.READ_CALENDAR,
            ],
        ),
        Permission(
            alias = "writeCalendar",
            strings = [
                Manifest.permission.WRITE_CALENDAR,
            ],
        ),
    ],
)
class CapacitorCalendarPlugin : Plugin() {
    private var implementation = CapacitorCalendar()

    @PluginMethod
    fun createEventWithPrompt(call: PluginCall) {
        try {
            implementation.eventsCount = implementation.getTotalEventsCount(context)
            return startActivityForResult(
                call,
                Intent(Intent.ACTION_INSERT).setData(CalendarContract.Events.CONTENT_URI),
                "openCalendarIntentActivityCallback",
            )
        } catch (error: Exception) {
            call.reject("", "[CapacitorCalendar.${::openCalendarIntentActivityCallback.name}] Could not create the event")
            return
        }
    }

    @ActivityCallback
    private fun openCalendarIntentActivityCallback(
        call: PluginCall?,
        result: ActivityResult,
    ) {
        if (call == null) {
            throw Exception("[CapacitorCalendar.${::createEventWithPrompt.name}] Call is not defined")
        }
        val currentEventsCount: Int = implementation.getTotalEventsCount(context)
        val createEventResult =
            if (currentEventsCount > implementation.eventsCount) {
                true
            } else if (implementation.eventsCount == currentEventsCount) {
                false
            } else {
                call.reject("", "[CapacitorCalendar.${::openCalendarIntentActivityCallback.name}] Could not create the event")
                return
            }
        val ret = JSObject()
        ret.put("eventCreated", createEventResult)
        call.resolve(ret)
    }

    @PluginMethod
    fun checkPermission(call: PluginCall) {
        try {
            val permissionName =
                call.getString("alias")
                    ?: throw Exception("[CapacitorCalendar.${::checkPermission.name}] Permission name is not defined")
            val permissionState =
                getPermissionState(permissionName)
                    ?: throw Exception(
                        "[CapacitorCalendar.${::checkPermission.name}] Could not determine the status of the requested permission",
                    )
            val ret = JSObject()
            ret.put("result", permissionState)
            call.resolve(ret)
        } catch (error: Exception) {
            call.reject("", error.message)
            return
        }
    }

    @PluginMethod
    fun checkAllPermissions(call: PluginCall) {
        try {
            return checkPermissions(call)
        } catch (_: Exception) {
            call.reject("", "[CapacitorCalendar.${::checkAllPermissions.name}] Could not determine the status of the requested permissions")
            return
        }
    }

    @PluginMethod
    fun requestPermission(call: PluginCall) {
        try {
            val alias =
                call.getString("alias")
                    ?: throw Exception("[CapacitorCalendar.${::requestPermission.name}] Permission name is not defined")
            return requestPermissionForAlias(
                alias,
                call,
                "requestPermissionCallback",
            )
        } catch (error: Exception) {
            call.reject("", error.message)
            return
        }
    }

    @PermissionCallback
    private fun requestPermissionCallback(call: PluginCall) {
        val permissionName = call.getString("alias")
        try {
            val ret = JSObject()
            ret.put("result", getPermissionState(permissionName))
            call.resolve(ret)
        } catch (_: Exception) {
            throw Exception("${::requestPermissionCallback.name} Could not authorize $permissionName")
        }
    }

    @PluginMethod
    fun requestAllPermissions(call: PluginCall) {
        try {
            return requestPermissions(call)
        } catch (_: Exception) {
            call.reject("", "[CapacitorCalendar.requestAllPermissions] Could not request permissions")
            return
        }
    }

    @PluginMethod
    fun selectCalendarsWithPrompt(call: PluginCall) {
        call.unimplemented("[CapacitorCalendar.${::selectCalendarsWithPrompt.name}] Not implemented on Android")
        return
    }

    @PluginMethod
    fun listCalendars(call: PluginCall) {
        try {
            val calendars = implementation.listCalendars(context)
            val ret = JSObject()
            ret.put("result", calendars)
            call.resolve(ret)
        } catch (_: Exception) {
            call.reject("", "[CapacitorCalendar.${::listCalendars.name}] Failed to get the list of calendars")
        }
    }

    @PluginMethod
    fun getDefaultCalendar(call: PluginCall) {
        try {
            val primaryCalendar = implementation.getDefaultCalendar(context)
            val ret = JSObject()
            ret.put("result", primaryCalendar)
            call.resolve(ret)
        } catch (_: Exception) {
            call.reject("", "[CapacitorCalendar.${::getDefaultCalendar.name}] No default calendar found")
        }
    }

    @PluginMethod
    fun createEvent(call: PluginCall) {
        try {
            val title =
                call.getString("title")
                    ?: throw Exception("[CapacitorCalendar.${::createEvent.name}] A title for the event was not provided")
            val calendarId = call.getString("calendarId")
            val location = call.getString("location")
            val startDate = call.getString("startDate")
            val endDate = call.getString("endDate")
            val isAllDay = call.getBoolean("isAllDay", false)

            val eventUri = implementation.createEvent(context, title, calendarId, location, startDate, endDate, isAllDay)
            val ret = JSObject()
            ret.put("eventCreated", eventUri != null)
            call.resolve(ret)
        } catch (error: Exception) {
            call.reject("", "[CapacitorCalendar.${::createEvent.name}] Unable to create event")
            return
        }
    }

    @PluginMethod
    fun getDefaultRemindersList(call: PluginCall) {
        call.unimplemented("[CapacitorCalendar.${::getDefaultRemindersList.name}] Not implemented on Android")
        return
    }

    @PluginMethod
    fun getRemindersLists(call: PluginCall) {
        call.unimplemented("[CapacitorCalendar.${::getRemindersLists.name}] Not implemented on Android")
        return
    }

    @PluginMethod
    fun createReminder(call: PluginCall) {
        call.unimplemented("[CapacitorCalendar.${::createReminder.name}] Not implemented on Android")
        return
    }
}
