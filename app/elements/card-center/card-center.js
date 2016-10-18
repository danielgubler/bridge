Polymer({
  is: "card-center",
  properties: {
    suit: String,
    number: String
  },
  observers: [ "_changed(suit, number)" ],

  ready: function() {
    this._suitDisplay = this.querySelector(".suit-display")
    this._elementReady = true
  },

  _changed: function(suit, number) {
    if (!suit || !number || !this._elementReady) { return }
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
})
