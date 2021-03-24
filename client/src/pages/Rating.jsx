import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import RatingCard from '../components/RatingCard'
import Filter from '../components/Filter'

import { fetchRating } from '../actions/answers'

import getYear from '../utils/getYear'

const Rating = () => {
  const dispatch = useDispatch()

  const [filters, setFilters] = useState({
    municipality: 'DEFAULT',
    date: 'DEFAULT'
  })

  const token = useSelector(({ user }) => user.token)
  const municipalities = useSelector(({ municipalities }) => municipalities)
  const rating = useSelector(({ answers }) => answers.rating)
  const years = useSelector(({ answers }) => answers.years)
  const isLoading = useSelector(({ answers }) => answers.isLoading)

  const sortByParam = (prev, next) => prev < next ? 1 : -1

  const sortByYear = (a, b) => sortByParam(getYear(a[0].date), getYear(b[0].date))
  const sortByResult = (a, b) => sortByParam(a.result, b.result)

  const onFilterChange = e => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  useEffect(() => {
    dispatch(fetchRating(token))
  }, [dispatch, token])

  useEffect(() => {
    const query = Object.keys(filters).reduce((query, next) => {
      return query += filters[next] !== 'DEFAULT'
        ? `${next}=${filters[next]}&`
        : ''
    }, '')
    dispatch(fetchRating(token, query))
  }, [filters, dispatch, token])

  return (
    <div className="rating">
      <div className="rating__container container">
        <div className="rating__header">
          <div className="rating__filters filters">
            <ul className="filters__list">
              <Filter onChange={onFilterChange} caption="МО" name="municipality">
                {municipalities.map(municipality => (
                  <option key={municipality._id} value={municipality._id}>{municipality.name}</option>
                ))}
              </Filter>
              <Filter onChange={onFilterChange} caption="Год" name="date">
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Filter>
            </ul>
          </div>
        </div>
        <ul className="rating__list">
          {(rating && !isLoading) ? (
            rating.length ? (
              [...rating].sort(sortByYear).map(group => (
                <li key={group[0].date} className="rating__item">
                  <p className="rating__year title">
                    {getYear(group[0].date)}
                  </p>
                  {[...group].sort(sortByResult).map((quiz, index) => (
                    <RatingCard key={quiz.municipality} place={index + 1} {...quiz} />
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