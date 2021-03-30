import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ResultsCard from '../components/ResultsCard'
import Sort from '../components/Sort'
import Filter from '../components/Filter'
import Loading from '../components/Loading'

import { fetchShortAnswers, setShortAnswers } from '../actions/answers'

import useChange from '../hooks/useChange'

import getQueryString from '../utils/getQueryString'

const Results = () => {
  const dispatch = useDispatch()

  const sortOptions = [
    { value: 'municipality', label: 'По названию МО' },
    { value: 'date', label: 'По дате' }
  ]

  const filters = useChange({
    sort: 'DEFAULT',
    municipality: 'DEFAULT',
    date: 'DEFAULT'
  })

  const token = useSelector(({ user }) => user.token)
  const answers = useSelector(({ answers }) => answers.short)
  const years = useSelector(({ years }) => years)
  const municipalities = useSelector(({ municipalities }) => municipalities)

  useEffect(() => {
    dispatch(fetchShortAnswers(token))
    return () => dispatch(setShortAnswers([]))
  }, [dispatch, token])

  useEffect(() => {
    const query = getQueryString(filters.state)
    dispatch(fetchShortAnswers(token, query))
  }, [filters.state, dispatch, token])

  return (
    <div className="results">
      <div className="results__container container">
        <div className="results__header">
          <Sort
            onChange={filters.onChange}
            options={sortOptions}
            caption="Сортировка"
            name="sort"
            className="results__sort"
          />
          <div className="results__filters filters">
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
          <ul className="results__list">
            <Loading state={answers}>
              {answers.map(quiz => (
                <li key={`${quiz.municipality}${quiz.date}`} className="results__item">
                  <ResultsCard {...quiz} />
                </li>
              ))}
            </Loading>
          </ul>
      </div>
    </div>
  )
}

export default Results