{
  let id = "card-tag"
  class CardTag extends HTMLElement {
    createdCallback(){
      this.innerHTML = document.customElementTemplates[id].innerHTML
      this._numberDisplay = this.querySelector('.number-display')
      this._suitDisplay = this.querySelector('.suit-display')
    }

    get suit() { return this._suit }
    set suit(value) {
      this._suit = value
      this._update()
    }

    get number() { return this._number }
    set number(value) {
      this._number = value
      this._update()
    }

    // setAttribute(attr, value) {
    //   super.setAttribute(attr, value)
    //   if (attr == "suit") { this.suit = value }
    //   else if (attr == "number") { this.number = value }
    // }

    _update() {
      if (!this.suit || !this.number) { return }
      let text = this.number
      if (isNaN(text)) { text = text[0].toUpperCase() }
      this._numberDisplay.innerText = text
      this._suitDisplay.src = Card[`${this.suit}_${this.number}`].icon // `/assets/images/${this.suit}_icon.png` // Suit[this.suit].icon
    }
  }

  document.customElementTemplates = document.customElementTemplates || {}
  document.customElementTemplates[id] = document.currentScript.ownerDocument.querySelector("template")
  document.registerElement(id, CardTag)
}
