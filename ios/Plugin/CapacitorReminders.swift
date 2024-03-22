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
    private let recurrenceFrequencyMapping: [Int: EKRecurrenceFrequency] = [
        0: .daily,
        1: .weekly,
        2: .monthly,
        3: .yearly
    ]

    init(eventStore: EKEventStore) {
        self.eventStore = eventStore
    }

    public func getDefaultRemindersList() throws -> [String: String] {
        let defaultRemindersList = eventStore.defaultCalendarForNewReminders()
        if let defaultRemindersList = defaultRemindersList {
            return [
                "id": defaultRemindersList.calendarIdentifier,
                "title": defaultRemindersList.title
            ]
        } else {
            throw CapacitorCalendarPluginError.noDefaultCalendar
        }
    }

    public func checkAllPermissions() async throws -> [String: String] {
        return try await withCheckedThrowingContinuation { continuation in
            var permissionsState: [String: String]
            switch EKEventStore.authorizationStatus(for: .reminder) {
            case .authorized, .fullAccess:
                permissionsState = [
                    "writeReminders": PermissionState.granted.rawValue,
                    "readReminders": PermissionState.granted.rawValue
                ]
            case .denied, .restricted:
                permissionsState = [
                    "writeReminders": PermissionState.denied.rawValue,
                    "readReminders": PermissionState.denied.rawValue
                ]
            case .writeOnly, .notDetermined:
                permissionsState = [
                    "writeReminders": PermissionState.prompt.rawValue,
                    "readReminders": PermissionState.prompt.rawValue
                ]
            @unknown default:
                continuation.resume(throwing: CapacitorCalendarPluginError.unknownPermissionStatus)
                return
            }
            continuation.resume(returning: permissionsState)
        }
    }

    public func getRemindersLists() -> [[String: String]] {
        return convertEKCalendarsToDictionaries(calendars: Set(eventStore.calendars(for: .reminder)))
    }

    public func createReminder(title: String, listId: String?, priority: Int?, isCompleted: Bool?, startDate: Double?, dueDate: Double?, completionDate: Double?, notes: String?, url: String?, location: String?, frequency: Int?, interval: Int?, end: Double?) throws {
        let newReminder = EKReminder(eventStore: eventStore)
        newReminder.title = title
        if let listId = listId, let list = eventStore.calendar(withIdentifier: listId) {
            newReminder.calendar = list
        } else {
            newReminder.calendar = eventStore.defaultCalendarForNewReminders()
        }
        if let priority = priority {
            if priority > 9 {
                newReminder.priority = 9
            } else if priority < 0 {
                newReminder.priority = 0
            } else {
                newReminder.priority = priority
            }
        }
        if let isCompleted = isCompleted {
            newReminder.isCompleted = isCompleted
        }
        if let startDate = startDate {
            newReminder.startDateComponents = Calendar.current.dateComponents([.year, .month, .day, .hour, .minute], from: Date(timeIntervalSince1970: startDate / 1000))
            newReminder.startDateComponents?.timeZone = Calendar.current.timeZone
        }
        if let dueDate = dueDate {
            newReminder.dueDateComponents = Calendar.current.dateComponents([.year, .month, .day, .hour, .minute], from: Date(timeIntervalSince1970: dueDate / 1000))
            newReminder.dueDateComponents?.timeZone = Calendar.current.timeZone
        }
        if let completionDate = completionDate {
            newReminder.completionDate = Date(timeIntervalSince1970: completionDate / 1000)
            newReminder.timeZone = Calendar.current.timeZone
        }
        if let notes = notes {
            newReminder.notes = notes
        }
        if let url = url {
            newReminder.url = URL(string: url)
        }
        if let location = location {
            newReminder.location = location
        }
        if let frequency = frequency, let interval = interval {
            var endDate: EKRecurrenceEnd?
            if let end = end {
                endDate = EKRecurrenceEnd(end: Date(timeIntervalSince1970: end / 1000))
            }
            newReminder.recurrenceRules = [EKRecurrenceRule(
                recurrenceWith: recurrenceFrequencyMapping[frequency]!,
                interval: interval,
                end: endDate
            )]
        }

        do {
            try eventStore.save(newReminder, commit: true)
        } catch {
            throw CapacitorCalendarPluginError.unknownActionEventCreationPrompt
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

    private func convertEKCalendarsToDictionaries(calendars: Set<EKCalendar>) -> [[String: String]] {
        var result: [[String: String]] = []

        for calendar in calendars {
            let calendarDict: [String: String] = [
                "id": calendar.calendarIdentifier,
                "title": calendar.title
            ]
            result.append(calendarDict)
        }

        return result
    }
}
