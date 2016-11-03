{
  let id = "info-bar"
  class InfoBar extends HTMLElement {
    createdCallback(){
      this.innerHTML = document.customElementTemplates[id].innerHTML
      this._trumpDisplay = this.querySelector("trump-display")
    }

    get trump() { return this._trump }
    set trump(value) {
      this._trump = value
      this._trumpDisplay.trump = this._trump
    }
  }

  document.customElementTemplates = document.customElementTemplates || {}
  document.customElementTemplates[id] = document.currentScript.ownerDocument.querySelector("template")
  document.registerElement(id, InfoBar)
}
