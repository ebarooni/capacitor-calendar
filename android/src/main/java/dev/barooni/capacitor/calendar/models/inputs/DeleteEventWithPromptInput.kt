package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.PluginError

data class DeleteEventWithPromptInput(
    private val call: PluginCall,
) {
    val id: Long = call.getString("id")?.toLong() ?: throw PluginError.MissingId
    val title: String = call.getString("title") ?: throw PluginError.TitleMissing
    val message: String = call.getString("message") ?: throw PluginError.MessageMissing
    val confirmButtonText: String = call.getString("confirmButtonText") ?: "Delete"
    val cancelButtonText: String = call.getString("cancelButtonText") ?: "Cancel"
}
