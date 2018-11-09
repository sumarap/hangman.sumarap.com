////////////////////////////////////////////////////////////////////////////
// Hangman Game
////////////////////////////////////////////////////////////////////////////
//
// Keith Peterson
// October 2018
//
////////////////////////////////////////////////////////////////////////////

// Assign game values
let game
let numberOfWords = 1
let numberOfGuesses = 10
let puzzle = 'Hangman'

// Configure html elements
const puzzleEl = document.querySelector('#puzzle')
const guessedCharactersEl = document.querySelector('#guessed-characters')
const guessesRemainingEl = document.querySelector('#guesses-remaining')
const gameStatusEl = document.querySelector('#game-status')
const resetEl = document.querySelector('#reset')

startGame(numberOfWords, numberOfGuesses)

// Listen for user using a real keyboard
window.addEventListener('keypress', e => {
  // Reset the game
  if (e.key === ' ') {
    startGame(numberOfWords, numberOfGuesses)
    return
  }
  processKeyClick(e)
})

// Listen for the reset button
resetEl.addEventListener('click', () => {
  startGame(numberOfWords, numberOfGuesses)
})

// Make an array of all the (virtual) keys...
const keys = document.querySelectorAll('.key')

// ... Add event listener for each virtual key
keys.forEach(function(elem) {
  elem.addEventListener('click', processKeyClick)
})

//////////////////////////////////////////////////////////////////////////
// End of app.js
//////////////////////////////////////////////////////////////////////////
