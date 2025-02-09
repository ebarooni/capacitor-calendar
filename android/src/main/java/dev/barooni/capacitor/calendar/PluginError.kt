package dev.barooni.capacitor.calendar

sealed class PluginError(
    localizedDescription: String,
) : Exception(localizedDescription) {
    data object MissingScope : PluginError("Scope Must be provided.")

    data object InvalidScope : PluginError("Invalid scope.")

    data object UnhandledPermissionState : PluginError("Unhandled permission state.")

    data object InvalidInvitees : PluginError("Invalid invitees. Array must contain only strings.")

    data object IdMissing : PluginError("Event ID must be provided.")

    data class Unimplemented(
        val methodName: String,
    ) : PluginError("$methodName is not implemented on Android.")

    data class CustomError(
        val details: String,
    ) : PluginError(details)
}
