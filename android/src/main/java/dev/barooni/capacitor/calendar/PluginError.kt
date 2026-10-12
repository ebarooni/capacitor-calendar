package dev.barooni.capacitor.calendar

sealed class PluginError(
    localizedDescription: String,
    val code: String? = null,
) : Exception(localizedDescription) {
    data object AccountNameMissing : PluginError("Account name must be provided.", "EB-CLDR-0001")

    data object AttendeeEmailMissing : PluginError("Attendee email must be provided.", "EB-CLDR-0001")

    data object CalendarIdMissing : PluginError("Calendar ID must be provided.", "EB-CLDR-0001")

    data object CalendarNotFound : PluginError("Calendar not found.", "EB-CLDR-0002")

    data object ColorMissing : PluginError("Color must be provided.", "EB-CLDR-0001")

    data class CustomError(
        val details: String,
    ) : PluginError(details)

    data object EventNotFound : PluginError("Event not found.", "EB-CLDR-0002")

    data object FailedToDelete : PluginError("Failed to delete.")

    data object FailedToModify : PluginError("Failed to modify.")

    data object FailedToRetrieveCalendarId : PluginError("Failed to retrieve calendar ID.")

    data object FailedToRetrieveEventId : PluginError("Failed to retrieve event ID.")

    data object FromDateMissing : PluginError("From date must be provided.", "EB-CLDR-0001")

    data object InstanceDateMissing : PluginError(
        "Instance date must be provided for this span on recurring events.",
        "EB-CLDR-0001",
    )

    data object InvalidCalendarId : PluginError("Invalid calendar ID.", "EB-CLDR-0001")

    data object InvalidColor : PluginError("Invalid color format.", "EB-CLDR-0001")

    data object InvalidInvitees : PluginError("Invalid invitees. Array must contain only strings.", "EB-CLDR-0001")

    data object InvalidScope : PluginError("Invalid scope.", "EB-CLDR-0001")

    data object MessageMissing : PluginError("Message must be provided.", "EB-CLDR-0001")

    data class MissingDeclaration(
        val permission: String,
    ) : PluginError(
            "Missing AndroidManifest permission: $permission.",
            "EB-CLDR-0100",
        )

    data object MissingId : PluginError("Event ID must be provided.", "EB-CLDR-0001")

    data object MissingScope : PluginError("Scope must be provided.", "EB-CLDR-0001")

    data object NoCalendarsAvailable : PluginError("No calendars available.", "EB-CLDR-0001")

    data object NoFieldsToModify : PluginError("At least one of title or color must be provided.", "EB-CLDR-0001")

    data object OwnerAccountMissing : PluginError("Owner account must be provided.", "EB-CLDR-0001")

    data object TitleMissing : PluginError("Title must be provided.", "EB-CLDR-0001")

    data object ToDateMissing : PluginError("To date must be provided.", "EB-CLDR-0001")

    data object UnhandledPermissionState : PluginError("Unhandled permission state.")

    data class Unimplemented(
        val methodName: String,
    ) : PluginError("$methodName is not implemented on Android.")
}
