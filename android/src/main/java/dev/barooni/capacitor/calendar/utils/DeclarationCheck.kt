package dev.barooni.capacitor.calendar.utils

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import com.getcapacitor.PluginCall
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope

/**
 * Early AndroidManifest permission checks for EB-CLDR-0100 MissingDeclaration.
 */
class DeclarationCheck(
    private val context: Context,
) {
    /**
     * Rejects with EB-CLDR-0100 when a required AndroidManifest permission is not declared.
     * @return true when all permissions are declared; false when the call was rejected.
     */
    fun ensureManifestPermissions(
        call: PluginCall,
        vararg permissions: String,
    ): Boolean {
        for (permission in permissions) {
            if (!isPermissionDeclared(permission)) {
                call.reject(
                    "Missing AndroidManifest permission: $permission.",
                    MISSING_DECLARATION_CODE,
                )
                return false
            }
        }
        return true
    }

    fun ensureManifestPermissionsForScope(
        call: PluginCall,
        scope: CalendarPermissionScope,
    ): Boolean =
        when (scope) {
            CalendarPermissionScope.READ_CALENDAR ->
                ensureManifestPermissions(call, Manifest.permission.READ_CALENDAR)
            CalendarPermissionScope.WRITE_CALENDAR ->
                ensureManifestPermissions(call, Manifest.permission.WRITE_CALENDAR)
            CalendarPermissionScope.READ_REMINDERS,
            CalendarPermissionScope.WRITE_REMINDERS,
            -> true
        }

    private fun isPermissionDeclared(permission: String): Boolean {
        val packageInfo =
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                context.packageManager.getPackageInfo(
                    context.packageName,
                    PackageManager.PackageInfoFlags.of(PackageManager.GET_PERMISSIONS.toLong()),
                )
            } else {
                @Suppress("DEPRECATION")
                context.packageManager.getPackageInfo(context.packageName, PackageManager.GET_PERMISSIONS)
            }
        return packageInfo.requestedPermissions?.contains(permission) == true
    }

    companion object {
        const val MISSING_DECLARATION_CODE = "EB-CLDR-0100"
    }
}
