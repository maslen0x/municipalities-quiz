import { Router } from 'express'

import { sendQuiz, sendAnswer, getShortInfo, getFullInfo, getRating, getYears } from '../controllers/answers.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', sendQuiz)
router.post('/one', auth, sendAnswer)
router.get('/short', auth, getShortInfo)
router.get('/full/:municipality', auth, getFullInfo)
router.get('/rating', auth, getRating)
router.get('/years', auth, getYears)

export default router