//
//  PermissionError.swift
//  Plugin
//
//  Created by Ehsan Barooni on 27.02.24.
//  Copyright © 2024 Max Lynch. All rights reserved.
//

import Foundation

public enum CapacitorCalendarPluginError: Error {
    case unknownPermissionStatus
    case eventStoreAuthorization
    case viewControllerUnavailable
    case unknownActionEventCreationPrompt
    case canceledCalendarsSelectionPrompt
    case noDefaultCalendar
}
