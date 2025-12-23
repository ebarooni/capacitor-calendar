import Capacitor
import EventKitUI

struct SelectCalendarsWithPromptInput {
    private let displayStyle: EKCalendarChooserDisplayStyle
    private let selectionStyle: EKCalendarChooserSelectionStyle

    init(call: CAPPluginCall) {
        if let rawDisplayStyle = call.getInt("displayStyle") as Int?, let displayStyle = EKCalendarChooserDisplayStyle(rawValue: rawDisplayStyle) {
            self.displayStyle = displayStyle
        } else {
            self.displayStyle = .allCalendars
        }
        if let multiple = call.getBool("multiple") {
            if multiple {
                self.selectionStyle = .multiple
            } else {
                self.selectionStyle = .single
            }
        } else {
            self.selectionStyle = .single
        }
    }

    func getDisplayStyle() -> EKCalendarChooserDisplayStyle {
        return displayStyle
    }

    func getSelectionStyle() -> EKCalendarChooserSelectionStyle {
        return selectionStyle
    }
}
