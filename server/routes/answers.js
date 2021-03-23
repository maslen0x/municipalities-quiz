import { Router } from 'express'

import { sendQuiz, getShortInfo, getFullInfo } from '../controllers/answers.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', sendQuiz)
router.get('/short', auth, getShortInfo)
router.get('/full/:municipality', auth, getFullInfo)

import Answer from '../models/Answer.js'
router.patch('/', async (req, res) => {
  try {
    await Answer.updateMany({ municipality: '6050c934d92b2710d8ff7945' }, { $set: { date: new Date('2020-03-22') } })
  } catch (e) {
    console.log(e);
  }
})

export default router