import { Router } from 'express'

import { create, getAll } from '../controllers/municipalities.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', auth, create)
router.get('/', getAll)

export default router