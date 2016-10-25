{
  let id = "playing-card"
  class PlayingCard extends HTMLElement {
    createdCallback(){
      this.innerHTML = document.customElementTemplates[id].innerHTML
      this._front = this.querySelector(".card-front")
      this._back = this.querySelector(".card-back")

      this._center = this.querySelector("card-center")
      this._tags = this.querySelectorAll("card-tag")
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

    get faceUp() { return this._faceUp }
    set faceUp(value) {
      this._faceUp = value
      this._update()
    }

    // setAttribute(attr, value) {
    //   super.setAttribute(attr, value)
    //   if (attr == "suit") { this.suit = value }
    //   else if (attr == "number") { this.number = value }
    //   else if (attr == "face-up") { this.faceUp = value == "true" }
    // }

    _update() {
      let faceUp = this.faceUp && this.number && this.suit

      if (faceUp) {
        [this._center, ...this._tags].forEach(e => {
          e.suit = this.suit
          e.number = this.number
        })
        this._front.classList.remove("hidden")
        this._back.classList.add("hidden")
      } else {
        this._front.classList.add("hidden")
        this._back.classList.remove("hidden")
      }
    }
  }

  document.customElementTemplates = document.customElementTemplates || {}
  document.customElementTemplates[id] = document.currentScript.ownerDocument.querySelector("template")
  document.registerElement(id, PlayingCard)
}
