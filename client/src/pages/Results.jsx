import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ResultsCard from '../components/ResultsCard'
import Sort from '../components/Sort'
import Filter from '../components/Filter'

import { fetchShortAnswers } from '../actions/answers'

import getMunicipalityName from '../utils/getMunicipalityName'

const Results = () => {
  const dispatch = useDispatch()

  const sortOptions = [
    { value: 'alphabet', label: 'По алфавиту' },
    { value: 'date', label: 'По дате' }
  ]

  const token = useSelector(({ user }) => user.token)
  const answers = useSelector(({ answers }) => answers.short)
  const municipalities = useSelector(({ municipalities }) => municipalities)

  const [years, setYears] = useState(null)
  const [sortedAnswers, setSortedAnswers] = useState(answers)
  const [filteredAnswers, setFilteredAnswers] = useState(sortedAnswers)

  const [sort, setSort] = useState('DEFAULT')
  const [filters, setFilters] = useState({
    municipality: 'DEFAULT',
    year: 'DEFAULT'
  })

  const onSortChange = e => {
    const { value } = e.target
    setSort(value)
  }

  const onFilterChange = e => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  useEffect(() => {
    dispatch(fetchShortAnswers(token))
  }, [dispatch, token])

  useEffect(() => {
    const copy = answers && [...answers]
    const getSort = (sort, answers) => {
      switch(sort) {
        case 'alphabet': {
          const newAnswers = answers.sort((a, b) => {
            return getMunicipalityName(municipalities, a.municipality) > getMunicipalityName(municipalities, b.municipality) ? 1 : -1
          })
          return newAnswers
        }

        case 'date': {
          const newAnswers = answers.sort((a, b) => a.date < b.date ? 1 : -1)
          return newAnswers
        }

        default:
          return answers
      }
    }
    setSortedAnswers(getSort(sort, copy))
  }, [sort, answers, municipalities])

  useEffect(() => {
    const newAnswers = sortedAnswers && sortedAnswers.filter(quiz => {
      if(filters.municipality === 'DEFAULT' && filters.year !== 'DEFAULT')
        return filters.year === new Date(quiz.date).getFullYear().toString() && quiz

      if(filters.municipality !== 'DEFAULT' && filters.year === 'DEFAULT')
        return filters.municipality === quiz.municipality && quiz

      if(filters.municipality !== 'DEFAULT' && filters.year !== 'DEFAULT')
        return filters.municipality === quiz.municipality && filters.year === new Date(quiz.date).getFullYear().toString() && quiz

      return quiz
    })
    setFilteredAnswers(newAnswers)
  }, [sortedAnswers, filters])

  useEffect(() => {
    if(!answers)
      return
    const yearsArr = answers.map(answer => new Date(answer.date).getFullYear())
    const filteredYears = [...new Set(yearsArr.reverse())]
    setYears(filteredYears)
  }, [answers])

  //TODO сделать редактирование ответов на странице с анкетов
  //TODO педелать говнокод с фильтрами (мб сделать фильтрацию/сортировку на бэкенде)

  return (
    <div className="results">
      <div className="results__container container">
        <div className="results__header">
          <Sort
            onChange={onSortChange}
            options={sortOptions}
            caption="Сортировка"
            className="results__sort"
          />
          <div className="results__filters">
            <ul className="filters__list">
              <Filter onChange={onFilterChange} caption="МО" name="municipality">
                {municipalities.map(municipality => (
                  <option key={municipality._id} value={municipality._id}>{municipality.name}</option>
                ))}
              </Filter>
              <Filter onChange={onFilterChange} caption="Год" name="year">
                {years && years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Filter>
            </ul>
          </div>
        </div>
        {filteredAnswers ? (
          <ul className="results__list">
            {filteredAnswers.length ? (
              filteredAnswers.map(quiz => (
                <li key={`${quiz.municipality}${quiz.date}`} className="results__item">
                  <ResultsCard quiz={quiz} />
                </li>
              ))
            ) : 'Список отчетов пуст'}
          </ul>
        ) : 'Загрузка...'}
      </div>
    </div>
  )
}

export default Results