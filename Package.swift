// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "EbarooniCapacitorCalendar",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "EbarooniCapacitorCalendar",
            targets: ["CapacitorCalendarPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "CapacitorCalendarPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/CapacitorCalendarPlugin"),
        .testTarget(
            name: "CapacitorCalendarPluginTests",
            dependencies: ["CapacitorCalendarPlugin"],
            path: "ios/Tests/CapacitorCalendarPluginTests")
    ]
)
