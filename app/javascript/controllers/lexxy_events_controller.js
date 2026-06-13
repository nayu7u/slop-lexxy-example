import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["log", "fileProgress", "fileInfo"]

  connect() {
    this.editor = this.element.querySelector("lexxy-editor")
    if (!this.editor) return

    this.editor.addEventListener("lexxy:initialize", this.#onInitialize)
    this.editor.addEventListener("lexxy:change", this.#onChange)
    this.editor.addEventListener("lexxy:focus", this.#onFocus)
    this.editor.addEventListener("lexxy:blur", this.#onBlur)
    this.editor.addEventListener("lexxy:upload-start", this.#onUploadStart)
    this.editor.addEventListener("lexxy:upload-progress", this.#onUploadProgress)
    this.editor.addEventListener("lexxy:upload-end", this.#onUploadEnd)
  }

  disconnect() {
    if (!this.editor) return
    this.editor.removeEventListener("lexxy:initialize", this.#onInitialize)
    this.editor.removeEventListener("lexxy:change", this.#onChange)
    this.editor.removeEventListener("lexxy:focus", this.#onFocus)
    this.editor.removeEventListener("lexxy:blur", this.#onBlur)
    this.editor.removeEventListener("lexxy:upload-start", this.#onUploadStart)
    this.editor.removeEventListener("lexxy:upload-progress", this.#onUploadProgress)
    this.editor.removeEventListener("lexxy:upload-end", this.#onUploadEnd)
  }

  #log(msg) {
    if (this.hasLogTarget) {
      const entry = document.createElement("div")
      entry.className = "text-xs font-mono text-gray-600 border-b border-gray-100 py-0.5"
      entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`
      this.logTarget.appendChild(entry)
      this.logTarget.scrollTop = this.logTarget.scrollHeight
    }
  }

  #onInitialize = () => this.#log("lexxy:initialize - editor ready")
  #onChange = () => this.#log("lexxy:change - content changed")
  #onFocus = () => this.#log("lexxy:focus - editor focused")
  #onBlur = () => this.#log("lexxy:blur - editor blurred")

  #onUploadStart = (e) => {
    this.#log(`lexxy:upload-start - uploading: ${e.detail.file.name}`)
    if (this.hasFileInfoTarget) {
      this.fileInfoTarget.textContent = `Uploading: ${e.detail.file.name}`
    }
    if (this.hasFileProgressTarget) {
      this.fileProgressTarget.value = 0
      this.fileProgressTarget.classList.remove("hidden")
    }
  }

  #onUploadProgress = (e) => {
    this.#log(`lexxy:upload-progress - ${e.detail.progress}%`)
    if (this.hasFileProgressTarget) {
      this.fileProgressTarget.value = e.detail.progress
    }
  }

  #onUploadEnd = (e) => {
    if (e.detail.error) {
      this.#log(`lexxy:upload-end - ERROR: ${e.detail.error}`)
      if (this.hasFileInfoTarget) {
        this.fileInfoTarget.textContent = `Upload failed: ${e.detail.error}`
      }
    } else {
      this.#log("lexxy:upload-end - upload complete")
      if (this.hasFileInfoTarget) {
        this.fileInfoTarget.textContent = "Upload complete!"
      }
    }
    if (this.hasFileProgressTarget) {
      setTimeout(() => this.fileProgressTarget.classList.add("hidden"), 2000)
    }
  }
}
