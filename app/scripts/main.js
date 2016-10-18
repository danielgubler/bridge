class App {
  static main() {

  }
}

// App.main() now gets called in the attached life-cycle method of the game-console element
document.addEventListener('HTMLImportsLoaded', function() {
  App.main()
})
