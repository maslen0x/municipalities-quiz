import Question from '../models/Question.js'

export const create = async (req, res) => {
  try {
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
    return res.status(500).json({ message: 'Серверная ошибка' })
  }
}

export const getAll = async (req, res) => {
  try {
    const questions = await Question.find().sort({ number: 1 })
    res.json(questions)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Серверная ошибка' })
  }
}