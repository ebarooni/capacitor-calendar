import Capacitor
import EventKit

struct DeleteEventWithPromptInput {
    private let id: String
    private let span: EKSpan
    private let title: String
    private let message: String
    private let confirmButtonText: String
    private let cancelButtonText: String

    init(call: CAPPluginCall) throws {
        guard let id = call.getString("id") else {
            throw PluginError.idMissing
        }
        self.id = id
        if let spanInt = call.getInt("span"), let span = EKSpan(rawValue: spanInt) {
            self.span = span
        } else {
            self.span = .thisEvent
        }
        guard let title = call.getString("title") else {
            throw PluginError.titleMissing
        }
        self.title = title
        guard let message = call.getString("message") else {
            throw PluginError.messageMissing
        }
        self.message = message
        self.confirmButtonText = call.getString("confirmButtonText", "Delete")
        self.cancelButtonText = call.getString("cancelButtonText", "Cancel")
    }

    func getId() -> String {
        return id
    }
    
    func getSpan() -> EKSpan {
        return span
    }
    
    func getTitle() -> String {
        return title
    }
    
    func getMessage() -> String {
        return message
    }
    
    func getConfirmButtonText() -> String {
        return confirmButtonText
    }
    
    func getCancelButtonText() -> String {
        return cancelButtonText
    }
}
