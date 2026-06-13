import "@hotwired/turbo-rails"
import "controllers"
import "@rails/activestorage"
import * as Lexxy from "lexxy"

Lexxy.configure({
  simple: {
    toolbar: false
  },
  minimal: {
    toolbar: {
      upload: false
    }
  },
  textonly: {
    richText: false,
    toolbar: false
  },
  singleline: {
    multiLine: false
  },
  nomarkdown: {
    markdown: false
  },
  code: {
    highlight: {
      buttons: {
        color: ["red", "blue", "green", "rgb(100, 100, 255)"],
        "background-color": ["yellow", "pink", "lightblue", "rgba(0, 255, 0, 0.3)"]
      }
    }
  }
})
