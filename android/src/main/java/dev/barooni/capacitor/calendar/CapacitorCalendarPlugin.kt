package dev.barooni.capacitor.calendar

import android.Manifest
import android.content.ContentResolver
import android.content.Context
import android.content.Intent
import android.provider.CalendarContract
import androidx.activity.result.ActivityResult
import com.getcapacitor.JSObject
import com.getcapacitor.PermissionState
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
                        Manifest.permission.READ_CALENDAR
                    ]
            )
        ]
)
class CapacitorCalendarPlugin : Plugin() {
    private enum class CalendarEventActionResult(val value: String) {
        SAVED("saved"),
        CANCELED("canceled"),
        ERROR("error")
    }

    private var totalNumberOfEvents: Int = 0

    @PluginMethod
    fun createEventWithPrompt(call: PluginCall) {
        try {
            if (getPermissionState("readCalendar") != PermissionState.GRANTED) {
                throw Exception("[CapacitorCalendar.${Thread.currentThread().stackTrace[1].methodName}] Missing readCalendar permission")
            } else {
                totalNumberOfEvents = getTotalNumberOfEvents(context)
                openCalendarIntent(call)
            }
        } catch (error: Exception) {
            call.reject(error.message)
            return
        }
    }

    @PluginMethod
    fun checkPermission(call: PluginCall) {
        try {
            val permissionName = call.getString("alias")
                    ?: throw Exception("[CapacitorCalendar.${Thread.currentThread().stackTrace[1].methodName}] Permission name is not defined")
            val state = getPermissionState(permissionName)
                    ?: throw Exception("[CapacitorCalendar.${Thread.currentThread().stackTrace[1].methodName}] Could not determine the status of the requested permission")
            val ret = JSObject()
            ret.put("result", state)
            call.resolve(ret)
        } catch (error: Exception) {
            call.reject(error.message)
            return
        }
    }

    @PluginMethod
    fun checkAllPermissions(call: PluginCall) {
        try {
            checkPermissions(call)
        } catch (_: Exception) {
            call.reject("[CapacitorCalendar.${Thread.currentThread().stackTrace[1].methodName}] Could not determine the status of the requested permissions")
            return
        }
    }

    @PluginMethod
    fun requestPermission(call: PluginCall) {
        try {
            val permissionName = call.getString("alias")
                    ?: throw Exception("[CapacitorCalendar.${Thread.currentThread().stackTrace[1].methodName}] Permission name is not defined")
            requestPermissionForAlias(
                    permissionName,
                    call,
                    "permissionsCallback"
            )
        } catch (error: Exception) {
            call.reject(error.message)
            return
        }
    }

    @PluginMethod
    fun requestAllPermissions(call: PluginCall) {
        try {
            requestPermissions(call)
        } catch (_: Exception) {
            call.reject("[CapacitorCalendar.${Thread.currentThread().stackTrace[1].methodName}] Could not request permissions")
            return
        }
    }

    @PluginMethod
    fun selectCalendarsWithPrompt(call: PluginCall) {
        call.unimplemented("[CapacitorCalendar.${Thread.currentThread().stackTrace[1].methodName}] Not implemented on Android")
        return
    }

    private fun openCalendarIntent(call: PluginCall) {
        val intent = Intent(Intent.ACTION_INSERT).setData(CalendarContract.Events.CONTENT_URI)
        startActivityForResult(call, intent, "openCalendarIntentActivityCallback")
    }

    private fun getTotalNumberOfEvents(context: Context): Int {
        val contentResolver: ContentResolver = context.contentResolver
        val uri = CalendarContract.Events.CONTENT_URI
        val projection = arrayOf(CalendarContract.Events._ID)
        val cursor = contentResolver.query(uri, projection, null, null, null)
        return if (cursor == null) {
            0
        } else {
            try {
                cursor.count
            } catch (_: Exception) {
                throw Exception("[CapacitorCalendar.${Thread.currentThread().stackTrace[1].methodName}] Failed to get the total events count")
            } finally {
                cursor.close()
            }
        }
    }

    @ActivityCallback
    private fun openCalendarIntentActivityCallback(call: PluginCall?, result: ActivityResult) {
        if (call == null) {
            throw Exception("[CapacitorCalendar.${Thread.currentThread().stackTrace[1].methodName}] Call is not defined")
        }
        val ret = JSObject()
        val currentEventsCount: Int = getTotalNumberOfEvents(context)
        val action: String = if (currentEventsCount > totalNumberOfEvents) {
            CalendarEventActionResult.SAVED.value
        } else if (totalNumberOfEvents == currentEventsCount) {
            CalendarEventActionResult.CANCELED.value
        } else {
            CalendarEventActionResult.ERROR.value
        }
        ret.put("result", action)
        call.resolve(ret)
    }

    @PermissionCallback
    private fun permissionsCallback(call: PluginCall) {
        val permissionName = call.getString("alias")
        try {
            val ret = JSObject()
            ret.put("result", getPermissionState(permissionName))
            call.resolve(ret)
        } catch (_: Exception) {
            throw Exception("${Thread.currentThread().stackTrace[1].methodName} Could not authorize $permissionName")
        }
    }
}
