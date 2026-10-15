package dev.barooni.capacitor.calendar.utils

import android.content.ActivityNotFoundException
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError

/**
 * Maps thrown exceptions to [PluginError] and rejects the Capacitor call.
 */
object PluginCallRejecter {
    fun reject(
        call: PluginCall,
        error: Exception?,
    ) {
        val pluginError = toPluginError(error)
        val message =
            pluginError?.message
                ?: error?.message
                ?: PluginError.CustomError("An unknown error has occurred.").message
        call.reject(message, pluginError?.code)
    }

    fun toPluginError(error: Exception?): PluginError? =
        when (error) {
            is PluginError -> {
                error
            }

            is ActivityNotFoundException -> {
                PluginError.NotSupported(
                    wrapSystemError("Failed to launch calendar app.", error.message),
                )
            }

            is SecurityException -> {
                PluginError.PermissionDenied(
                    wrapSystemError("Calendar permission was denied.", error.message),
                )
            }

            null -> {
                null
            }

            else -> {
                PluginError.IoError(
                    wrapSystemError(
                        "An I/O error occurred while accessing the calendar.",
                        error.message,
                    ),
                )
            }
        }

    /**
     * Lead with the stable plugin sentence; append a different non-blank OS message in parentheses.
     */
    fun wrapSystemError(
        canonicalMessage: String,
        systemMessage: String?,
    ): String {
        val detail = systemMessage?.trim().orEmpty()
        return if (detail.isEmpty() || detail == canonicalMessage) {
            canonicalMessage
        } else {
            "$canonicalMessage ($detail)"
        }
    }
}
