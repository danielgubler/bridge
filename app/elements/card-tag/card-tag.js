Polymer({
  is: 'card-tag',
  properties: {
    suit: String,
    number: String,
    faceUp: Boolean
  },
  observers: [ 'valueChanged(suit, number)' ],

  ready: function() {
    this._numberDisplay = this.querySelector('.number-display')
    this._suitDisplay = this.querySelector('.suit-display')
  },

  valueChanged: function(suit, number) {
    if (!suit || !number) { return }
    this._populate()
  },

  _populate: function() {
    let text = this.number
    if (isNaN(text)) { text = text[0].toUpperCase() }
    this._numberDisplay.innerText = text
    this._suitDisplay.src = `/assets/images/${this.suit}_icon.png` // Suit[this.suit].icon
  }
})
