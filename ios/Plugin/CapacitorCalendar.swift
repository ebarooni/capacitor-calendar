import Foundation
import Capacitor
import EventKitUI


public class CapacitorCalendar: NSObject, EKEventEditViewDelegate {
    private enum CalendarEventActionResult: String {
        case saved = "saved"
        case canceled = "canceled"
        case error = "error"
    }
    
    private let store = EKEventStore()
    private var eventCall: CAPPluginCall?
    
    public func createEventWithPrompt(_ call: CAPPluginCall, _ bridge: (any CAPBridgeProtocol)?) {
        guard let viewController = bridge?.viewController else {
            call.reject("\(#function) unable to retrieve view controller")
            return
        }
        
        self.eventCall = call
        let eventEditViewController = EKEventEditViewController()
        eventEditViewController.eventStore = store
        eventEditViewController.event = nil
        viewController.present(eventEditViewController, animated: true, completion: nil)
        eventEditViewController.editViewDelegate = self
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
