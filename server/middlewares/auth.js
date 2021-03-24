import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import errorHandler from '../utils/errorHandler.js'

dotenv.config()

const JWT_KEY = process.env.JWT_KEY

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if(!token)
      return errorHandler(res, 401, 'Не удалось авторизоваться')

    const decoded = jwt.verify(token, JWT_KEY)
    req.user = decoded

    next()
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}

export default auth