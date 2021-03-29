import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import Label from '../components/Label'

import { AVERAGE, SCORES, CHECKBOXES, PERCENTS, RESPONDENTS, EXPERTS } from '../constants'

import { fetchUpdateQuestion } from '../actions/questions'

import usePopup from '../hooks/usePopup'

import { getSource } from '../utils/parseQuestionData'
import getRandom from '../utils/getRandom'

const Edit = () => {
  const dispatch = useDispatch()

  const token = useSelector(({ user }) => user.token)
  const questions = useSelector(({ questions }) => questions)

  const history = useHistory()

  const { id } = useParams()

  const question = questions.find(question => question._id === id)

  const { isPopupVisible, onOpenPopup, onClosePopup } = usePopup()
  const [form, setForm] = useState({ ...question })

  const onFormChange = e => {
    const { name, value } = e.target
    switch(name) {
      case 'reverse':
        return setForm({ ...form, [name]: value === 'true' ? true : false })

      case 'rating-scale':
        return  setForm({ ...form, criteries: [value] })

      default:
        return setForm({ ...form, [name]: value })
    }
  }

  const onAddCriterion = e => {
    e.preventDefault()
    const elements = Array.from(e.target.elements)
    const input = elements.find(el => el.nodeName === 'INPUT')
    const criteries = [...form.criteries, input.value.trim()]
    setForm({ ...form, criteries })
    onClosePopup()
  }

  const onRemoveCriterion = index => {
    const criteries = form.criteries.filter((_, i) => i !== index)
    setForm({ ...form, criteries })
  }

  const onEdit = e => {
    e.preventDefault()
    const trimString = variable => typeof variable === 'string' ? variable.trim() : variable
    const keys = Object.keys(form)
    const data = keys.reduce((obj, key) => {
      return form[key] && key !== '_id'
        ? { ...obj, [key]: trimString(form[key]) }
        : obj
    }, {})
    const redirect = () => history.push(`/indicators/${id}`)
    dispatch(fetchUpdateQuestion(token, id, data, redirect))
  }

  return (
    <div className="edit">
      <div className="edit__container container">
        <form onSubmit={onEdit} className="edit__form">
          <Label label="Номер" className="edit__label">
            <input onChange={onFormChange} value={form.number} name="number" type="text" required className="edit__input input" />
          </Label>

          <Label label="Наименование" className="edit__label">
            <input onChange={onFormChange} value={form.indicator} name="indicator" type="text" required className="edit__input input" />
          </Label>

          {form.type !== PERCENTS && (
            <Label label="Источник данных" className="edit__label">
              <select onChange={onFormChange} value={form.source} name="source" className="edit__select select">
                <option value={RESPONDENTS}>{getSource(RESPONDENTS)}</option>
                <option value={EXPERTS}>{getSource(EXPERTS)}</option>
              </select>
            </Label>
          )}

          {form.description && (
            <Label label="Описание" className="edit__label">
              <textarea onChange={onFormChange} value={form.description} name="description" className="edit__textarea input" />
            </Label>
          )}

          {(form.type === SCORES || form.type === CHECKBOXES) && (
            <div className="edit__criteries">
              <p className="edit__criteries-title">Критерии:</p>
              <ul className="edit__criteries-list">
                {form.criteries.map((criterion, index) => (
                  <li key={getRandom()} className="edit__criteries-item">
                    <button onClick={() => onRemoveCriterion(index)} type="button" aria-label="Удалить критерий" className="edit__criteries-remove" />
                    <p className="edit__criteries-text">{criterion}</p>
                  </li>
                ))}
              </ul>
              <button onClick={onOpenPopup} type="button" aria-label="Добавить критерий" className="edit__criteries-add btn">Добавить</button>
            </div>
          )}

          {form.type === AVERAGE && <>
            <Label label="Единицы измерения" className="edit__label">
              <input onChange={onFormChange} value={form.units} name="units" type="text" className="edit__input input" />
            </Label>
            <Label label="Шкала оценки" className="edit__label">
              <input onChange={onFormChange} value={form.criteries[0]} name="rating-scale" type="text" className="edit__input input" />
            </Label>
            <Label label="Тип зависимости" className="edit__label">
              <select onChange={onFormChange} value={form.reverse} name="reverse" className="edit__select select">
                <option value="false">прямая</option>
                <option value="true">обратная</option>
              </select>
            </Label>
          </>}

          {form.type === PERCENTS && <>
            <Label label="m (делимое)" className="edit__label">
              <input onChange={onFormChange} value={form.m} type="text" name="m" className="edit__input input" />
            </Label>
            <Label label="h (делитель)" className="edit__label">
              <input onChange={onFormChange} value={form.h} type="text" name="h" className="edit__input input" />
            </Label>
          </>}

          <button className="edit__btn btn">Сохранить</button>
        </form>

        {isPopupVisible && (
          <div className="edit__popup popup">
            <form onSubmit={onAddCriterion} className="popup__body">
              <button type="button" onClick={onClosePopup} aria-label="Закрыть окно" className="popup__close" />
              <Label label="Введите название критерия" className="edit__label">
                <input type="text" className="edit__input input" />
              </Label>
              <button className="popup__btn btn">Добавить</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Edit