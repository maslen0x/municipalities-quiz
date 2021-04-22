import { AVERAGE, SCORES, CHECKBOXES, PERCENTS } from '../constants'

const countResult = (type, evaluations) => {
  if(!(evaluations.length || (evaluations.m && evaluations.h)))
    return null

  try {
    switch(type) {
      case AVERAGE: {
        const sum = evaluations.reduce((sum, next) => sum += +next, 0)
        const result = (sum / evaluations.length).toFixed(2)
        return result
      }

      case SCORES: {
        const sums = evaluations.map(value => value.reduce((sum, next) => sum += +next, 0))
        const all = sums.reduce((sum, next) => sum += next, 0)
        const result = (all / evaluations.length).toFixed(2)
        return result
      }

      case CHECKBOXES: {
        const sums = evaluations.map(value => value.reduce((sum, next) => sum += +next, 0))
        const scores = sums.map(sum => sum === 3 ? (sum * 3) + 1 : sum * 3)
        const average = scores.reduce((sum, next) => sum+= next, 0)
        const result = (average / scores.length).toFixed(2)
        return result
      }

      case PERCENTS: {
        const { m, h } = evaluations
        const result = ((m / h) * 100).toFixed(2)
        return result
      }

      default:
        return null
    }
  } catch {
    return null
  }
}

export default countResult