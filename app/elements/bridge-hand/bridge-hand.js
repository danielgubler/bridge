{
  let id = "bridge-hand"
  class BridgeHand extends HTMLElement {
    createdCallback(){
      this.innerHTML = document.customElementTemplates[id].innerHTML
      this._cardsDisplay = d3.select(this.querySelector(".cards-display"))
    }

    get cards() { return this._cards || [] }
    set cards(value) {
      this._cards = value || []
      this._update()
    }

    get faceUp() { return this._faceUp }
    set faceUp(value) {
      this._faceUp = value
      this._update()
    }

    _update() {
      let list = this._cardsDisplay.selectAll("playing-card").data(this.cards)
      list.exit().remove()
      list.enter().append(() => document.createElement("playing-card"))

      list.each((data, idx) => {
        let card = list[0][idx]
        card.suit = data.suit
        card.number = data.number
        card.faceUp = this.faceUp
        card.style.left = (25*idx) + "px"
        card.style.zIndex = idx + 1
      })
    }
  }

  document.customElementTemplates = document.customElementTemplates || {}
  document.customElementTemplates[id] = document.currentScript.ownerDocument.querySelector("template")
  document.registerElement(id, BridgeHand)
}
