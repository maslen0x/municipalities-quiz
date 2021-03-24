import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import RatingCard from '../components/RatingCard'

import { fetchRating } from '../actions/rating'

const Rating = () => {
  const dispatch = useDispatch()

  const token = useSelector(({ user }) => user.token)
  const rating = useSelector(({ rating }) => rating)

  const sortByParam = (prev, next) => prev < next ? 1 : -1

  const sortByYear = (a, b) => sortByParam(new Date(a[0].date).getFullYear(), new Date(b[0].date).getFullYear())
  const sortByResult = (a, b) => sortByParam(a.result, b.result)

  useEffect(() => {
    dispatch(fetchRating(token))
  }, [dispatch, token])

  return (
    <div className="rating">
      <div className="rating__container container">
        <ul className="rating__list">
          {rating ? [...rating].sort(sortByYear).map(group => (
            <li key={group[0].date} className="rating__item">
              <p className="rating__year title">
                {new Date(group[0].date).getFullYear()}
              </p>
              {[...group].sort(sortByResult).map(quiz => (
                <RatingCard key={quiz.municipality} quiz={quiz} />
              ))}
            </li>
          )) : 'Загрузка...'}
        </ul>
      </div>
    </div>
  )
}

export default Rating