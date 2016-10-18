Polymer({
  is: 'bridge-hand',
  properties: {
    cards: Array,
    faceUp: Boolean
  },
  observers: [
    "_dealt(cards)",
    "_reveal(faceUp)"
  ],

  ready: function() {
    this._elementReady = true
    this._populate()
    this._dealt(this.cards)
  },

  _dealt: function(cards) {
    this._sort()
    this._populate()
  },

  _reveal: function(faceUp) {
    this._populate()
  },

  _populate: function() {
    if (!this._elementReady || !this.cards) { return }
    let display = d3.select(this).select(".cards-display")
    let list = display.selectAll("playing-card").data(this.cards)
    list.exit().remove()
    list.enter().append(() => {
      let card = document.createElement("playing-card")
      card.suit = "spades"
      card.number = "ace"
      card.faceUp = true
      return card
    })

    // list.attr("suit", c => c.suit)
    // list.attr("number", c => c.number)
    // list.attr("face-up", c => this.faceUp)
  },

  // _addCard(suit, number) {
  //   let card = document.createElement("playing-card")
  //   this.querySelector(".cards-display").append(card)
  //   card.suit = suit
  //   card.number = number
  //   card.faceUp = true
  // },

  _sort: function() {

  }
})
