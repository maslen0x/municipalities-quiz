import User from '../models/User.js'
import Question from '../models/Question.js'
import Answer from '../models/Answer.js'

import errorHandler from '../utils/errorHandler.js'
import groupArrayByField from '../utils/groupArrayByField.js'
import groupArrayByYear from '../utils/groupArrayByYear.js'
import countAnswerResult from '../utils/countAnswerResult.js'

export const getAll = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if(!user)
      return errorHandler(res, 403, 'Доступ ограничен')

      const { question, date } = req.query

      const filters = {
        question,
        date
      }

      if(filters.date)
        filters.date = { $gt: new Date(date), $lt: new Date((+date + 1).toString()) }

      const query = Object.keys(filters).reduce((obj, key) => filters[key] ? { ...obj, [key]: filters[key] } : obj, {})

      const answers = await Answer.find(query)
      const questions = await Question.find()

      const groupedByYear = groupArrayByYear(answers)

      const grouped = groupedByYear.map(group => {
        return groupArrayByField(group, 'question') 
      })

      const counted = grouped.map(yearGroup => {
        const answers = yearGroup
          .map(questionGroup => {
            const question = questions.find(question => question._id.toString() === questionGroup[0].question.toString())
            const { _id, number, indicator, units, source, type, description, criteries } = question

            const results = questionGroup.map(answer => {
              const { municipality } = answer
              const obj = { municipality }
              return countAnswerResult(answer, type, false, obj)
            })

            return {
              _id, number, indicator, units, source, type, description, criteries,
              results: results.sort((a, b) => +a.result < +b.result ? 1 : -1)
            }
          })
          .sort((a, b) => a.number > b.number ? 1 : -1)

        return {
          year: new Date(yearGroup[0][0].date).getFullYear(),
          answers
        }
      })

      const sorted = counted.sort((a, b) => a.year < b.year ? 1 : -1)

      return res.json(sorted)
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}