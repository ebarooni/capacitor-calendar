import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorCalendarPlugin)
public class CapacitorCalendarPlugin: CAPPlugin {
    private lazy var implementation = CapacitorCalendar(bridge: self.bridge)
    
    @objc public func checkPermission(_ call: CAPPluginCall) {
        return implementation.checkPermission(call)
    }
    
    @objc public func checkAllPermissions(_ call: CAPPluginCall) {
        return implementation.checkAllPermissions(call)
    }
    
    @objc public func requestPermission(_ call: CAPPluginCall) {
        return implementation.requestPermission(call)
    }
    
    @objc public func requestAllPermissions(_ call: CAPPluginCall) {
        return implementation.requestAllPermissions(call)
    }
    
    @objc public func createEventWithPrompt(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            return self.implementation.createEventWithPrompt(call)
        }
    }
    
    @objc public func selectCalendarsWithPrompt(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            return self.implementation.selectCalendarsWithPrompt(call)
        }
    }
}
