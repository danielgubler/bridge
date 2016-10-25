{
  let id = "card-center"
  class CardCenter extends HTMLElement {
    createdCallback(){
      this.innerHTML = document.customElementTemplates[id].innerHTML
      this._suitDisplay = this.querySelector(".suit-display")
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
      if (isNaN(this.number)) {
        // it's a royal, so display a center logo
        this._suitDisplay.hidden = false
        if (this.number == "ace") {
          this._suitDisplay.src = Card[`${this.suit}_${this.number}`].icon
        } else {
          this._suitDisplay.src = `/assets/images/${this.number}_of_${this.suit}.png`
        }
      } else {
        this._suitDisplay.hidden = true
      }
    }
  }

  document.customElementTemplates = document.customElementTemplates || {}
  document.customElementTemplates[id] = document.currentScript.ownerDocument.querySelector("template")
  document.registerElement(id, CardCenter)
}
