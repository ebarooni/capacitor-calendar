import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorCalendarPlugin)
public class CapacitorCalendarPlugin: CAPPlugin {
    private let implementation = CapacitorCalendar()
    
    @objc public func createEventWithPrompt(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            return self.implementation.createEventWithPrompt(call, self.bridge)
        }
    }
}
