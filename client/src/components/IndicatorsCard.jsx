import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { PERCENTS } from '../constants'

import getMunicipalityName from '../utils/getMunicipalityName'
import { getSource, getUnits, getDescription } from '../utils/parseQuestionData'

const IndicatorsCard = ({ _id, number, indicator, units, source, type, description, criteries, results }) => {
  const [isResultsVisible, setResultsVisible] = useState(false)

  const municipalities = useSelector(({ municipalities }) => municipalities)

  const toggleResultsVisible = () => setResultsVisible(!isResultsVisible)

  return (
    <article className="indicators-card card">
      <p className="indicators-card__title">
        <b>{number}</b> {indicator} ({units || getUnits(source)})
      </p>
      <p className="indicators-card__source">{getSource(source)}</p>
      <div className="indicators-card__description">{getDescription({ type, description, criteries })}</div>
      {isResultsVisible && (
        <ul className="indicators-card__list">
          {results.map((item, index) => (
              <li key={item.municipality} className="indicators-card__item">
                <p className="indicators-card__municipality">
                  <Link to={`/results/${item.municipality}`} className="indicators-card__link">
                   {index + 1}. {getMunicipalityName(municipalities, item.municipality)}
                  </Link> — {item.result}{type === PERCENTS && '%'}
                </p>
              </li>
            ))}
        </ul>
      )}
      <button onClick={toggleResultsVisible} className="indicators-card__toggle">
        {isResultsVisible ? 'Свернуть' : 'Развернуть'}
      </button>
      <Link to={`/indicators/${_id}`} className="indicators-card__details">Подробнее</Link>
    </article>
  )
}

export default IndicatorsCard
