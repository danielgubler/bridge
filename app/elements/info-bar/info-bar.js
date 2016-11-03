{
  let id = "info-bar"
  class InfoBar extends HTMLElement {
    createdCallback(){
      this.innerHTML = document.customElementTemplates[id].innerHTML
      this._trumpDisplay = this.querySelector("trump-display")
      this._biddingTray = this.querySelector("bidding-tray")
      EventBus.listen("bid_selected", this, "bidSelected")
      this.trump = "nt"
    }

    get trump() { return this._trump }
    set trump(value) {
      this._trump = value
      this._trumpDisplay.trump = this._trump
    }

    bidSelected(bid) {
      this.trump = bid.split("_")[1]
      this._biddingTray.currentBid = bid
    }
  }

  document.customElementTemplates = document.customElementTemplates || {}
  document.customElementTemplates[id] = document.currentScript.ownerDocument.querySelector("template")
  document.registerElement(id, InfoBar)
}
