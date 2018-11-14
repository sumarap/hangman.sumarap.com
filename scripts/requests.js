/////////////////////////////////////////////////////////////////////////////
// API location and usage:
// https://puzzle.mead.io/puzzle?wordCount=2
// puzzle.mead.io returns 'puzzle'
// return data.puzzle
//
// https://words.sumarap.com
// words.sumarap.com returns 'word'
// return data.word
/////////////////////////////////////////////////////////////////////////////
const getPuzzle = async (wordCount = 2) => {
  const response = await fetch(
    //`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`,
    `https://words.sumarap.com?wordCount=${wordCount}`,
    {},
  )
  if (response.status === 200) {
    const data = await response.json()
    return data.words
  } else {
    throw new Error('Unable to fetch puzzle')
  }
}
