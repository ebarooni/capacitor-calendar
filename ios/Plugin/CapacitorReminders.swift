//
//  CapacitorReminders.swift
//  Plugin
//
//  Created by Ehsan Barooni on 15.03.24.
//  Copyright © 2024 Max Lynch. All rights reserved.
//

import Foundation
import EventKit

public class CapacitorReminders: NSObject {
    private let eventStore: EKEventStore
    
    init(eventStore: EKEventStore) {
        self.eventStore = eventStore
    }
    
    public func checkAllPermissions() async throws -> [String: String] {
        return try await withCheckedThrowingContinuation { continuation in
            var permissionsState: [String: String]
            switch EKEventStore.authorizationStatus(for: .reminder) {
            case .authorized, .fullAccess:
                permissionsState = [
                    "writeReminders": PermissionState.granted.rawValue,
                ]
            case .denied, .restricted:
                permissionsState = [
                    "writeReminders": PermissionState.denied.rawValue,
                ]
            case .writeOnly, .notDetermined:
                permissionsState = [
                    "writeReminders": PermissionState.prompt.rawValue,
                ]
            @unknown default:
                continuation.resume(throwing: CapacitorCalendarPluginError.unknownPermissionStatus)
                return
            }
            continuation.resume(returning: permissionsState)
        }
    }
    
    public func requestFullAccessToReminders() async throws -> String {
        return try await withCheckedThrowingContinuation { continuation in
            if #available(iOS 17.0, *) {
                eventStore.requestFullAccessToReminders { granted, error in
                    if let error = error {
                        continuation.resume(throwing: CapacitorCalendarPluginError.eventStoreAuthorization)
                        return
                    }
                    
                    var permissionState: String
                    if granted {
                        permissionState = PermissionState.granted.rawValue
                    } else {
                        permissionState = PermissionState.denied.rawValue
                    }
                    continuation.resume(returning: permissionState)
                }
            } else {
                eventStore.requestAccess(to: .reminder) { granted, error in
                    if let error = error {
                        continuation.resume(throwing: CapacitorCalendarPluginError.eventStoreAuthorization)
                        return
                    }
                    
                    var permissionState: String
                    if granted {
                        permissionState = PermissionState.granted.rawValue
                    } else {
                        permissionState = PermissionState.denied.rawValue
                    }
                    continuation.resume(returning: permissionState)
                }
            }
        }
    }
}
