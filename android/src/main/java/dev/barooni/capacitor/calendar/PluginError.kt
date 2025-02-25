package dev.barooni.capacitor.calendar

sealed class PluginError(
    localizedDescription: String,
) : Exception(localizedDescription) {
    data object MissingScope : PluginError("Scope Must be provided.")

    data object InvalidScope : PluginError("Invalid scope.")

    data object UnhandledPermissionState : PluginError("Unhandled permission state.")

    data object InvalidInvitees : PluginError("Invalid invitees. Array must contain only strings.")

    data object MissingId : PluginError("Event ID must be provided.")

    data object TitleMissing : PluginError("Title must be provided.")

    data object FailedToRetrieveEventId : PluginError("Failed to retrieve event ID.")

    data object FailedToRetrieveCalendarId : PluginError("Failed to retrieve calendar ID.")

    data object AttendeeEmailMissing : PluginError("Attendee email must be provided.")

    data object NoCalendarsAvailable : PluginError("No calendars available.")

    data object ColorMissing : PluginError("Color must be provided.")

    data object AccountNameMissing : PluginError("Account name must be provided.")

    data object OwnerAccountMissing : PluginError("Owner account must be provided.")

    data object FailedToDelete : PluginError("Failed to delete.")

    data object MessageMissing : PluginError("Message must be provided.")

    data object FromDateMissing : PluginError("From date must be provided.")

    data object ToDateMissing : PluginError("To date must be provided.")

    data object FailedToModify : PluginError("Failed to modify.")

    data class Unimplemented(
        val methodName: String,
    ) : PluginError("$methodName is not implemented on Android.")

    data class CustomError(
        val details: String,
    ) : PluginError(details)
}
