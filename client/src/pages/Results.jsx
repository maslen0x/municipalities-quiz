import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ResultsCard from '../components/ResultsCard'
import Sort from '../components/Sort'
import Filter from '../components/Filter'

import { fetchShortAnswers } from '../actions/answers'

import getQueryString from '../utils/getQueryString'

const Results = () => {
  const dispatch = useDispatch()

  const sortOptions = [
    { value: 'municipality', label: 'По названию МО' },
    { value: 'date', label: 'По дате' }
  ]

  const [filters, setFilters] = useState({
    municipality: 'DEFAULT',
    date: 'DEFAULT',
    sort: 'DEFAULT'
  })

  const token = useSelector(({ user }) => user.token)
  const answers = useSelector(({ answers }) => answers.short)
  const years = useSelector(({ answers }) => answers.years)
  const isLoading = useSelector(({ answers }) => answers.isLoading)
  const municipalities = useSelector(({ municipalities }) => municipalities)

  const onFilterChange = e => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  useEffect(() => {
    dispatch(fetchShortAnswers(token))
  }, [dispatch, token])

  useEffect(() => {
    const query = getQueryString(filters)
    dispatch(fetchShortAnswers(token, query))
  }, [filters, dispatch, token])

  return (
    <div className="results">
      <div className="results__container container">
        <div className="results__header">
          <Sort
            onChange={onFilterChange}
            options={sortOptions}
            caption="Сортировка"
            name="sort"
            className="results__sort"
          />
          <div className="results__filters filters">
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
          <ul className="results__list">
            {!isLoading ? (
              answers.length ? (
                answers.map(quiz => (
                  <li key={`${quiz.municipality}${quiz.date}`} className="results__item">
                    <ResultsCard {...quiz} />
                  </li>
                ))
              ) : 'Список пуст'
            ) : 'Загрузка...'}
          </ul>
      </div>
    </div>
  )
}

export default Results