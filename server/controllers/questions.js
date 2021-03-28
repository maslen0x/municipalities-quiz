import Question from '../models/Question.js'
import User from '../models/User.js'

import errorHandler from '../utils/errorHandler.js'

export const create = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if(!user)
      return errorHandler(res, 403, 'Доступ ограничен')

    const { number, indicator, description, type, source, units, criteries, m, h } = req.body
    const question = new Question({
      number,
      indicator,
      description,
      type,
      source,
      units,
      criteries,
      m,
      h
    })
    await question.save()
    res.json(question)
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}

export const getAll = async (req, res) => {
  try {
    const questions = await Question.find().sort({ number: 1 })
    res.json(questions)
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}

export const update = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if(!user)
      return errorHandler(res, 403, 'Доступ ограничен')

    const { id } = req.params
    const { body } = req

    const question = await Question.findById(id)

    if(question.type !== body.type)
      return errorHandler(res, 400, 'Запрещено менять тип показателя')

    if((body.type === 'PERCENTS' && body.source !== 'FACTS') || (body.type !== 'PERCENTS' && body.source === 'FACTS'))
      return errorHandler(res, 400, 'Для типа PERCENTS разрешен только источник FACTS')

    if(!body.number || !body.indicator)
      return errorHandler(res, 400, 'Введите номер и наименование показателя')

    if((body.type === 'SCORES' || body.type === 'CHECKBOXES') && body.criteries.length === 0)
      return errorHandler(res, 400, 'Введите хотя бы 1 критерий')

    const result = await Question.findByIdAndUpdate(id, { $set: body }, { new: true })

    return res.json(result)
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}