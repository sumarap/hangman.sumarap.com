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
let numberOfWords = 3 // Number of puzzle words to fetch at a time.
let numberOfGuesses = 10

// Sometimes our getPuzzle function takes up to four seconds to get a word.
// Its waiting for the call to our words.sumarap.com API to return a word.
// Instead, we'll pull multiple words at a time and store them in an array.
// After we pop the last word in our array, we get another few words. The user
// is playing the game and there is now place for the user to notice the delay,
// so to the user the reset button quickly causes a new word to be set
let puzzleArr = [] // Holds array of puzzles
let puzzle = 'Hangman' // 'splash' screen displays when the app first starts

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
