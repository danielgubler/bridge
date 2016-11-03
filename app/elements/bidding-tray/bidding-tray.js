{
  let SuitValues = {
    nt: 4,
    spades: 3,
    hearts: 2,
    diamonds: 1,
    clubs: 0
  }

  let SuitsByIndex = {
    0: "nt",
    1: "spades",
    2: "hearts",
    3: "diamonds",
    4: "clubs"
  }

  let id = "bidding-tray"
  class ElementName extends HTMLElement {
    createdCallback(){
      this.innerHTML = document.customElementTemplates[id].innerHTML
      this._suits = this.querySelector('.suits')
      this._update()
    }

    get currentBidLevel() { return this._currentBidLevel }
    get currentBidSuit() { return this._currentBidSuit }

    get currentBid() {
      if (!this.currentBidLevel || !this.currentBidSuit) { return null }
      return `${this.currentBidLevel}_${this.currentBidSuit}`
    }

    set currentBid(value) {
      let values = value.split('_')
      this._currentBidLevel = Number(values[0])
      this._currentBidSuit = values[1]
      this._update()
    }

    _update() {
      let rows = d3.select(this._suits).selectAll('.row').data(new Array(7))
      rows.enter().append(() => { return this._createRow() })

      rows.each((_, rowIndex) => {
        let row = rows[0][rowIndex]
        let tags = d3.select(row).selectAll('.bid-tag').data(new Array(5))
        tags.enter().append(() => { return this._createTag() })

        let level = rowIndex + 1
        tags.each((_, tagIndex) => {
          let tag = tags[0][tagIndex]
          let suit = SuitsByIndex[tagIndex]

          let used = this.currentBid && (this.currentBidLevel > level || (this.currentBidLevel == level && SuitValues[this.currentBidSuit] >= SuitValues[suit]))
          let classed = used ? "remove" : "add"
          tag.querySelector(".overlay").classList[classed]("hidden")
          used ? tag.classList.add("used-tag") : tag.classList.remove("used-tag")

          let img = tag.querySelector('img')
          let number = tag.querySelector('.number')
          if (suit == "nt") {
            img.classList.add("hidden")
            number.innerText = `${level} NT`
            number.style.marginRight = "auto"
          } else {
            number.innerText = level
            img.classList.remove("hidden")
            img.src = `/assets/images/${suit}_icon.png`
          }

          tag.onclick = () => {
            EventBus.fire("bid_selected", `${level}_${suit}`)
          }

          tag.style.zIndex = SuitValues[suit] + 1
        })
      })
    }

    _createRow() {
      let row = document.createElement("div")
      row.classList.add("row")
      return row
    }

    _createTag() {
      let tag = document.createElement("div")
      tag.classList.add("bid-tag")

      let number = document.createElement("div")
      number.classList.add("number")
      tag.append(number)

      tag.append(document.createElement("img"))

      let overlay = document.createElement("div")
      overlay.classList.add("overlay")
      tag.append(overlay)

      return tag
    }
  }

  document.customElementTemplates = document.customElementTemplates || {}
  document.customElementTemplates[id] = document.currentScript.ownerDocument.querySelector("template")
  document.registerElement(id, ElementName)
}
