const renderPuzzlePage = () => {
  // First, reset all screen elements to blank
  puzzleEl.textContent = ''
  guessedCharactersEl.textContent = ''
  guessesRemainingEl.textContent = ''
  gameStatusEl.textContent = ''

  // Display the puzzle with asterisks for letters not guessed yet.
  // puzzleEl.textContent = `Puzzle: "${game.getPuzzleWithAsterisks()}"`;

  // Create a span for each letter so we they can be easily spaced
  // Pass it the game instance and the div that we'll attach all the
  // span elements to (one for each letter in the puzzle).
  makePuzzleSpans(game, puzzleEl, '*')

  // Display characters already guessed by the user
  guessedCharactersEl.focus()
  guessedCharactersEl.textContent = game.guesses

  // Set the text and colors to reflect the current game status
  setGameStatusData(game)
}

// Create a span element for each letter in the puzzle
// And append each of those spans to the puzzleEl that is
// passed to makePuzzleSpans()
//
// The third parameter indicates what to display for letters the user hasn't guessed yet.
// The '*' is used by default. If empty string is used '', the real puzzle letters
// will be displayed instead of '*'. This is used to display the REAL puzzle
// At the end of the game to show the user what the puzzle solution was if the
// user wasn't able to solve it.

const makePuzzleSpans = (game, puzzleEl, asterisk = '*') => {
  // Remove existing div first
  puzzleEl.innerHTML = ''

  // Get the puzzle string, replacing letters the user hasn't guessed yet
  // with asterisks, or other character passed to this function.
  // If the user passes the null string '', the actual puzzle letters
  // will be used.
  const puzzleArray = game.getPuzzleWithAsterisks(asterisk).split('')
  // Loop through the puzzle array and create a span element for each
  // and append to the puzzleEl that was passed to makePuzzleSpans()
  let spanEl
  puzzleArray.forEach(element => {
    spanEl = document.createElement('span')
    spanEl.classList.add('puzzleSpan')
    spanEl.textContent = element
    puzzleEl.appendChild(spanEl)
  })
}

// When a user clicks a virtual key make a guess
const processKeyClick = e => {
  let key

  // If this is a user keypress (real keyboard)
  if (e.type === 'keypress') {
    key = e.key
  } else {
    // The user pressed one of our virtual keys
    key = e.target.innerText
  }

  if (game.status === 'playing') {
    //const guess = e.target.innerText
    const guess = key

    // Only increase guessedCharactersEl if this is a new (and valid) guess
    if (game.makeGuess(guess)) {
      guessedCharactersEl.value += guess
    }
    renderPuzzlePage()
  }
}

// Get the puzzle, instantiate the game and render a page.
const startGame = async (numberOfWordsInPuzzle, numberOfGuessesAllowed) => {
  // Blank the guessed characters input before each game.
  guessedCharactersEl.value = ''

  if (puzzle === 'Hangman') {
    game = new Hangman(puzzle, numberOfWordsInPuzzle, numberOfGuessesAllowed)
    setGameStatusData(game) // Screen colors and game messages
    splashScreen(puzzleEl, puzzle)
  }
  game = new Hangman(puzzle, numberOfWordsInPuzzle, numberOfGuessesAllowed)
  setGameStatusData(game) // Screen colors and game messages
  puzzle = await getPuzzle(numberOfWordsInPuzzle)
  game.puzzle = puzzle
  renderPuzzlePage()
  console.log('Game Started')
  console.log(`Puzzle: "${puzzle}"`)
}

// Set the text and colors to reflect the current game status
const setGameStatusData = game => {
  if (game.status === 'playing') {
    // Change the background color to 'playing' color
    // We'll change it again when the user wins or loses.
    gameStatusEl.classList.add('play-color', 'alert', 'alert-success')
    $('.play-color').css('background-color', '#8cbbd3')

    // Display game status (playing)
    gameStatusEl.textContent = `Status: ${game.statusMessage()}`
  } else if (game.status === 'lost') {
    // Game over reveal the puzzle
    makePuzzleSpans(game, puzzleEl, '')

    // Change the colors of elements to 'red' for loser
    $('.play-color').css('background-color', '#dd3140')
    gameStatusEl.textContent = `GAME OVER: ${game.statusMessage()}`
  } else if (game.status === 'won') {
    // Change the colors of elements to 'green' for winner
    $('.play-color').css('background-color', '#63ce63')
    gameStatusEl.textContent = `GAME OVER: ${game.statusMessage()}`
  }
  guessesRemainingEl.textContent = `Guesses left: ${
    game.numberOfGuessesRemaining
  }`
}

const splashScreen = (puzzleEl, title) => {
  // Remove existing div first
  puzzleEl.innerHTML = ''

  const puzzleArray = title.split('')
  // Loop through the puzzle array and create a span element for each
  // and append to the puzzleEl that was passed to makePuzzleSpans()
  let spanEl
  puzzleArray.forEach(element => {
    spanEl = document.createElement('span')
    spanEl.classList.add('puzzleSpan')
    spanEl.textContent = element
    puzzleEl.appendChild(spanEl)
  })
}
