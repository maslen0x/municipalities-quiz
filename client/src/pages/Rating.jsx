import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import RatingCard from '../components/RatingCard'
import Filter from '../components/Filter'

import { fetchRating } from '../actions/answers'

import useChange from '../hooks/useChange'

import getYear from '../utils/getYear'
import getQueryString from '../utils/getQueryString'

const Rating = () => {
  const dispatch = useDispatch()

  const filters = useChange({
    municipality: 'DEFAULT',
    date: 'DEFAULT'
  })

  const token = useSelector(({ user }) => user.token)
  const municipalities = useSelector(({ municipalities }) => municipalities)
  const rating = useSelector(({ answers }) => answers.rating)
  const years = useSelector(({ years }) => years)
  const isLoading = useSelector(({ isLoading }) => isLoading)

  useEffect(() => {
    dispatch(fetchRating(token))
  }, [dispatch, token])

  useEffect(() => {
    const query = getQueryString(filters.state)
    dispatch(fetchRating(token, query))
  }, [filters.state, dispatch, token])

  return (
    <div className="rating">
      <div className="rating__container container">
        <div className="rating__header">
          <div className="rating__filters filters">
            <ul className="filters__list">
              <Filter onChange={filters.onChange} caption="МО" name="municipality">
                {municipalities.map(municipality => (
                  <option key={municipality._id} value={municipality._id}>{municipality.name}</option>
                ))}
              </Filter>
              <Filter onChange={filters.onChange} caption="Год" name="date">
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Filter>
            </ul>
          </div>
        </div>
        <ul className="rating__list">
          {!isLoading ? (
            rating.length ? (
              rating.map(group => (
                <li key={group[0].date} className="rating__item">
                  <p className="rating__year title">
                    {getYear(group[0].date)}
                  </p>
                  {group.map(quiz => (
                    <RatingCard key={quiz.municipality} {...quiz} />
                  ))}
                </li>
              ))
            ) : 'Список пуст'
          ) : 'Загрузка...'}
        </ul>
      </div>
    </div>
  )
}

export default Rating