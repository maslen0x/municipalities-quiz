import { Router } from 'express'

import { create, getAll, update, remove, restore } from '../controllers/questions.js'

import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', auth, create)
router.get('/', getAll)
router.put('/:id', auth, update)
router.delete('/:id', auth, remove)
router.put('/restore/:id', auth, restore)

export default router