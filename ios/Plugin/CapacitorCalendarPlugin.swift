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
    private lazy var implementation = CapacitorCalendar(bridge: self.bridge, eventStore: self.eventStore)
    
    @objc public func checkPermission(_ call: CAPPluginCall) {
        guard let alias = call.getString("alias") else {
            call.reject("[CapacitorCalendar.\(#function)] Permission name is not defined")
            return
        }
        
        Task {
            do {
                let permissionsState = try await implementation.checkAllPermissions()
                
                switch alias {
                case "readCalendar":
                    call.resolve(["result": permissionsState["readCalendar"]!])
                case "writeCalendar":
                    call.resolve(["result": permissionsState["writeCalendar"]!])
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
                let permissionsState = try await implementation.checkAllPermissions()
                call.resolve(permissionsState)
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
                    let result = try await implementation.requestWriteAccessToEvents()
                    call.resolve(result)
                case "readCalendar":
                    let result = try await implementation.requestFullAccessToEvents()
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
                let result = try await implementation.requestFullAccessToEvents()
                if (result == PermissionState.granted.rawValue) {
                    call.resolve([
                        "readCalendar": PermissionState.granted.rawValue,
                        "writeCalendar": PermissionState.granted.rawValue
                    ])
                } else {
                    call.resolve([
                        "readCalendar": PermissionState.denied.rawValue,
                        "writeCalendar": PermissionState.denied.rawValue
                    ])
                }
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Could not authorize all permissions")
                return
            }
        }
    }
    
    @objc public func createEventWithPrompt(_ call: CAPPluginCall) {
        Task {
            do {
                let result = try await implementation.createEventWithPrompt()
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
                let result = try await implementation.selectCalendarsWithPrompt(selectionStyle: selectionStyle, displayStyle: displayStyle)
                call.resolve(["result": result])
            } catch {
                call.reject("[CapacitorCalendar.\(#function)] Calendars selection prompt got canceled")
                return
            }
        }
    }
    
    @objc public func listCalendars(_ call: CAPPluginCall) {
        call.resolve(["result": implementation.listCalendars()])
    }
    
    @objc public func getDefaultCalendar(_ call: CAPPluginCall) {
        do {
            try call.resolve(["result": implementation.getDefaultCalendar()])
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
            try implementation.createEvent(
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
}
