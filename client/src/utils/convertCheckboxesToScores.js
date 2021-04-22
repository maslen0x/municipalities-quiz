const convertCheckboxesToScores = arr => {
  if(Array.isArray(arr)) {
    const sum = arr.reduce((sum, next) => sum += next, 0) * 3
    const scores = sum === 3 ? 'балла' : 'баллов'
    return sum === 9 ? `10 ${scores}` : `${sum} ${scores}`
  }
  return null
}

export default convertCheckboxesToScores