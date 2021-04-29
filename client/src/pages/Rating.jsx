import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import RatingCard from '../components/RatingCard'
import Filter from '../components/Filter'
import Loading from '../components/Loading'

import { fetchRating, setRating } from '../actions/answers'

import useChange from '../hooks/useChange'

import getYear from '../utils/getYear'
import getQueryString from '../utils/getQueryString'
import getRandom from '../utils/getRandom'

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

  useEffect(() => {
    dispatch(fetchRating(token))
    return () => dispatch(setRating([]))
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
          <Loading state={rating}>
            {rating.map(group => (
              <li key={group[0].date} className="rating__item">
                <p className="rating__year title">
                  {getYear(group[0].date)}
                </p>
                {group.map(quiz => (
                  <RatingCard key={getRandom()} {...quiz} quiz={quiz} />
                ))}
              </li>
            ))}
          </Loading>
        </ul>
      </div>
    </div>
  )
}

export default Rating