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
const resetEl = document.querySelector('#reset');

// Get the puzzle, instantiate the game and render a page.
const startGame = async (numberOfWordsInPuzzle, numberOfGuessesAllowed) => {
  puzzle = await getPuzzle(numberOfWordsInPuzzle);
  game = new Hangman(puzzle, numberOfWordsInPuzzle, numberOfGuessesAllowed);

  // Blank the guessed characters input before each game.
  guessedCharactersEl.value = '';

  // Reset the game status alert for new game
  gameStatusEl.textContent = `Status: ${game.statusMessage()}`;
  gameStatusEl.classList.add('mood-color', 'alert', 'alert-success');

  renderPuzzlePage();
  console.log('Game Started');
  console.log(`Puzzle: "${puzzle}"`);
};

startGame(numberOfWords, numberOfGuesses);

// Listen for user Guesses
window.addEventListener('keypress', (e) => {
  if (game.status === 'playing'){
    game.makeGuess(e.key);

    // If user presses the space key, then reset the game
    if (e.key === ' '){
       startGame(numberOfWords, numberOfGuesses);
    } else {
      guessedCharactersEl.value += e.key;
    }
    renderPuzzlePage();
  }
});

// Listen for the reset button
resetEl.addEventListener('click', () => {
  startGame(numberOfWords, numberOfGuesses);
});

// Listen for virtual keyboard press (ours)
const keyboard = document.querySelector('#keyboard');
keyboard.addEventListener('click', (e) => {
  if (game.status === 'playing'){
    const guess = e.target.innerText;
    if (game.makeGuess(guess)) {
      guessedCharactersEl.value += guess;
    };
    renderPuzzlePage();
  }
});

//////////////////////////////////////////////////////////////////////////
// End of app.js
//////////////////////////////////////////////////////////////////////////
