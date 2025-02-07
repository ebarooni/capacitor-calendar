import Foundation

struct PluginHelper {
    static func dateFromTimestamp(_ timestamp: Double) -> Date {
        return Date(timeIntervalSince1970: timestamp / 1000)
    }
}
