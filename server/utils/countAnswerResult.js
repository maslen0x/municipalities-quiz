const countAnswerResult = (answer, type, reverse, obj) => {
  const { evaluations, m, h } = answer

  const getResult = (evaluations, m, h) => {
    switch(type) {
      case 'AVERAGE': {
        const average = evaluations[0].reduce((sum, next) => sum += +next, 0) / evaluations[0].length
        const result = average.toFixed(2)
        return result
      }
  
      case 'SCORES': {
        const sums = evaluations.map(value => value.reduce((sum, next) => sum += +next, 0))
        const all = sums.reduce((sum, next) => sum += next, 0)
        const result = (all / evaluations.length).toFixed(2)
        return result
      }
  
      case 'CHECKBOXES': {
        const sums = evaluations.map(value => value.reduce((sum, next) => sum += +next, 0))
        const scores = sums.map(sum => sum === 3 ? (sum * 3) + 1 : sum * 3)
        const result = scores.reduce((sum, next) => sum+= next, 0).toFixed(2)
        return result
      }
  
      case 'PERCENTS':
        const result = ((m / h) * 100).toFixed(2)
        return result
  
      default:
        return null
    }
  }

  const result = getResult(evaluations, m, h)

  return {
    ...obj,
    result: reverse ? (1 / result).toFixed(2) : result
  }
}

export default countAnswerResult