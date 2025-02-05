package dev.barooni.capacitor.calendar.models.inputs

import com.getcapacitor.PluginCall

data class RequestAllPermissionsInput(val call: PluginCall, val callbackName: String, val alias: String = "readWriteCalendar") {}
