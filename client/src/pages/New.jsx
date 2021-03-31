import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import NewForm from '../components/NewForm'

import { fetchCreateQuestion } from '../actions/questions'

const New = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const token = useSelector(({ user }) => user.token)

  const [form, setForm] = useState({})

  const onAdd = data => {
    const newIndicator = { ...form, ...data }
    const keys = Object.keys(newIndicator)
    const filtered = keys.reduce((acc, key) => {
      if(newIndicator[key])
        acc[key] = newIndicator[key]
      return acc
    }, {})
    const redirect = () => history.push('/table-of-indicators')
    dispatch(fetchCreateQuestion(token, filtered, redirect))
  }

  return (
    <section className="new">
      <div className="new__container container">
        <h2 className="new__title title">Добавление нового показателя</h2>
        <NewForm form={form} setForm={setForm} onAdd={onAdd} />
      </div>
    </section>
  )
}

export default New