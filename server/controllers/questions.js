import User from '../models/User.js'
import Question from '../models/Question.js'
import Answer from '../models/Answer.js'

import validation from '../validations/questions.js'

import errorHandler from '../utils/errorHandler.js'

export const create = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if(!user)
      return errorHandler(res, 403, 'Доступ ограничен')

    const questions = await Question.find()

    const { number, indicator, description, type, source, units, criteries, m, h } = req.body

    const isExist = questions.find(question => question.indicator === indicator)
    if(isExist)
      return errorHandler(res, 400, 'Показатель с таким наименованием уже существует')

    const error = validation(req.body)
    if(error)
      return errorHandler(res, 400, error)

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
    return res.json(question)
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}

export const getAll = async (req, res) => {
  try {
    const questions = await Question.find({ isDeleted: { $ne: true }}).sort({ number: 1 })
    return res.json(questions)
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
    const { type, source, number, indicator, description, units, criteries, m, h } = body.body

    const question = await Question.findById(id)

    if(question.type !== type)
      return errorHandler(res, 400, 'Запрещено менять тип показателя')

    const error = validation(req.body)
    if(error)
      return errorHandler(res, 400, error)

    const result = await Question.findByIdAndUpdate(id, { $set: req.body }, { new: true })

    return res.json(result)
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}

export const remove = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if(!user)
      return errorHandler(res, 403, 'Доступ ограничен')

    const { id } = req.params

    const answers = await Answer.find({ question: id })

    if(!answers.length) {
      await Question.deleteOne({ _id: id })
      return res.json({ message: 'Показатель полностью удален' })
    }

    const question = await Question.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true })

    return res.json(question)
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}

export const restore = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if(!user)
      return errorHandler(res, 403, 'Доступ ограничен')

    const { id } = req.params

    const candidate = await Question.findById(id)

    if(!candidate.isDeleted)
      return errorHandler(res, 400, 'Показатель не удален')

    const question = await Question.findByIdAndUpdate(id, { $set: { isDeleted: false } }, { new: true })

    return res.json(question)
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}