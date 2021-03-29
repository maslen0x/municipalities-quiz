import React from 'react'
import { useDispatch } from 'react-redux'

import { logIn } from '../actions/user'

import useChange from '../hooks/useChange'

const Auth = () => {
  const dispatch = useDispatch()

  const form = useChange({
    login: '',
    password: ''
  })

  const onLogin = e => {
    e.preventDefault()
    dispatch(logIn(form.state.login, form.state.password))
  }

  return (
    <section className="auth">
      <form onSubmit={onLogin} className="auth__form card">
        <h2 className="auth__title title">Авторизация</h2>
        <input
          onChange={form.onChange}
          value={form.state.login}
          type="text"
          name="login"
          placeholder="Логин"
          className="auth__input input"
        />
        <input
          onChange={form.onChange}
          value={form.state.password}
          type="password"
          name="password"
          placeholder="Пароль"
          className="auth__input input"
        />
        <button className="auth__btn btn">Вход</button>
      </form>
    </section>
  )
}

export default Auth