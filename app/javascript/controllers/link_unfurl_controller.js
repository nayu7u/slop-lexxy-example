import LoggableController from "controllers/loggable_controller"

const KNOWN_DOMAINS = {
  "github.com": "GitHub",
  "basecamp.com": "Basecamp",
  "rubyonrails.org": "Ruby on Rails",
  "lexical.dev": "Lexical - Text Editor Framework",
}

export default class extends LoggableController {
  connect() {
    this.editor = this.element.querySelector("lexxy-editor")
    if (!this.editor) return

    this.editor.addEventListener("lexxy:insert-link", this.onInsertLink)
  }

  disconnect() {
    if (!this.editor) return
    this.editor.removeEventListener("lexxy:insert-link", this.onInsertLink)
  }

  onInsertLink = (event) => {
    const { url, replaceLinkWith } = event.detail
    this.logMessage(`lexxy:insert-link - URL pasted: ${url}`)

    const title = this.resolveTitle(url)
    if (title) {
      replaceLinkWith(
        `<a href="${url}" class="font-medium text-blue-600 hover:underline">${title}</a>`
      )
      this.logMessage(`  → Replaced with: "${title}"`)
    }
  }

  /**
   * Find the display title for a URL from known domain mappings
   * @param {string} url
   * @returns {string|null} The resolved title, or null if not matched
   */
  resolveTitle(url) {
    for (const [domain, title] of Object.entries(KNOWN_DOMAINS)) {
      if (url.includes(domain)) {
        return title
      }
    }
    return null
  }
}
