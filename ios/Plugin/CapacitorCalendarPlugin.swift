import Foundation
import EventKit
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorCalendarPlugin)
public class CapacitorCalendarPlugin: CAPPlugin {
    private let eventStore = EKEventStore()
    private lazy var calendar = CapacitorCalendar(bridge: self.bridge, eventStore: self.eventStore)
    private lazy var reminders = CapacitorReminders(eventStore: self.eventStore)
    
    @objc public func checkPermission(_ call: CAPPluginCall) {
        guard let alias = call.getString("alias") else {
            call.reject("[CapacitorCalendar.\(#function)] Permission name is not defined")
            return
        }
        
        Task {
            do {
                switch alias {
                case "readCalendar":
                    let permissionsState = try await calendar.checkAllPermissions()
                    call.resolve(["result": permissionsState["readCalendar"]!])
                case "writeCalendar":
                    let permissionsState = try await calendar.checkAllPermissions()
                    call.resolve(["result": permissionsState["writeCalendar"]!])
                case "readReminders":
                    let permissionsState = try await reminders.checkAllPermissions()
                    call.resolve(["result": permissionsState["readReminders"]!])
                case "writeReminders":
                    let permissionsState = try await reminders.checkAllPermissions()
                    call.resolve(["result": permissionsState["writeReminders"]!])
                default:
                    call.reject("[CapacitorCalendar.\(#function)] Could not determine the status of the requested permission")
                    return
                }
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not determine the status of the requested permission")
                return
            }
        }
    }
    
    @objc public func checkAllPermissions(_ call: CAPPluginCall) {
        Task {
            do {
                let calendarPermissionsState = try await calendar.checkAllPermissions()
                let remindersPermissionsState = try await reminders.checkAllPermissions()
                call.resolve(calendarPermissionsState.merging(remindersPermissionsState) { (_, new) in new })
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not determine the status of the requested permissions")
                return
            }
        }
    }
    
    @objc public func requestPermission(_ call: CAPPluginCall) {
        guard let alias = call.getString("alias") else {
            call.reject("[CapacitorCalendar.\(#function)] Permission name is not defined")
            return
        }
        
        Task {
            do {
                switch alias {
                case "writeCalendar":
                    let result = try await calendar.requestWriteAccessToEvents()
                    call.resolve(result)
                case "readCalendar":
                    let result = try await calendar.requestFullAccessToEvents()
                    call.resolve(["result": result])
                case "writeReminders":
                    let result = try await reminders.requestFullAccessToReminders()
                    call.resolve(["result": result])
                case "readReminders":
                    let result = try await reminders.requestFullAccessToReminders()
                    call.resolve(["result": result])
                default:
                    call.reject("[CapacitorCalendar.\(#function)] Could not authorize \(alias)")
                    return
                }
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not authorize \(alias)")
                return
            }
        }
    }
    
    @objc public func requestAllPermissions(_ call: CAPPluginCall) {
        Task {
            do {
                let calendarResult = try await calendar.requestFullAccessToEvents()
                let remindersResult = try await reminders.requestFullAccessToReminders()
                var result: [String: String] = [
                    "readCalendar": PermissionState.denied.rawValue,
                    "writeCalendar": PermissionState.denied.rawValue,
                    "readReminders": PermissionState.denied.rawValue,
                    "writeReminders": PermissionState.denied.rawValue
                ]
                if calendarResult == PermissionState.granted.rawValue {
                    result["readCalendar"] = PermissionState.granted.rawValue
                    result["writeCalendar"] = PermissionState.granted.rawValue
                }
                if remindersResult == PermissionState.granted.rawValue {
                    result["readReminders"] = PermissionState.granted.rawValue
                    result["writeReminders"] = PermissionState.granted.rawValue
                    
                }
                call.resolve(result)
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not authorize all permissions")
                return
            }
        }
    }
    
    @objc public func createEventWithPrompt(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await calendar.createEventWithPrompt()
                call.resolve(["eventCreated": result])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Unable to retrieve view controller")
                return
            }
        }
    }
    
    @objc public func selectCalendarsWithPrompt(_ call: CAPPluginCall) {
        guard let selectionStyle = call.getInt("selectionStyle") else {
            call.reject("[CapacitorCalendar.\(#function)] Selection style was not provided")
            return
        }
        guard let displayStyle = call.getInt("displayStyle") else {
            call.reject("[CapacitorCalendar.\(#function)] Display style was not provided")
            return
        }
        
        Task {
            do {
                let result = try await calendar.selectCalendarsWithPrompt(selectionStyle: selectionStyle, displayStyle: displayStyle)
                call.resolve(["result": result])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Calendars selection prompt got canceled")
                return
            }
        }
    }
    
    @objc public func listCalendars(_ call: CAPPluginCall) {
        call.resolve(["result": calendar.listCalendars()])
    }
    
    @objc public func getDefaultCalendar(_ call: CAPPluginCall) {
        do {
            try call.resolve(["result": calendar.getDefaultCalendar()])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] No default calendar was found")
            return
        }
    }
    
    @objc public func createEvent(_ call: CAPPluginCall) {
        guard let title = call.getString("title") else {
            call.reject("[CapacitorCalendar.\(#function)] A title for the event was not provided")
            return
        }
        let location = call.getString("location")
        let startDate = call.getDate("startDate")
        let endDate = call.getDate("endDate")
        let isAllDay = call.getBool("isAllDay")
        let calendarId = call.getString("calendarId")
        
        do {
            try calendar.createEvent(
                title: title,
                calendarId: calendarId,
                location: location,
                startDate: startDate,
                endDate: endDate,
                isAllDay: isAllDay
            )
            call.resolve(["eventCreated": true])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Unable to create event")
            return
        }
    }
    
    @objc public func getDefaultRemindersList(_ call: CAPPluginCall) {
        do {
            try call.resolve(["result": reminders.getDefaultRemindersList()])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] No default Reminders list was found")
            return
        }
    }
    
    @objc public func getRemindersLists(_ call: CAPPluginCall) {
        call.resolve(["result": reminders.getRemindersLists()])
    }
    
    @objc public func createReminder (_ call: CAPPluginCall) {
        guard let title = call.getString("title") else {
            call.reject("[CapacitorCalendar.\(#function)] A title for the reminder was not provided")
            return
        }
        let listId = call.getString("listId")
        let priority = call.getInt("priority")
        let isCompleted = call.getBool("isCompleted")
        let startDate = call.getDouble("startDate")
        let dueDate = call.getDouble("dueDate")
        let completionDate = call.getDouble("completionDate")
        let notes = call.getString("notes")
        
        do {
            try reminders.createReminder(title: title, listId: listId, priority: priority, isCompleted: isCompleted, startDate: startDate, dueDate: dueDate, completionDate: completionDate, notes: notes)
            call.resolve(["reminderCreated": true])
        } catch {
            call.reject("[CapacitorCalendar.\(#function)] Unable to create reminder")
            return
        }
    }
}
