import EventKitUI
import Capacitor

struct ModifyEventWithPromptResult: JSResult {
    let action: EventEditAction
    
    init(action: EKEventEditViewAction) throws {
        self.action = try EventEditAction.from(action)
    }
    
    func toJSON() -> JSObject {
        var result = JSObject()
        result["result"] = action.rawValue
        return result
    }
}
