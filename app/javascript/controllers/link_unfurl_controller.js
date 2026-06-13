import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["log"]

  connect() {
    this.editor = this.element.querySelector("lexxy-editor")
    if (!this.editor) return

    this.editor.addEventListener("lexxy:insert-link", this.#onInsertLink)
  }

  disconnect() {
    if (!this.editor) return
    this.editor.removeEventListener("lexxy:insert-link", this.#onInsertLink)
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

  #onInsertLink = (event) => {
    const url = event.detail.url
    this.#log(`lexxy:insert-link - URL pasted: ${url}`)

    const metadata = this.#getLinkMetadata(url)
    if (metadata) {
      event.detail.replaceLinkWith(
        `<a href="${url}" class="font-medium text-blue-600 hover:underline">${metadata.title}</a>`
      )
      this.#log(`  → Replaced with: "${metadata.title}"`)
    }
  }

  #getLinkMetadata(url) {
    const known = {
      "github.com": { title: "GitHub" },
      "basecamp.com": { title: "Basecamp" },
      "rubyonrails.org": { title: "Ruby on Rails" },
      "lexical.dev": { title: "Lexical - Text Editor Framework" },
    }

    for (const [domain, meta] of Object.entries(known)) {
      if (url.includes(domain)) {
        return meta
      }
    }
    return null
  }
}
