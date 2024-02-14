import Foundation
import Capacitor
import EventKitUI


public class CapacitorCalendar: NSObject, EKEventEditViewDelegate {
    private enum CalendarEventActionResult: String {
        case saved = "saved"
        case canceled = "canceled"
        case error = "error"
    }
    
    private enum PermissionState: String {
        case granted = "granted"
        case denied = "denied"
        case prompt = "prompt"
        case promptWithRationale = "prompt-with-rationale"
    }
    
    private let bridge: (any CAPBridgeProtocol)?
    private let store = EKEventStore()
    private var eventCall: CAPPluginCall?
    
    init(bridge: (any CAPBridgeProtocol)?) {
        self.bridge = bridge
    }
    
    public func createEventWithPrompt(_ call: CAPPluginCall) {
        guard let viewController = bridge?.viewController else {
            call.reject("[CapacitorCalendar.\(#function)] Unable to retrieve view controller")
            return
        }
        
        eventCall = call
        let eventEditViewController = EKEventEditViewController()
        eventEditViewController.eventStore = store
        viewController.present(eventEditViewController, animated: true, completion: nil)
        eventEditViewController.editViewDelegate = self
    }
    
    public func checkPermission(_ call: CAPPluginCall) {
        guard let permissionName = call.getString("alias") else {
            call.reject("[CapacitorCalendar.\(#function)] Permission name is not defined")
            return
        }
        
        var permissionState: String
        switch EKEventStore.authorizationStatus(for: .event) {
        case .authorized, .fullAccess:
            permissionState = PermissionState.granted.rawValue
        case .denied, .restricted:
            permissionState = PermissionState.denied.rawValue
        case .notDetermined, .writeOnly:
            permissionState = PermissionState.prompt.rawValue
        @unknown default:
            call.reject("[CapacitorCalendar.\(#function)] Could not determine the status of the requested permission")
            return
        }
        call.resolve(["result": permissionState])
    }
    
    public func checkAllPermissions(_ call: CAPPluginCall) {
        switch EKEventStore.authorizationStatus(for: .event) {
        case .authorized, .fullAccess:
            call.resolve(["readCalendar": PermissionState.granted.rawValue])
        case .denied, .restricted:
            call.resolve(["readCalendar": PermissionState.denied.rawValue])
        case .notDetermined, .writeOnly:
            call.resolve(["readCalendar": PermissionState.prompt.rawValue])
        @unknown default:
            call.reject("[CapacitorCalendar.\(#function)] Could not determine the status of the requested permissions")
            return
        }
    }
    
    public func requestPermission(_ call: CAPPluginCall) {
        guard let permissionName = call.getString("alias") else {
            call.reject("[CapacitorCalendar.\(#function)] Permission name is not defined")
            return
        }
        
        switch permissionName {
        case "readCalendar":
            return requestReadAccessToEvents(call)
        default:
            call.reject("[CapacitorCalendar.\(#function)] Could not authorize \(permissionName)")
            return
        }
    }
    
    public func requestAllPermissions(_ call: CAPPluginCall) {
        return requestAllAccessToEvents(call)
        
    }
    
    private func requestReadAccessToEvents(_ call: CAPPluginCall) {
        if #available(iOS 17.0, *) {
            store.requestFullAccessToEvents { granted, error in
                if let error = error {
                    call.reject("[CapacitorCalendar.\(#function)] Could not authorize readCalendar")
                    return
                }
                call.resolve(["result": granted])
            }
        } else {
            store.requestAccess(to: .event) { granted, error in
                if let error = error {
                    call.reject("[CapacitorCalendar.\(#function)] Could not authorize readCalendar")
                    return
                }
                call.resolve(["result": granted])
            }
        }
    }
    
    private func requestAllAccessToEvents(_ call: CAPPluginCall) {
        if #available(iOS 17.0, *) {
            store.requestFullAccessToEvents { granted, error in
                if let error = error {
                    call.reject("[CapacitorCalendar.\(#function)] Could not authorize readCalendar and writeCalendar")
                    return
                }
                call.resolve(["readCalendar": granted])
            }
        } else {
            store.requestAccess(to: .event) { granted, error in
                if let error = error {
                    call.reject("[CapacitorCalendar.\(#function)] Could not authorize readCalendar and writeCalendar")
                    return
                }
                call.resolve(["readCalendar": granted])
            }
        }
    }
    
    public func eventEditViewController(
        _ controller: EKEventEditViewController,
        didCompleteWith action: EKEventEditViewAction
    ) {
        controller.dismiss(animated: true) {
            print(action)
            if action == .saved {
                self.eventCall?.resolve([
                    "result": CalendarEventActionResult.saved.rawValue
                ])
            } else if action == .canceled {
                self.eventCall?.resolve([
                    "result": CalendarEventActionResult.canceled.rawValue
                ])
            } else {
                self.eventCall?.resolve([
                    "result": CalendarEventActionResult.error.rawValue
                ])
            }
        }
    }
}
