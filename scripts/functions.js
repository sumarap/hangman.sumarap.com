const renderPuzzlePage = () =>  {
 
  // First, reset all screen elements to blank
  puzzleEl.textContent = '';
  guessedCharactersEl.textContent = '';
  guessesRemainingEl.textContent = '';
  gameStatusEl.textContent = '';

  // Display the puzzle with asterisks for letters not guessed yet.
  // puzzleEl.textContent = `Puzzle: "${game.getPuzzleWithAsterisks()}"`;

  // Create a span for each letter so we they can be easily spaced
  // Pass it the game instance and the div that we'll attach all the
  // span elements to (one for each letter in the puzzle).
  makePuzzleSpans(game, puzzleEl, '*');  

  // Display characters already guessed by the user
  guessedCharactersEl.focus();
  guessedCharactersEl.textContent = game.guesses;

  // Display guesses remaining
  // guessesRemainingEl.textContent = `Guesses left: ${game.numberOfGuessesRemaining}`;
  guessesRemainingEl.textContent = `Guesses left: ${game.numberOfGuessesRemaining}`;

  if (game.status === 'playing' ) {
    // Display game status (playing)
    gameStatusEl.textContent = `Status: ${game.statusMessage()}`;

  } else if (game.status === 'lost') {
    // Game over reveal the puzzle
    makePuzzleSpans(game, puzzleEl, '');  
    gameStatusEl.setAttribute('class', 'alert alert-danger');
    gameStatusEl.textContent = `GAME OVER: ${game.statusMessage()}`;

  } else if (game.status === 'won') {
    gameStatusEl.setAttribute('class', 'alert alert-success');
    gameStatusEl.textContent = `GAME OVER: ${game.statusMessage()}`;
  }
};

// Create a span element for each letter in the puzzle
// And append each of those spans to the puzzleEl that is 
// passed to makePuzzleSpans()
// 
// The third parameter indicates what to display for letters the user hasn't guessed yet.
// The '*' is used by default. If empty string is used '', the real puzzle letters
// will be displayed instead of '*'. This is used to display the REAL puzzle
// At the end of the game to show the user what the puzzle solution was if the
// user wasn't able to solve it.

const makePuzzleSpans = (game, puzzleEl, asterisk='*') => {
  // Remove existing div first
  puzzleEl.innerHTML = "";

  // Get the puzzle string, replacing letters the user hasn't guessed yet
  // with asterisks, or other character passed to this function.
  // If the user passes the null string '', the actual puzzle letters
  // will be used.
  const puzzleArray = game.getPuzzleWithAsterisks(asterisk).split('');

  // Loop through the puzzle array and create a span element for each
  // and append to the puzzleEl that was passed to makePuzzleSpans()
  let spanEl;
  puzzleArray.forEach((element) => {
    spanEl = document.createElement('span');
    spanEl.setAttribute('class', 'puzzleSpan');
    spanEl.textContent = element;
    puzzleEl.appendChild(spanEl);
  });
};
