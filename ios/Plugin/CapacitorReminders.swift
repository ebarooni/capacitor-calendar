//
//  CapacitorReminders.swift
//  Plugin
//
//  Created by Ehsan Barooni on 15.03.24.
//  Copyright © 2024 Max Lynch. All rights reserved.
//

import Foundation
import EventKit
import UIKit
import Capacitor

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

    public func createReminder(with parameters: ReminderCreationParameters) throws -> String {
        func setCalendar() {
            if let listId = parameters.listId, let list = eventStore.calendar(withIdentifier: listId) {
                newReminder.calendar = list
            } else {
                newReminder.calendar = eventStore.defaultCalendarForNewReminders()
            }
        }

        func setPriority() {
            guard let priority = parameters.priority else { return }
            newReminder.priority = max(0, min(9, priority))
        }

        let newReminder = EKReminder(eventStore: eventStore)
        setCalendar()
        setPriority()
        setReminderDateComponents(
            reminder: newReminder,
            startDate: parameters.startDate,
            dueDate: parameters.dueDate,
            completionDate: parameters.completionDate
        )
        setReminderFrequency(reminder: newReminder, recurrence: parameters.recurrence)
        newReminder.title = parameters.title
        if let isCompleted = parameters.isCompleted {
            newReminder.isCompleted = isCompleted
        }
        if let notes = parameters.notes {
            newReminder.notes = notes
        }
        if let url = parameters.url {
            newReminder.url = URL(string: url)
        }
        if let location = parameters.location {
            newReminder.location = location
        }

        do {
            try eventStore.save(newReminder, commit: true)
            return newReminder.calendarItemIdentifier
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

    public func openReminders() async throws {
        return try await withCheckedThrowingContinuation { continuation in
            guard let url = URL(string: "x-apple-reminderkit://") else {
                continuation.resume(throwing: CapacitorCalendarPluginError.unableToOpenReminders)
                return
            }

            Task { @MainActor in
                guard UIApplication.shared.canOpenURL(url) else {
                    continuation.resume(throwing: CapacitorCalendarPluginError.unableToOpenReminders)
                    return
                }

                UIApplication.shared.open(url, options: [:]) { success in
                    if success {
                        continuation.resume()
                    } else {
                        continuation.resume(throwing: CapacitorCalendarPluginError.unableToOpenReminders)
                    }
                }
            }
        }
    }

    public func getRemindersInLists(listIds: JSArray) throws -> [[String: Any]] {
        var lists: [EKCalendar] = []
        for id in listIds {
            if let list = eventStore.calendar(withIdentifier: "\(id)") {
                lists.append(list)
            }
        }

        let predicate = eventStore.predicateForReminders(in: lists)
        let events = self.eventStore.events(matching: predicate)
        return dictionaryRepresentationOfReminder(events: events)
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

    private func setReminderFrequency(reminder: EKReminder, recurrence: RecurrenceParameters?) {
        guard let frequency = recurrence?.frequency, let interval = recurrence?.interval else { return }
        var endDate: EKRecurrenceEnd?
        if let end = recurrence?.end {
            endDate = EKRecurrenceEnd(end: Date(timeIntervalSince1970: end / 1000))
        }
        if let recurrenceFrequency = recurrenceFrequencyMapping[frequency] {
            reminder.recurrenceRules = [EKRecurrenceRule(
                recurrenceWith: recurrenceFrequency,
                interval: interval,
                end: endDate
            )]
        }
    }

    private func setReminderDateComponents(reminder: EKReminder, startDate: Double?, dueDate: Double?, completionDate: Double?) {
        func setStartDate() {
            if let startDate = startDate {
                reminder.startDateComponents = Calendar.current.dateComponents(
                    [.year, .month, .day, .hour, .minute],
                    from: Date(timeIntervalSince1970: startDate / 1000)
                )
                reminder.startDateComponents?.timeZone = Calendar.current.timeZone
            }
        }

        func setDueDate() {
            if let dueDate = dueDate {
                reminder.dueDateComponents = Calendar.current.dateComponents(
                    [.year, .month, .day, .hour, .minute],
                    from: Date(timeIntervalSince1970: dueDate / 1000)
                )
                reminder.dueDateComponents?.timeZone = Calendar.current.timeZone
            }
        }

        func setCompletionDate() {
            if let completionDate = completionDate {
                reminder.completionDate = Date(timeIntervalSince1970: completionDate / 1000)
                reminder.timeZone = Calendar.current.timeZone
            }
        }

        setStartDate()
        setDueDate()
        setCompletionDate()
    }

    private func dictionaryRepresentationOfReminder(events: [EKEvent]) -> [[String: Any]] {
        return events.map { event in
            var dict = [String: Any]()
            dict["id"] = event.eventIdentifier
            if let title = event.title, !title.isEmpty {
                dict["title"] = title
            }
            dict["listId"] = event.calendar.calendarIdentifier
            return dict
        }
    }
}
