package dev.barooni.capacitor.calendar.utils

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import dev.barooni.capacitor.calendar.PluginError
import dev.barooni.capacitor.calendar.models.enums.CalendarPermissionScope

/**
 * Early AndroidManifest permission checks for EB-CLDR-0100 MissingDeclaration.
 * Callers pass only the permissions the method actually uses.
 */
class DeclarationCheck(
    private val context: Context,
) {
    /**
     * Throws [PluginError.MissingDeclaration] when a required AndroidManifest permission is not declared.
     */
    fun ensureManifestPermissions(vararg permissions: String) {
        for (permission in permissions) {
            if (!isPermissionDeclared(permission)) {
                throw PluginError.MissingDeclaration(permission)
            }
        }
    }

    fun ensureManifestPermissionsForScope(scope: CalendarPermissionScope) {
        when (scope) {
            CalendarPermissionScope.READ_CALENDAR ->
                ensureManifestPermissions(Manifest.permission.READ_CALENDAR)
            CalendarPermissionScope.WRITE_CALENDAR ->
                ensureManifestPermissions(Manifest.permission.WRITE_CALENDAR)
            CalendarPermissionScope.READ_REMINDERS,
            CalendarPermissionScope.WRITE_REMINDERS,
            -> Unit
        }
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
}
