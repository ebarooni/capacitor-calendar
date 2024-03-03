//
//  PermissionState.swift
//  Plugin
//
//  Created by Ehsan Barooni on 28.02.24.
//  Copyright © 2024 Max Lynch. All rights reserved.
//

import Foundation

public enum PermissionState: String {
    case granted = "granted"
    case denied = "denied"
    case prompt = "prompt"
    case promptWithRationale = "prompt-with-rationale"
}
