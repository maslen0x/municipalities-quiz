import React from 'react'
import { useSelector } from 'react-redux'

import getMunicipalityName from '../utils/getMunicipalityName'

const RatingCard = ({ quiz }) => {
  const municipalities = useSelector(({ municipalities }) => municipalities)

  return (
    <article className="rating__card rating-card card">
      <p className="results-card__name"><b>Название МО:</b> {getMunicipalityName(municipalities, quiz.municipality)}</p>
      <p className="results-card__date"><b>Дата отправки отчета:</b> {new Date(quiz.date).toLocaleString()}</p>
      <p className="rating-card__result"><b>Количество баллов:</b> {quiz.result}</p>
    </article>
  )
}

export default RatingCard