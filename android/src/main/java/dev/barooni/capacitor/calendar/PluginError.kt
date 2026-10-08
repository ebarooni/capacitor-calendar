package dev.barooni.capacitor.calendar

import com.getcapacitor.PluginCall

sealed class PluginError(
    localizedDescription: String,
    val code: String? = null,
) : Exception(localizedDescription) {
    data object AccountNameMissing : PluginError("Account name must be provided.")

    data object AttendeeEmailMissing : PluginError("Attendee email must be provided.")

    data object CalendarIdMissing : PluginError("Calendar ID must be provided.")

    data object CalendarNotFound : PluginError("Calendar not found.")

    data object ColorMissing : PluginError("Color must be provided.")

    data class CustomError(
        val details: String,
    ) : PluginError(details)

    data object EventNotFound : PluginError("Event not found.")

    data object FailedToDelete : PluginError("Failed to delete.")

    data object FailedToModify : PluginError("Failed to modify.")

    data object FailedToRetrieveCalendarId : PluginError("Failed to retrieve calendar ID.")

    data object FailedToRetrieveEventId : PluginError("Failed to retrieve event ID.")

    data object FromDateMissing : PluginError("From date must be provided.")

    data object InstanceDateMissing : PluginError(
        "Instance date must be provided for this span on recurring events.",
    )

    data object InvalidCalendarId : PluginError("Invalid calendar ID.")

    data object InvalidColor : PluginError("Invalid color format.")

    data object InvalidInvitees : PluginError("Invalid invitees. Array must contain only strings.")

    data object InvalidScope : PluginError("Invalid scope.")

    data object MessageMissing : PluginError("Message must be provided.")

    data class MissingDeclaration(
        val permission: String,
    ) : PluginError(
            "Missing AndroidManifest permission: $permission.",
            "EB-CLDR-0100",
        )

    data object MissingId : PluginError("Event ID must be provided.")

    data object MissingScope : PluginError("Scope must be provided.")

    data object NoCalendarsAvailable : PluginError("No calendars available.")

    data object NoFieldsToModify : PluginError("At least one of title or color must be provided.")

    data object OwnerAccountMissing : PluginError("Owner account must be provided.")

    data object TitleMissing : PluginError("Title must be provided.")

    data object ToDateMissing : PluginError("To date must be provided.")

    data object UnhandledPermissionState : PluginError("Unhandled permission state.")

    data class Unimplemented(
        val methodName: String,
    ) : PluginError("$methodName is not implemented on Android.")
}

/** Rejects with Cap-style code when the PluginError provides one; otherwise message only. */
fun PluginCall.reject(error: PluginError) {
    val code = error.code
    if (code != null) {
        reject(error.message, code)
    } else {
        reject(error.message)
    }
}
