import Foundation

public enum PermissionState: String {
    case granted = "granted"
    case denied = "denied"
    case prompt = "prompt"
    case promptWithRationale = "prompt-with-rationale"
}
