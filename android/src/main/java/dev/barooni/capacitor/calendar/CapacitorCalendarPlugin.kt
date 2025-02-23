package dev.barooni.capacitor.calendar

import android.Manifest
import androidx.activity.result.ActivityResult
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.ActivityCallback
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.Permission
import com.getcapacitor.annotation.PermissionCallback
import dev.barooni.capacitor.calendar.implementation.CapacitorCalendar
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope
import dev.barooni.capacitor.calendar.models.inputs.CheckPermissionInput
import dev.barooni.capacitor.calendar.models.inputs.CreateCalendarInput
import dev.barooni.capacitor.calendar.models.inputs.CreateEventInput
import dev.barooni.capacitor.calendar.models.inputs.CreateEventWithPromptInput
import dev.barooni.capacitor.calendar.models.inputs.DeleteCalendarInput
import dev.barooni.capacitor.calendar.models.inputs.DeleteEventInput
import dev.barooni.capacitor.calendar.models.inputs.DeleteEventWithPromptInput
import dev.barooni.capacitor.calendar.models.inputs.DeleteEventsByIdInput
import dev.barooni.capacitor.calendar.models.inputs.ListEventsInRangeInput
import dev.barooni.capacitor.calendar.models.inputs.ModifyEvent
import dev.barooni.capacitor.calendar.models.inputs.ModifyEventWithPromptInput
import dev.barooni.capacitor.calendar.models.inputs.OpenCalendarInput
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
    private val implementation: CapacitorCalendar by lazy { CapacitorCalendar(this) }
    private var eventIdOptional = false

    @PluginMethod
    fun checkPermission(call: PluginCall) {
        try {
            val input = CheckPermissionInput(call)
            val result = implementation.checkPermission(input)
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun checkAllPermissions(call: PluginCall) {
        try {
            val result = implementation.checkAllPermissions()
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun requestPermission(call: PluginCall) {
        try {
            val input = RequestPermissionInput.FromCall(call, ::requestPermissionCallback.name)
            implementation.requestPermission(input, ::requestPermissionForAlias)
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
            implementation.requestAllPermissions(input, ::requestPermissionForAlias)
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
            implementation.requestPermission(input, ::requestPermissionForAlias)
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
            implementation.requestPermission(input, ::requestPermissionForAlias)
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
            implementation.requestAllPermissions(input, ::requestPermissionForAlias)
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
            implementation.createEventWithPrompt(input, ::startActivityForResult)
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
            implementation.modifyEventWithPrompt(input, ::startActivityForResult)
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
            val result = implementation.createEvent(input)
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
            implementation.modifyEvent(input)
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
            val result = implementation.listCalendars()
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
            val result = implementation.getDefaultCalendar()
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
    fun openCalendar(call: PluginCall) {
        try {
            val input = OpenCalendarInput(call)
            implementation.openCalendar(input)
            call.resolve()
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun createCalendar(call: PluginCall) {
        try {
            val input = CreateCalendarInput(call)
            val result = implementation.createCalendar(input)
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun deleteCalendar(call: PluginCall) {
        try {
            val input = DeleteCalendarInput(call)
            implementation.deleteCalendar(input)
            call.resolve()
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun createReminder(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::createReminder.name).message)
    }

    @PluginMethod
    fun deleteRemindersById(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::deleteRemindersById.name).message)
    }

    @PluginMethod
    fun deleteReminder(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::deleteReminder.name).message)
    }

    @PluginMethod
    fun modifyReminder(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::modifyReminder.name).message)
    }

    @PluginMethod
    fun getReminderById(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::getReminderById.name).message)
    }

    @PluginMethod
    fun getRemindersFromLists(call: PluginCall) {
        call.unimplemented(PluginError.Unimplemented(::getRemindersFromLists.name).message)
    }

    @PluginMethod
    fun deleteEventsById(call: PluginCall) {
        try {
            val input = DeleteEventsByIdInput(call)
            val result = implementation.deleteEventsById(input)
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun deleteEvent(call: PluginCall) {
        try {
            val input = DeleteEventInput(call)
            implementation.deleteEvent(input)
            call.resolve()
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun deleteEventWithPrompt(call: PluginCall) {
        try {
            val input = DeleteEventWithPromptInput(call)
            implementation.deleteEventWithPrompt(
                input,
                onComplete = { result ->
                    call.resolve(result.toJSON())
                },
            )
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }

    @PluginMethod
    fun listEventsInRange(call: PluginCall) {
        try {
            val input = ListEventsInRangeInput(call)
            val result = implementation.listEventsInRange(input)
            call.resolve(result.toJSON())
        } catch (error: Exception) {
            call.reject(error.message)
        }
    }
}
