const countAnswerResult = (answer, type, obj) => {
  const { evaluations, m, h } = answer

  switch(type) {
    case 'AVERAGE': {
      const average = evaluations[0].reduce((sum, next) => sum += +next, 0) / evaluations[0].length
      const result = average.toFixed(2)
      return {
        ...obj,
        result
      }
    }

    case 'SCORES': {
      const sums = evaluations.map(value => value.reduce((sum, next) => sum += +next, 0))
      const all = sums.reduce((sum, next) => sum += next, 0)
      const result = (all / evaluations.length).toFixed(2)
      return {
        ...obj,
        result
      }
    }

    case 'CHECKBOXES': {
      const sums = evaluations.map(value => value.reduce((sum, next) => sum += +next, 0))
      const scores = sums.map(sum => sum === 3 ? (sum * 3) + 1 : sum * 3)
      const result = scores.reduce((sum, next) => sum+= next, 0).toFixed(2)
      return {
        ...obj,
        result
      }
    }

    case 'PERCENTS':
      const result = ((m / h) * 100).toFixed(2)
      return {
        ...obj,
        result
      }

    default:
      return answer
  }
}

export default countAnswerResult