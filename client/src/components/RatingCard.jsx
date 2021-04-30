import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import getMunicipalityName from '../utils/getMunicipalityName'

const RatingCard = ({ municipality, place, result, answers }) => {
  const [isResultsVisible, setResultsVisible] = useState(false)

  const municipalities = useSelector(({ municipalities }) => municipalities)

  const toggleResultsVisible = () => setResultsVisible(!isResultsVisible)

  return (
    <article className="rating__card rating-card card">
      <p className="results-card__name"><b>Название МО:</b> {getMunicipalityName(municipalities, municipality)}</p>
      <p className="results-card__place"><b>Место:</b> {place}</p>
      <p className="rating-card__result"><b>Количество баллов:</b> {result}</p>
      {isResultsVisible && (
        <ul className="rating-card__list">
          {answers.map((answer, index) => (
            <li key={answer.question._id} className="rating-card__item">
              {index + 1}) {answer.question.number} — {answer.result}
            </li>
          ))}
        </ul>
      )}
      <button onClick={toggleResultsVisible} className="rating-card__toggle">
        {isResultsVisible ? 'Свернуть' : 'Развернуть'}
      </button>
    </article>
  )
}

export default RatingCard