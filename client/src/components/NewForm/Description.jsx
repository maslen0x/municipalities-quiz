import React, { useState } from 'react'

import Label from '../Label'
import Popup from '../Popup'
import Actions from './Actions'

import { AVERAGE, SCORES, CHECKBOXES, PERCENTS } from '../../constants'

import useChange from '../../hooks/useChange'
import usePopup from '../../hooks/usePopup'

import getRandom from '../../utils/getRandom'

const Description = ({ type, description, m, h, criteries, onDecStep, onIncStep, onAdd }) => {
  const [averageCriterion, setAverageCriterion] = useState('')
  const [criteriesData, setCriteriesData] = useState([])

  const data = useChange({
    description: description || '',
    m: type === PERCENTS ? (m || '') : undefined,
    h: type === PERCENTS ? (h || '') : undefined,
    criteries: criteries || []
  })

  const { isPopupVisible, onOpenPopup, onClosePopup } = usePopup()

  const handleAdd = () => {
    const getErrors = () => {
      switch(type) {
        case AVERAGE:
          return (!data.state.description || !averageCriterion) && 'Заполните все поля'
  
        case PERCENTS:
          return (!data.state.m || !data.state.h) && 'Заполните все поля'
  
        case SCORES:
          return !criteriesData.length && 'Введите хотя бы 1 критерий'
  
        case CHECKBOXES:
          return !criteriesData.length && 'Введите хотя бы 1 критерий'
  
        default:
          return false
      }
    }
    const errorsList = getErrors()
    if(errorsList)
      return alert(errorsList)

    const parsedData = () => {
      switch(type) {
        case AVERAGE:
          return { ...data.state, criteries: [averageCriterion] }

        case SCORES:
          return { ...data.state, criteries: criteriesData }

        case CHECKBOXES:
          return { ...data.state, criteries: criteriesData }

        default:
          return data.state
      }
    }

    onAdd(parsedData())
  }

  const onAddCriterion = e => {
    e.preventDefault()
    const elements = Array.from(e.target.elements)
    const input = elements.find(el => el.nodeName === 'INPUT')
    const value = input.value.trim()
    if(!value)
      return alert('Введите название критерия')
    const criteries = [...criteriesData, value]
    setCriteriesData(criteries)
    onClosePopup()
  }

  const onRemoveCriterion = index => {
    const criteries = criteriesData.filter((_, i) => i !== index)
    setCriteriesData(criteries)
  }

  return (
    <>
      {(type === AVERAGE || type === PERCENTS) && (
        <Label label="Описание" className="new__label">
          <textarea onChange={data.onChange} value={data.state.description} name="description" className="new__textarea textarea" />
        </Label>
      )}

      {type === AVERAGE && <>
        <p className="new__rating-scale">Шкала оценки:</p>
        <Label label="Краткое описание для одного опрашиваемого (респондента/эксперта)" className="new__label">
          <input onChange={e => setAverageCriterion(e.target.value)} value={averageCriterion} type="text" className="new__input input" />
        </Label>
      </>}

      {(type === SCORES || type === CHECKBOXES) && (
        <div className="new__criteries">
          <p className="new__criteries-title">Критерии:</p>
          <ul className="new__criteries-list">
          {criteriesData.length ? (
            criteriesData.map((criterion, index) => (
              <li key={getRandom()} className="new__criteries-item">
                <button onClick={() => onRemoveCriterion(index)} type="button" aria-label="Удалить критерий" className="new__criteries-remove" />
                <p className="new__criteries-text">{criterion}</p>
              </li>
            ))
          ) : 'Список критериев пуст'}
          </ul>
          <button onClick={onOpenPopup} type="button" aria-label="Добавить критерий" className="new__criteries-add btn">Добавить критерий</button>
        </div>
      )}

      {type === PERCENTS && <>
        <p className="new__rating-scale">Шкала оценки:</p>
        <Label label="m (делимое)" className="new__label">
          <input onChange={data.onChange} value={data.state.m} name="m" type="text" className="new__input input" />
        </Label>
        <Label label="h (делитель)" className="new__label">
          <input onChange={data.onChange} value={data.state.h} name="h" type="text" className="new__input input" />
        </Label>
      </>}

      <Actions data={data.state} onDecStep={onDecStep} onIncStep={onIncStep} next={false} finish={true} handleAdd={handleAdd} />

      {isPopupVisible && (
        <Popup onSubmit={onAddCriterion} onClose={onClosePopup} btnText="Добавить" className="edit__popup">
          <Label label="Введите название критерия" className="edit__label">
            <input type="text" className="edit__input input" />
          </Label>
        </Popup>
      )}
    </>
  )
}

export default Description
