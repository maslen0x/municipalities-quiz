import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

import User from '../models/User.js'

import errorHandler from '../utils/errorHandler.js'

const JWT_KEY = process.env.JWT_KEY

export const register = async (req, res) => {
  try {
    const { login, password, passwordCheck } = req.body

    if(!login || !password || !passwordCheck)
      return errorHandler(res, 400, 'Заполните все поля')

    if(password !== passwordCheck)
      return errorHandler(res, 400, 'Пароли не совпадают')

    const passwordRegexp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
    if(!password.match(passwordRegexp))
      return errorHandler(res, 400, 'Пароль должен содержать не менее 6 символов, строчные и заглавные буквы латинского алфавита, хотя бы одно число и специальный символ')

    const candidate = await User.findOne({ login })
    if(candidate)
      return errorHandler(res, 400, 'Пользователь с таким именем уже зарегистрирован')

    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = new User({
      login,
      password: hashedPassword
    })

    const token = `Bearer ${jwt.sign({ id: user._id, login }, JWT_KEY, { expiresIn: '3h' })}`

    await user.save()
    return res.json({
      token,
      user: {
        id: user._id,
        login
      },
      message: 'Пользователь успешно зарегистрирован'
    })
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}

export const login = async (req, res) => {
  try {
    const { login, password } = req.body

    if(!login || !password)
      return errorHandler(res, 400, 'Заполните все поля')

    const user = await User.findOne({ login })
    const isMatch = bcrypt.compareSync(password, user.password)

    if(!user || !isMatch)
      return errorHandler(res, 400, 'Неверный логин или пароль')

    const token = `Bearer ${jwt.sign({ id: user._id, login }, JWT_KEY, { expiresIn: '3h' })}`

    return res.json({
      token,
      user: {
        id: user._id,
        login
      }
    })
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}

export const auth = async (req, res) => {
  try {
    const { id, login } = req.user
    const user = await User.findById(id)

    const token = `Bearer ${jwt.sign({ id: user._id, login }, JWT_KEY, { expiresIn: '3h' })}`

    return res.json({
      token,
      user: {
        id: user._id,
        login
      }
    })
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}