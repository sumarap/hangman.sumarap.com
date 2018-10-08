////////////////////////////////////////////////////////////////////////////
// Hangman Class
////////////////////////////////////////////////////////////////////////////

class Hangman {
  constructor(puzzle, numberOfWords=2, numberOfGuesses=4){
    this.puzzle = puzzle;
    this.numberOfWords = numberOfWords;
    this.numberOfGuessesRemaining = numberOfGuesses;
    this.guesses = [];
    this.status = 'playing'
  }

  setGameStatus(){
    const isSolved = this.puzzle.toLowerCase().split('').every((element) => {
      return this.guesses.includes(element) || element === ' ' ? true : false;
    });

    if (isSolved) {
      this.status = 'won';
    } else if ( this.numberOfGuessesRemaining === 0) {
      this.status = 'lost';
    } else {
      this.status = 'playing';
    }
    
    return this.status;
  };

  statusMessage() {
    if (this.status === 'playing') {
      return 'Playing';
    } else if (this.status === 'won') {
      return 'You WON!!';
    } else {
      return `Sorry, you lost.`;
    }
  }

  makeGuess(guess){

    // Change to lowercase for comparison with puzzle.
    guess = guess.toLowerCase();

    // Has user picked this letter character yet?
    const isNewGuess = this.guesses.includes(guess) ? false : true;

    // Is this guess in the puzzle (good guess)?
    const isGoodGuess = this.puzzle.toLowerCase().includes(guess) ? true : false;

    if (isNewGuess) {
      this.guesses.push(guess);
    }

    // Decrement the guessesRemaining ONLY if user has not guessed yet
    // AND it's a bad guess
    if (isNewGuess && !isGoodGuess){
      this.numberOfGuessesRemaining--;
    }

    this.setGameStatus();
    return isNewGuess;
  }

  ////////////////////////////////////////////////////////////////////////
  // Return string with guessed values displayed and unguessed values 
  // showing an asterisk
  ////////////////////////////////////////////////////////////////////////

  getPuzzleWithAsterisks(asterisk){
    
    const puzzle = this.puzzle.toLowerCase().split('');
    let puzzleWithAsterisks = '';

    puzzle.forEach((element) => {
      if (this.guesses.includes(element) || element === ' '){
        puzzleWithAsterisks += element;        
      } else {
        puzzleWithAsterisks += asterisk !== '' ? asterisk : element;
      }
    });
    return puzzleWithAsterisks;
  }

} // End of Hangman Class

