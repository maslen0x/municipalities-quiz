import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { AVERAGE } from '../constants'

import { getType, getSource, getUnits, getDescription, getRatingScale } from '../utils/parseQuestionData'

const CurrentIndicator = () => {
  const questions = useSelector(({ questions }) => questions)

  const { id } = useParams()

  const question = questions.find(question => question._id === id)

  const { number, indicator, type, source, units, reverse } = question

  return (
    <section className="indicator">
      <div className="indicator__container container">
        <h2 className="indicator__title title">
          <b>{number}</b> {indicator}
        </h2>
        <p className="indicator__type">Тип: {getType(type)}</p>
        <p className="indicator__source">Источник данных: {getSource(source)}</p>
        <p className="indicator__units">Единицы измерения: {units || getUnits(source)}</p>
        <div className="indicator__description">Описание: {getDescription(question)}</div>
        <div className="indicator__rating-scale">Шкала оценки: {getRatingScale(question)}</div>
        {type === AVERAGE && <p className="indicator__reverse">Зависимость: {reverse ? 'обратная' : 'прямая'}</p>}
        <Link to={`/edit/${id}`} className="indicator__edit btn">Редактировать</Link>
      </div>
    </section>
  )
}

export default CurrentIndicator