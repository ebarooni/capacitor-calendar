import EventKitUI

enum EventEditAction: String {
    case canceled = "canceled"
    case saved = "saved"
    case deleted = "deleted"

    static func from(_ action: EKEventEditViewAction) throws -> EventEditAction {
        switch action {
        case .canceled, .cancelled:
            return .canceled
        case .saved:
            return .saved
        case .deleted:
            return .deleted
        @unknown default:
            throw PluginError.processFailed
        }
    }
}
