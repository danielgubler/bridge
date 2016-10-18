Polymer({
  is: "playing-card",
  properties: {
    suit: String,
    number: String,
    faceUp: Boolean
    // faceUp: {
    //   type: Boolean,
    //   notify: true,
    //   reflectToAttribute: true
    // }
  },
  observers: [
    "_valueChanged(suit, number)",
    "_flipped(faceUp)"
  ],

  ready: function() {
    this._front = this.querySelector(".card-front")
    this._back = this.querySelector(".card-back")

    this._center = this.querySelector('card-center')
    this._tags = this.querySelectorAll('card-tag')
    this._elementReady = true
    this._populate()
  },

  _valueChanged: function(suit, number) {

    this._populate()
  },

  _flipped(faceUp) {
    this._populate()
  },

  _populate: function() {
    if (!this._elementReady) { return }

    this._front.hidden = !this.faceUp
    this._back.hidden = this.faceUp

    if (this.faceUp) {
      if (!this.suit || !this.number) { return }

      [this._center, ...this._tags].forEach(e => {
        e.suit = this.suit
        e.number = this.number
      })
    }
  }
})
