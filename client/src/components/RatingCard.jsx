import React from 'react'
import { useSelector } from 'react-redux'

import getMunicipalityName from '../utils/getMunicipalityName'

const RatingCard = ({ municipality, place, result }) => {
  const municipalities = useSelector(({ municipalities }) => municipalities)

  return (
    <article className="rating__card rating-card card">
      <p className="results-card__name"><b>Название МО:</b> {getMunicipalityName(municipalities, municipality)}</p>
      <p className="results-card__place"><b>Место:</b> {place}</p>
      <p className="rating-card__result"><b>Количество баллов:</b> {result}</p>
    </article>
  )
}

export default RatingCard