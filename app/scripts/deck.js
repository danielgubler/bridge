let Card = new Enum([
  "spades_ace",
  "spades_2",
  "spades_3",
  "spades_4",
  "spades_5",
  "spades_6",
  "spades_7",
  "spades_8",
  "spades_9",
  "spades_10",
  "spades_jack",
  "spades_queen",
  "spades_king",
  "hearts_ace",
  "hearts_2",
  "hearts_3",
  "hearts_4",
  "hearts_5",
  "hearts_6",
  "hearts_7",
  "hearts_8",
  "hearts_9",
  "hearts_10",
  "hearts_jack",
  "hearts_queen",
  "hearts_king",
  "diamonds_ace",
  "diamonds_2",
  "diamonds_3",
  "diamonds_4",
  "diamonds_5",
  "diamonds_6",
  "diamonds_7",
  "diamonds_8",
  "diamonds_9",
  "diamonds_10",
  "diamonds_jack",
  "diamonds_queen",
  "diamonds_king",
  "clubs_ace",
  "clubs_2",
  "clubs_3",
  "clubs_4",
  "clubs_5",
  "clubs_6",
  "clubs_7",
  "clubs_8",
  "clubs_9",
  "clubs_10",
  "clubs_jack",
  "clubs_queen",
  "clubs_king",
], {
  number: function() { return this.name.split("_")[1] },
  suit: function() { return this.name.split("_")[0] },
  icon: function() { return `/assets/images/${this.suit}_icon.png` }
})

class Deck {
  constructor() {
    this._cards = Card.keys
  }

  shuffle() {
    for (let i = 0; i < this._cards.length; i++) {
      var newIndex = Math.floor(Math.random() * this._cards.length)
      let swapped = this._cards[i]
      this._cards[i] = this._cards[newIndex]
      this._cards[newIndex] = swapped

      // not sure why this doesn't work
      // [this._cards[i], this._cards[newIndex]] = [this._cards[newIndex], this._cards[i]]
    }
  }

  deal(number = 0) {
    return this._cards.splice(0 - number).map(c => Card[c])
  }
}

window.Card = Card
window.Deck = Deck
