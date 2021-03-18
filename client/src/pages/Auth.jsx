import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { logIn } from '../actions/user'

const Auth = () => {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    login: '',
    password: ''
  })

  const onInputChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value})
  }

  const onLogin = e => {
    e.preventDefault()
    dispatch(logIn(form.login, form.password))
  }

  return (
    <section className="auth">
      <form onSubmit={onLogin} className="auth__form">
        <h2 className="auth__title title">Авторизация</h2>
        <input onChange={onInputChange} value={form.login} type="text" name="login" placeholder="Логин" className="auth__input input" />
        <input onChange={onInputChange} value={form.password} type="password" name="password" placeholder="Пароль" className="auth__input input" />
        <button className="auth__btn btn">Вход</button>
      </form>
    </section>
  )
}

export default Auth
