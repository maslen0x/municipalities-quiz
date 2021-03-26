import React from 'react'
import { useDispatch } from 'react-redux'

import { logOut } from '../actions/user'

const Header = () => {
  const dispatch = useDispatch()

  const onLogOut = () => dispatch(logOut())

  return (
    <header className="header">
      <p className="header__text">Система оценки инвестиционного климата в муниципальных образованиях Оренбургской области</p>
      <button onClick={onLogOut} className="header__logout btn">Выйти</button>
    </header>
  )
}

export default Header
