//
//  ColorParser.swift
//  Plugin
//
//  Created by Ehsan Barooni on 03.05.24.
//  Copyright © 2024 Max Lynch. All rights reserved.
//

import Foundation
import CoreGraphics

public class ColorParser {
    public static func hexStringToCGColor(hex: String) throws -> CGColor {
        let r, g, b, a: CGFloat
        let start = hex.hasPrefix("#") ? hex.index(hex.startIndex, offsetBy: 1) : hex.startIndex
        let hexColor = String(hex[start...])

        if hexColor.count == 6 {
            let scanner = Scanner(string: hexColor)
            var hexNumber: UInt64 = 0

            if scanner.scanHexInt64(&hexNumber) {
                r = CGFloat((hexNumber & 0xff0000) >> 16) / 255
                g = CGFloat((hexNumber & 0x00ff00) >> 8) / 255
                b = CGFloat(hexNumber & 0x0000ff) / 255
                a = 1.0

                return CGColor(red: r, green: g, blue: b, alpha: a)
            }
        } else if hexColor.count == 8 {
            let scanner = Scanner(string: hexColor)
            var hexNumber: UInt64 = 0

            if scanner.scanHexInt64(&hexNumber) {
                r = CGFloat((hexNumber & 0xff000000) >> 24) / 255
                g = CGFloat((hexNumber & 0x00ff0000) >> 16) / 255
                b = CGFloat((hexNumber & 0x0000ff00) >> 8) / 255
                a = CGFloat(hexNumber & 0x000000ff) / 255

                return CGColor(red: r, green: g, blue: b, alpha: a)
            }
        }

        throw CapacitorCalendarPluginError.unableToParseColor
    }
}
