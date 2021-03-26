import { Router } from 'express'

import { getAll } from '../controllers/indicators.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.get('/', auth, getAll)

export default router