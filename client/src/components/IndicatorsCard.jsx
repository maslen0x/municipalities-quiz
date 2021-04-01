import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { PERCENTS } from '../constants'

import DeletedFlag from './DeletedFlag'

import getMunicipalityName from '../utils/getMunicipalityName'
import { getSource, getUnits, getDescription } from '../utils/parseQuestionData'

const IndicatorsCard = ({ _id, number, indicator, units, source, type, description, criteries, isDeleted, results, onRemove, onRestore }) => {
  const [isResultsVisible, setResultsVisible] = useState(false)

  const municipalities = useSelector(({ municipalities }) => municipalities)

  const toggleResultsVisible = () => setResultsVisible(!isResultsVisible)

  const handleRemove = () => onRemove(_id)
  const handleRestore = () => onRestore(_id)

  return (
    <article className="indicators-card card">
      {!isDeleted && <button onClick={handleRemove} aria-label="Удалить показатель" className="indicators-card__remove" />}
      <p className="indicators-card__title">
        <b>{number}</b> {indicator} ({units || getUnits(source)}) <DeletedFlag isDeleted={isDeleted} />
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
      {isDeleted && <button onClick={handleRestore} className="indicators-card__restore btn">Восстановить</button>}
    </article>
  )
}

export default IndicatorsCard
