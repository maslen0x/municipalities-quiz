import Answer from '../models/Answer.js'
import Question from '../models/Question.js'
import User from '../models/User.js'

import groupArrayByField from '../utils/groupArrayByField.js'

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
    const questions = await Question.find()

    const groupedByMunicipality = groupArrayByField(answers, 'municipality')

    const groupedByDate = groupedByMunicipality
      .map(quiz => groupArrayByField(quiz, 'date'))
      .flat()

    const counted = groupedByDate.map(quiz => {
      return quiz.map(answer => {
        const question = questions.find(question => question._id.toString() === answer.question.toString())
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
      })
    })

    const result = counted.map((quiz, index) => ({
      municipality: groupedByDate[index][0].municipality,
      date: groupedByDate[index][0].date,
      answers: quiz.sort((a, b) => (a.number > b.number && 1) || (a.number < b.number && -1) || 0)
    }))

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

export const getRating = async (req, res) => {
  try {
    const answers = await Answer.find()
    const questions = await Question.find()

    const groupedByYear = Object.values(answers.reduce((acc, el) => {
      const year = new Date(el.date).getFullYear()
      acc[year] = [...(acc[year] || []), el]
      return acc
    }, {}))

    const groupedByQuestion = groupedByYear.map(group => groupArrayByField(group, 'question'))

    const counted = groupedByQuestion.map(yearGroup => {
      return yearGroup.map(questionGroup => {
        return questionGroup
          .map(answer => {
            const question = questions.find(question => question._id.toString() === answer.question.toString())
            const { _id, municipality, date, evaluations, m, h } = answer
            const { type, number, indicator } = question

            const obj = {
              _id,
              municipality,
              date,
              question: {
                _id: question._id,
                number,
                indicator
              }
            }

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
                return {
                  ...obj,
                  result: ((m / h) * 100).toFixed(2)
                }

              default:
                return answer
            }
          })
          .sort((a, b) => parseFloat(a.result) < parseFloat(b.result) ? 1 : -1)
          .map((answer, index) => {
            const between = (value, min, max) => value >= min && value <= max

            const number = index + 1

            if(between(number, 1, 5))
              return {
                ...answer,
                result: 10
              }

            if(between(number, 6, 15))
              return {
                ...answer,
                result: 7
              }

            if(between(number, 16, 25))
              return {
                ...answer,
                result: 4
              }

            if(between(number, 26, 35))
              return {
                ...answer,
                result: 2
              }

            if(number >= 36)
              return {
                ...answers,
                result: 1
              }
          })
      })
    })

    const flated = counted.map(yearGroup => groupArrayByField(yearGroup.flat(), 'municipality'))

    const grouped = flated.map(yearGroup => yearGroup.map(group => {
      const { municipality, date } = group[0]
      return {
        municipality,
        date,
        result: group.reduce((sum, next) => sum += next.result, 0),
        answers: group
      }
    }))

    return res.json(grouped)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Серверная ошибка' })
  }
}