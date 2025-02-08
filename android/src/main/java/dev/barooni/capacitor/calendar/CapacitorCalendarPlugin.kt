package dev.barooni.capacitor.calendar

import android.Manifest
import android.content.ContentUris
import android.content.Intent
import android.net.Uri
import android.provider.CalendarContract
import androidx.activity.result.ActivityResult
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.ActivityCallback
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.Permission
import com.getcapacitor.annotation.PermissionCallback
import dev.barooni.capacitor.calendar.implementation.CapacitorCalendarNew
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope
import dev.barooni.capacitor.calendar.models.inputs.CheckPermissionInput
import dev.barooni.capacitor.calendar.models.inputs.CreateEventWithPromptInput
import dev.barooni.capacitor.calendar.models.inputs.RequestAllPermissionsInput
import dev.barooni.capacitor.calendar.models.inputs.RequestPermissionInput
import dev.barooni.capacitor.calendar.models.results.CreateEventWithPromptResult
import dev.barooni.capacitor.calendar.models.results.RequestAllPermissionsResult
import dev.barooni.capacitor.calendar.models.results.RequestPermissionResult

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
        Permission(
            alias = "readWriteCalendar",
            strings = [
                Manifest.permission.WRITE_CALENDAR,
                Manifest.permission.READ_CALENDAR,
            ],
        ),
    ],
)
class CapacitorCalendarPlugin : Plugin() {
    private var implementation = CapacitorCalendar()
    private val implementationNew: CapacitorCalendarNew by lazy { CapacitorCalendarNew(this) }
    private var eventIdOptional = false

    @PluginMethod
    fun checkPermission(call: PluginCall) {
        try {
            val input = CheckPermissionInput(call)
            val result = implementationNew.checkPermission(input)
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun checkAllPermissions(call: PluginCall) {
        try {
            val result = implementationNew.checkAllPermissions()
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun requestPermission(call: PluginCall) {
        try {
            val input = RequestPermissionInput.FromCall(call, ::requestPermissionCallback.name)
            implementationNew.requestPermission(input, ::requestPermissionForAlias)
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PermissionCallback
    private fun requestPermissionCallback(call: PluginCall) {
        try {
            val result = RequestPermissionResult.FromCall(call, ::getPermissionState)
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun requestAllPermissions(call: PluginCall) {
        try {
            val input = RequestAllPermissionsInput(call, ::requestAllPermissionsCallback.name)
            implementationNew.requestAllPermissions(input, ::requestPermissionForAlias)
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PermissionCallback
    fun requestAllPermissionsCallback(call: PluginCall) {
        try {
            val result = RequestAllPermissionsResult(::getPermissionState)
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun requestWriteOnlyCalendarAccess(call: PluginCall) {
        try {
            val input =
                RequestPermissionInput.FromScope(
                    call,
                    CalendarPermissionScope.WRITE_CALENDAR,
                    ::requestWriteOnlyCalendarAccessCallback.name,
                )
            implementationNew.requestPermission(input, ::requestPermissionForAlias)
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PermissionCallback
    fun requestWriteOnlyCalendarAccessCallback(call: PluginCall) {
        try {
            val result = RequestPermissionResult.FromScope(CalendarPermissionScope.WRITE_CALENDAR, ::getPermissionState)
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun requestReadOnlyCalendarAccess(call: PluginCall) {
        try {
            val input =
                RequestPermissionInput.FromScope(
                    call,
                    CalendarPermissionScope.READ_CALENDAR,
                    ::requestReadOnlyCalendarAccessCallback.name,
                )
            implementationNew.requestPermission(input, ::requestPermissionForAlias)
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PermissionCallback
    fun requestReadOnlyCalendarAccessCallback(call: PluginCall) {
        try {
            val result = RequestPermissionResult.FromScope(CalendarPermissionScope.READ_CALENDAR, ::getPermissionState)
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun requestFullCalendarAccess(call: PluginCall) {
        try {
            val input = RequestAllPermissionsInput(call, ::requestFullCalendarAccessCallback.name)
            implementationNew.requestAllPermissions(input, ::requestPermissionForAlias)
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PermissionCallback
    fun requestFullCalendarAccessCallback(call: PluginCall) {
        try {
            val result = RequestPermissionResult.FullCalendarAccess(::getPermissionState)
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun requestFullRemindersAccess(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::requestFullRemindersAccess.name).message)
    }

    @PluginMethod
    fun createEventWithPrompt(call: PluginCall) {
        try {
            val input = CreateEventWithPromptInput(call, "createEventWithPromptCallback")
            implementationNew.createEventWithPrompt(input, ::startActivityForResult)
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @ActivityCallback
    private fun createEventWithPromptCallback(
        call: PluginCall?,
        result: ActivityResult,
    ) {
        if (call == null) {
            return
        }
        call.resolve(CreateEventWithPromptResult().toJSON())
    }

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
    fun modifyEventWithPrompt(call: PluginCall) {
        try {
            val stringId =
                call.getString("id") ?: throw Exception("[CapacitorCalendar.${::modifyEventWithPrompt.name}] Event ID not defined")
            val update = call.getObject("update")
            val uri: Uri = ContentUris.withAppendedId(CalendarContract.Events.CONTENT_URI, stringId.toLong())
            val intent =
                Intent(Intent.ACTION_EDIT)
                    .setData(uri)

            if (update != null) {
                val title = update.getString("title")
                val calendarId = update.getString("calendarId")
                val location = update.getString("location")
                val startDate = update.getLong("startDate")
                val endDate = update.getLong("endDate")
                val isAllDay = update.getBoolean("isAllDay")
                val url = update.getString("url")
                val notes = update.getString("notes")

                intent.putExtra(CalendarContract.Events.TITLE, title)
                calendarId?.let { intent.putExtra(CalendarContract.Events.CALENDAR_ID, it) }
                location?.let { intent.putExtra(CalendarContract.Events.EVENT_LOCATION, it) }
                startDate?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, it) }
                endDate?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, it) }
                isAllDay?.let { intent.putExtra(CalendarContract.EXTRA_EVENT_ALL_DAY, it) }
                intent.putExtra(CalendarContract.Events.DESCRIPTION, listOfNotNull(notes, url?.let { "URL: $it" }).joinToString("\n"))
            }

            return startActivityForResult(
                call,
                intent,
                "openEventEditIntentActivityCallback",
            )
        } catch (error: Exception) {
            call.reject("", error.message)
            return
        }
    }

    @ActivityCallback
    private fun openEventEditIntentActivityCallback(
        call: PluginCall?,
        result: ActivityResult,
    ) {
        if (call == null) {
            throw Exception("[CapacitorCalendar.${::createEventWithPrompt.name}] Call is not defined")
        }
        val ret = JSObject()
        ret.put("result", JSArray())
        call.resolve(ret)
    }

    @PluginMethod(returnType = PluginMethod.RETURN_NONE)
    fun modifyEvent(call: PluginCall) {
        try {
            val stringId = call.getString("id") ?: throw Exception("[CapacitorCalendar.${::modifyEvent.name}] Event ID not defined")
            val update = call.getObject("update") ?: throw Exception("[CapacitorCalendar.${::modifyEvent.name}] Update not provided")
            val updated = implementation.modifyEvent(context, stringId.toLong(), update)
            if (updated) {
                call.resolve()
            } else {
                throw Exception("[CapacitorCalendar.${::modifyEvent.name}] Event not updated")
            }
        } catch (error: Exception) {
            call.reject("", error.message)
            return
        }
    }

    @PluginMethod
    fun selectCalendarsWithPrompt(call: PluginCall) {
        call.unimplemented("[CapacitorCalendar.${::selectCalendarsWithPrompt.name}] Not implemented on Android")
        return
    }

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
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

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
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

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
    fun createEvent(call: PluginCall) {
        try {
            val title =
                call.getString("title")
                    ?: throw Exception("[CapacitorCalendar.${::createEvent.name}] A title for the event was not provided")
            val calendarId = call.getString("calendarId")
            val location = call.getString("location")
            val startDate = call.getLong("startDate")
            val endDate = call.getLong("endDate")
            val isAllDay = call.getBoolean("isAllDay", false)
            val alertOffsetInMinutesSingle = call.getFloat("alertOffsetInMinutes")
            val alertOffsetInMinutesMultiple = call.getArray("alertOffsetInMinutes")
            val url = call.getString("url")
            val notes = call.getString("notes")

            val eventUri =
                implementation.createEvent(
                    context,
                    title,
                    calendarId,
                    location,
                    startDate,
                    endDate,
                    isAllDay,
                    alertOffsetInMinutesSingle,
                    alertOffsetInMinutesMultiple,
                    url,
                    notes,
                )

            val id = eventUri?.lastPathSegment ?: throw IllegalArgumentException("Failed to insert event into calendar")
            val ret = JSObject()
            ret.put("result", id)
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

    @PluginMethod(returnType = PluginMethod.RETURN_NONE)
    fun openCalendar(call: PluginCall) {
        val timestamp = call.getLong("date") ?: System.currentTimeMillis()
        try {
            return activity.startActivity(implementation.openCalendar(timestamp))
        } catch (error: Exception) {
            call.reject("", "[CapacitorCalendar.${::openCalendar.name}] Unable to open calendar")
            return
        }
    }

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
    fun listEventsInRange(call: PluginCall) {
        try {
            val startDate =
                call.getLong("startDate")
                    ?: throw Exception("[CapacitorCalendar.${::listEventsInRange.name}] A start date was not provided")
            val endDate =
                call.getLong("endDate")
                    ?: throw Exception("[CapacitorCalendar.${::listEventsInRange.name}] An end date was not provided")
            val ret = JSObject()
            ret.put("result", implementation.listEventsInRange(context, startDate, endDate))
            call.resolve(ret)
        } catch (error: Exception) {
            call.reject("", "[CapacitorCalendar.${::listEventsInRange.name}] Could not get the list of events in requested range")
            return
        }
    }

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
    fun deleteEventsById(call: PluginCall) {
        try {
            val ids =
                call.getArray("ids")
                    ?: throw Exception("[CapacitorCalendar.${::deleteEventsById.name}] Event ids were not provided")
            val ret = JSObject()
            ret.put("result", implementation.deleteEventsById(context, ids))
            call.resolve(ret)
        } catch (error: Exception) {
            call.reject("", "[CapacitorCalendar.${::deleteEventsById.name}] Could not delete events")
            return
        }
    }

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
    fun createCalendar(call: PluginCall) {
        call.unimplemented("[CapacitorCalendar.${::createCalendar.name}] Not implemented on Android")
        return
    }

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
    fun deleteCalendar(call: PluginCall) {
        call.unimplemented("[CapacitorCalendar.${::deleteCalendar.name}] Not implemented on Android")
        return
    }

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
    fun getRemindersFromLists(call: PluginCall) {
        call.unimplemented("[CapacitorCalendar.${::getRemindersFromLists.name}] Not implemented on Android")
        return
    }

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
    fun deleteRemindersById(call: PluginCall) {
        call.unimplemented("[CapacitorCalendar.${::deleteRemindersById.name}] Not implemented on Android")
        return
    }
}
