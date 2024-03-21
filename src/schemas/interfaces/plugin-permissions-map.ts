import type { PermissionState } from '@capacitor/core';

export interface PluginPermissionsMap {
  [permission: string]: PermissionState;
}
