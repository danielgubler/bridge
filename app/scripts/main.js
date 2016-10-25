class App {
  static main() {
    let deck = new Deck()
    deck.shuffle()
    let hand = document.querySelector("#your-hand")
    let leftHand = document.querySelector("#opponent-left-hand")
    let rightHand = document.querySelector("#opponent-right-hand")
    let partner = document.querySelector("#partner-hand")

    hand.faceUp = true
    partner.faceUp = true

    hand.cards = deck.deal(13)
    leftHand.cards = deck.deal(13)
    rightHand.cards = deck.deal(13)
    partner.cards = deck.deal(13)
  }
}

// App.main() now gets called in the attached life-cycle method of the game-console element
document.addEventListener('HTMLImportsLoaded', function() {
  App.main()
})
