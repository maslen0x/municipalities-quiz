import { Router } from 'express'

import User from '../models/User.js'
import Municipality from '../models/Municipality.js'
import Question from '../models/Question.js'

import auth from '../middlewares/auth.js'

import municipalities from '../seed/municipalities.js'
import questions from '../seed/questions.js'

const router = Router()

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if(!user)
      return errorHandler(res, 403, 'Доступ ограничен')

    await Municipality.insertMany(municipalities)
    await Question.insertMany(questions)

    return res.json({ message: 'Данные внесены' })
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
})

export default router