{
  let id = "trump-display"
  class ElementName extends HTMLElement {
    createdCallback(){
      this.innerHTML = document.customElementTemplates[id].innerHTML
      this._img = this.querySelector(".trump-img")
      this._noTrump = this.querySelector(".no-trump")
    }

    get trump() { return this._trump }
    set trump(value) {
      this._trump = value
      this._update()
    }

    _update() {
      if (this.trump == "nt") {
        this._noTrump.classList.remove("hidden")
        this._img.classList.add("hidden")
      } else {
        this._noTrump.classList.add("hidden")
        this._img.classList.remove("hidden")
        this._img.src = `/assets/images/${this.trump}_icon.png`
      }
    }
  }

  document.customElementTemplates = document.customElementTemplates || {}
  document.customElementTemplates[id] = document.currentScript.ownerDocument.querySelector("template")
  document.registerElement(id, ElementName)
}
