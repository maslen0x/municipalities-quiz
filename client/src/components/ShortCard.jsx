import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import getMunicipalityName from '../utils/getMunicipalityName'

const ShortCard = ({ quiz }) => {
  const [more, setMore] = useState(false)

  const municipalities = useSelector(({ municipalities }) => municipalities)

  const toggleMore = () => setMore(!more)

  return (
    <article className="short-card">
      <p className="short-card__name"><b>Название МО:</b> {getMunicipalityName(municipalities, quiz.municipality)}</p>
      <p className="short-card__date"><b>Дата отправки отчета:</b> {new Date(quiz.date).toLocaleString()}</p>
      {more && (
        <ul className="short__results">
          {quiz.answers.map(answer => (
            <li key={answer._id} className="short__results-item">
              <p className="short__results-indicator"><b>{answer.number}</b> {answer.indicator}</p>
              <p className="short__results-result">Результат: {answer.result}</p>
            </li>
          ))}
        </ul>
      )}
      <p className="short-card__score"><b>Общее количество баллов:</b> {quiz.answers.reduce((sum, next) => sum += +next.result, 0).toFixed(2)}</p>
      <button onClick={toggleMore} className="short-card__more">{more ? 'Свернуть' : 'Развернуть'}</button>
      <Link to={`/results/${quiz.municipality}`} className="short-card__report">Подробнее</Link>
    </article>
  )
}

export default ShortCard