////////////////////////////////////////////////////////////////////////////
// Hangman Game
////////////////////////////////////////////////////////////////////////////
// 
// Keith Peterson
// October 2018
//
////////////////////////////////////////////////////////////////////////////

// Assign game values
let game;
let numberOfWords = 1;
let numberOfGuesses = 10;

// Configure html elements
const puzzleEl = document.querySelector('#puzzle');
const guessedCharactersEl = document.querySelector('#guessed-characters');
const guessesRemainingEl = document.querySelector('#guesses-remaining');
const gameStatusEl = document.querySelector('#game-status');

const startGame = async (numberOfWordsInPuzzle, numberOfGuessesAllowed) => {
  puzzle = await getPuzzle(numberOfWordsInPuzzle);
  game = new Hangman(puzzle, numberOfWordsInPuzzle, numberOfGuessesAllowed);
  renderPuzzlePage();
  console.log('Game Started');
  console.log(`Puzzle: "${puzzle}"`);
};

startGame(numberOfWords, numberOfGuesses);

// Listen for user Guesses
window.addEventListener('keypress', (e) => {
  if (game.status === 'playing'){
    game.makeGuess(e.key);
    renderPuzzlePage();
  }
});

// Listen for the reset button
const resetEl = document.querySelector('#reset');
resetEl.addEventListener('click', () => {
  startGame(numberOfWords, numberOfGuesses);
});

//////////////////////////////////////////////////////////////////////////
// End of app.js
//////////////////////////////////////////////////////////////////////////


