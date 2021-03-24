import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import getMunicipalityName from '../utils/getMunicipalityName'

const ResultsCard = ({ quiz }) => {
  const [more, setMore] = useState(false)

  const municipalities = useSelector(({ municipalities }) => municipalities)

  const toggleMore = () => setMore(!more)

  return (
    <article className="results-card card">
      <p className="results-card__name"><b>Название МО:</b> {getMunicipalityName(municipalities, quiz.municipality)}</p>
      <p className="results-card__date"><b>Дата отправки отчета:</b> {new Date(quiz.date).toLocaleString()}</p>
      {more && (
        <ul className="results-card__list">
          {quiz.answers.map(answer => (
            <li key={answer._id} className="results-card__item">
              <p className="results-card__indicator"><b>{answer.number}</b> {answer.indicator}</p>
              <p className="results-card__result">Результат: {answer.result}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={toggleMore} className="results-card__more">{more ? 'Свернуть' : 'Развернуть'}</button>
      <Link to={`/results/${quiz.municipality}`} className="results-card__report">Подробнее</Link>
    </article>
  )
}

export default ResultsCard