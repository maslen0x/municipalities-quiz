import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

import User from '../models/User.js'

const JWT_KEY = process.env.JWT_KEY

export const register = async (req, res) => {
  try {
    const { login, password, passwordCheck } = req.body

    if(!login || !password || !passwordCheck)
      return res.status(400).json({ message: 'Заполните все поля' })

    if(password !== passwordCheck)
      return res.status(400).json({ message: 'Пароли не совпадают' })

    const passwordRegexp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
    if(!password.match(passwordRegexp))
      return res.status(400).json({ message: 'Пароль должен содержать не менее 6 символов, строчные и заглавные буквы латинского алфавита, хотя бы одно число и специальный символ' })

    const candidate = await User.findOne({ login })
    if(candidate)
      return res.status(400).json({ message: 'Пользователь с таким именем уже зарегистрирован' })

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
    return res.status(500).json({ message: 'Что-то пошло не так' })
  }
}

export const login = async (req, res) => {
  try {
    const { login, password } = req.body

    if(!login || !password)
      return res.status(400).json({ message: 'Заполните все поля' })

    const user = await User.findOne({ login })
    if(!user)
      return res.status(404).json({ message: 'Пользователь с таким именем не найден' })

    const isMatch = bcrypt.compareSync(password, user.password)
    if(!isMatch)
      return res.status(400).json({ message: 'Неверный пароль' })

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
    return res.status(500).json({ message: 'Что-то пошло не так' })
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
    return res.status(500).json({ message: 'Что-то пошло не так' })
  }
}