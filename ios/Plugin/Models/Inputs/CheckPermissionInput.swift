import Capacitor

struct CheckPermissionInput {
    private let scope: CalendarPermissionScope

    init(call: CAPPluginCall) throws {
        guard let rawScope = call.getString("scope") else {
            throw PluginError.scopeMissing
        }
        guard let scope = CalendarPermissionScope(rawValue: rawScope) else {
            throw PluginError.invalidScope
        }
        self.scope = scope
    }

    func getScope() -> CalendarPermissionScope {
        return scope
    }
}
