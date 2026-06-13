import { Controller } from "@hotwired/stimulus"

/**
 * Base controller that provides common logging functionality.
 * Extend this class to get automatic log target management.
 */
export default class extends Controller {
  static targets = ["log"]

  logMessage(msg) {
    if (!this.hasLogTarget) return

    const entry = document.createElement("div")
    entry.className = "text-xs font-mono text-gray-600 border-b border-gray-100 py-0.5"
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`
    this.logTarget.appendChild(entry)
    this.logTarget.scrollTop = this.logTarget.scrollHeight
  }
}
