package dev.barooni.capacitor.calendar.models.templates

/**
 * Completion handler matching the `(Result?, Error?) -> Void` pattern.
 *
 * Call with a result and `null` error on success, or `null` result and an error on failure.
 */
typealias PluginCompletion<T> = (T?, Exception?) -> Unit
