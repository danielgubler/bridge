{
  let suitOrder = {
    diamonds: 1,
    clubs: 2,
    hearts: 3,
    spades: 4
  }

  let numberOrder = {
    jack: 11,
    queen: 12,
    king: 13,
    ace: 14
  }

  let id = "bridge-hand"
  class BridgeHand extends HTMLElement {
    createdCallback(){
      this.innerHTML = document.customElementTemplates[id].innerHTML
      this._cardsDisplay = d3.select(this.querySelector(".cards-display"))
    }

    get cards() { return this._cards || [] }
    set cards(value) {
      this._cards = value || []
      this._sort()
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
        card.style.marginLeft = idx == 0 ? "0px" : "-75px"
      })
    }

    _sort() {
      this.cards.sort((a, b) => {
        // sort by suit
        if (suitOrder[a.suit] > suitOrder[b.suit]) { return -1 }
        if (suitOrder[a.suit] < suitOrder[b.suit]) { return 1 }

        // else sort by number
        let aNumber = isNaN(a.number) ? numberOrder[a.number] : Number(a.number)
        let bNumber = isNaN(b.number) ? numberOrder[b.number] : Number(b.number)
        return aNumber > bNumber ? -1 : (aNumber == bNumber ? 0 : 1)
      })
    }
  }

  document.customElementTemplates = document.customElementTemplates || {}
  document.customElementTemplates[id] = document.currentScript.ownerDocument.querySelector("template")
  document.registerElement(id, BridgeHand)
}
