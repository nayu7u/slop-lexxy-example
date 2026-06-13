import LoggableController from "controllers/loggable_controller"

export default class extends LoggableController {
  static targets = ["fileProgress", "fileInfo"]

  connect() {
    this.editor = this.element.querySelector("lexxy-editor")
    if (!this.editor) return

    this.eventHandlers = {
      "lexxy:initialize": this.onInitialize,
      "lexxy:change": this.onChange,
      "lexxy:focus": this.onFocus,
      "lexxy:blur": this.onBlur,
      "lexxy:upload-start": this.onUploadStart,
      "lexxy:upload-progress": this.onUploadProgress,
      "lexxy:upload-end": this.onUploadEnd,
    }

    for (const [event, handler] of Object.entries(this.eventHandlers)) {
      this.editor.addEventListener(event, handler)
    }
  }

  disconnect() {
    if (!this.editor) return

    for (const [event, handler] of Object.entries(this.eventHandlers)) {
      this.editor.removeEventListener(event, handler)
    }
  }

  onInitialize = () => this.logMessage("lexxy:initialize - editor ready")
  onChange = () => this.logMessage("lexxy:change - content changed")
  onFocus = () => this.logMessage("lexxy:focus - editor focused")
  onBlur = () => this.logMessage("lexxy:blur - editor blurred")

  onUploadStart = (e) => {
    this.logMessage(`lexxy:upload-start - uploading: ${e.detail.file.name}`)

    if (this.hasFileInfoTarget) {
      this.fileInfoTarget.textContent = `Uploading: ${e.detail.file.name}`
    }
    if (this.hasFileProgressTarget) {
      this.fileProgressTarget.value = 0
      this.fileProgressTarget.classList.remove("hidden")
    }
  }

  onUploadProgress = (e) => {
    this.logMessage(`lexxy:upload-progress - ${e.detail.progress}%`)
    if (this.hasFileProgressTarget) {
      this.fileProgressTarget.value = e.detail.progress
    }
  }

  onUploadEnd = (e) => {
    if (e.detail.error) {
      this.logMessage(`lexxy:upload-end - ERROR: ${e.detail.error}`)
      if (this.hasFileInfoTarget) {
        this.fileInfoTarget.textContent = `Upload failed: ${e.detail.error}`
      }
    } else {
      this.logMessage("lexxy:upload-end - upload complete")
      if (this.hasFileInfoTarget) {
        this.fileInfoTarget.textContent = "Upload complete!"
      }
    }
    if (this.hasFileProgressTarget) {
      setTimeout(() => this.fileProgressTarget.classList.add("hidden"), 2000)
    }
  }
}
