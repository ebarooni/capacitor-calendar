import UIKit

extension UIColor {
    static func fromHex(_ hex: String) throws -> UIColor {
        var cleanedHex = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()

        if cleanedHex.hasPrefix("#") {
            cleanedHex.removeFirst()
        }

        guard cleanedHex.count == 6 || cleanedHex.count == 8 else { throw PluginError.invalidColor }

        var rgbValue: UInt64 = 0
        Scanner(string: cleanedHex).scanHexInt64(&rgbValue)

        if cleanedHex.count == 6 {
            return UIColor(
                red: CGFloat((rgbValue >> 16) & 0xFF) / 255.0,
                green: CGFloat((rgbValue >> 8) & 0xFF) / 255.0,
                blue: CGFloat(rgbValue & 0xFF) / 255.0,
                alpha: 1.0
            )
        } else {
            return UIColor(
                red: CGFloat((rgbValue >> 24) & 0xFF) / 255.0,
                green: CGFloat((rgbValue >> 16) & 0xFF) / 255.0,
                blue: CGFloat((rgbValue >> 8) & 0xFF) / 255.0,
                alpha: CGFloat(rgbValue & 0xFF) / 255.0
            )
        }
    }
}
