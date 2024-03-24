//
//  EventCreationParameters.swift
//  Plugin
//
//  Created by Ehsan Barooni on 22.03.24.
//  Copyright © 2024 Max Lynch. All rights reserved.
//

import Foundation

public struct EventCreationParameters {
    public var title: String
    public var calendarId: String?
    public var location: String?
    public var startDate: Double?
    public var endDate: Double?
    public var isAllDay: Bool?
}
