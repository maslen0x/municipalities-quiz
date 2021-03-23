import Answer from '../models/Answer.js'
import Question from '../models/Question.js'
import User from '../models/User.js'

export const sendQuiz = async (req, res) => {
  try {
    const answers = req.body
    const year = +new Date(answers[0].date).getFullYear()
    const municipality = answers[0].municipality

    await Answer.deleteMany({
      municipality,
      date: { $gt: new Date(`${year}-01-01T00:00:00`), $lt: new Date(`${year + 1}-01-01T00:00:00`) }
    })

    await Answer.insertMany(answers)
    return res.json(answers)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Серверная ошибка' })
  }
}

export const getShortInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if(!user)
      return res.status(403).json({ message: 'Недостаточно доступа для выполнения операции' })

    const answers = await Answer.find()

    const groupedByMunicipality = Object.values(answers.reduce((acc, el) => {
      const municipality = el.municipality
      acc[municipality] = [...(acc[municipality] || []), el]
      return acc
    }, {}))

    // return res.json(groupedByMunicipality)

    const groupedByDate = groupedByMunicipality.map(quiz => {
      return Object.values(quiz.reduce((acc, el) => {
        const date = el.date
        acc[date] = [...(acc[date] || []), el]
        return acc
      }, {}))
    }).flat()


    const counted = await Promise.all(groupedByDate.map(async quiz => {
      return await Promise.all(quiz.map(async answer => {
        const question = await Question.findOne({ _id: answer.question })
        const { _id, evaluations, m, h } = answer
        const { type, number, indicator } = question

        switch(type) {
          case 'AVERAGE': {
            const average = evaluations[0].reduce((sum, next) => sum += +next, 0) / evaluations[0].length
            const result = average.toFixed(2)
            return {
              _id,
              number,
              indicator,
              result
            }
          }

          case 'SCORES': {
            const sums = evaluations.map(value => value.reduce((sum, next) => sum += +next, 0))
            const all = sums.reduce((sum, next) => sum += next, 0)
            const result = (all / evaluations.length).toFixed(2)
            return {
              _id,
              number,
              indicator,
              result
            }
          }

          case 'CHECKBOXES': {
            const sums = evaluations.map(value => value.reduce((sum, next) => sum += +next, 0))
            const scores = sums.map(sum => sum === 3 ? (sum * 3) + 1 : sum * 3)
            const result = scores.reduce((sum, next) => sum+= next, 0).toFixed(2)
            return {
              _id,
              number,
              indicator,
              result
            }
          }

          case 'PERCENTS':
            return {
              _id,
              number,
              indicator,
              result: ((m / h) * 100).toFixed(2)
            }

          default:
            return answer
        }
      }))
    }))

    const result = counted.map((quiz, index) => {
      return {
        municipality: groupedByDate[index][0].municipality,
        date: groupedByDate[index][0].date,
        answers: quiz.sort((a, b) => (a.number > b.number && 1) || (a.number < b.number && -1) || 0)
      }
    })

    return res.json(result)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Серверная ошибка' })
  }
}

export const getFullInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if(!user)
      return res.status(403).json({ message: 'Недостаточно доступа для выполнения операции' })

    const { municipality } = req.params
    const answers = await Answer.find({ municipality })

    const groupedByDate = Object.values(answers.reduce((acc, el) => {
      const date = el.date
      acc[date] = [...(acc[date] || []), el]
      return acc
    }, {}))

    const latest = groupedByDate[groupedByDate.length - 1]

    return res.json(latest)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Серверная ошибка' })
  }
}