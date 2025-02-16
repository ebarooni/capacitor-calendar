package dev.barooni.capacitor.calendar

import android.Manifest
import androidx.activity.result.ActivityResult
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
import dev.barooni.capacitor.calendar.models.inputs.CreateEventInput
import dev.barooni.capacitor.calendar.models.inputs.CreateEventWithPromptInput
import dev.barooni.capacitor.calendar.models.inputs.ModifyEvent
import dev.barooni.capacitor.calendar.models.inputs.ModifyEventWithPromptInput
import dev.barooni.capacitor.calendar.models.inputs.RequestAllPermissionsInput
import dev.barooni.capacitor.calendar.models.inputs.RequestPermissionInput
import dev.barooni.capacitor.calendar.models.results.CreateEventWithPromptResult
import dev.barooni.capacitor.calendar.models.results.ModifyEventWithPromptResult
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

    @PluginMethod
    fun modifyEventWithPrompt(call: PluginCall) {
        try {
            val input = ModifyEventWithPromptInput(call, "modifyEventWithPromptCallback")
            implementationNew.modifyEventWithPrompt(input, ::startActivityForResult)
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @ActivityCallback
    private fun modifyEventWithPromptCallback(
        call: PluginCall?,
        result: ActivityResult,
    ) {
        if (call == null) {
            return
        }
        call.resolve(ModifyEventWithPromptResult().toJSON())
    }

    @PluginMethod
    fun createEvent(call: PluginCall) {
        try {
            val input = CreateEventInput(call)
            val result = implementationNew.createEvent(input)
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun commit(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::commit.name).message)
    }

    @PluginMethod(returnType = PluginMethod.RETURN_NONE)
    fun modifyEvent(call: PluginCall) {
        try {
            val input = ModifyEvent(call)
            implementationNew.modifyEvent(input)
            call.resolve()
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun selectCalendarsWithPrompt(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::selectCalendarsWithPrompt.name).message)
    }

    @PluginMethod
    fun fetchAllCalendarSources(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::fetchAllCalendarSources.name).message)
    }

    @PluginMethod
    fun listCalendars(call: PluginCall) {
        try {
            val result = implementationNew.listCalendars()
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun fetchAllRemindersSources(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::fetchAllRemindersSources.name).message)
    }

    @PluginMethod
    fun openReminders(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::openReminders.name).message)
    }

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
    fun getDefaultCalendar(call: PluginCall) {
        try {
            val result = implementationNew.getDefaultCalendar()
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun getDefaultRemindersList(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::getDefaultRemindersList.name).message)
    }

    @PluginMethod
    fun getRemindersLists(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::getRemindersLists.name).message)
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
