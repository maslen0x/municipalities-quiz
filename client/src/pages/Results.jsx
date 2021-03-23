import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ShortCard from '../components/ShortCard'
import Filters from '../components/Filters'

import { fetchShortAnswers } from '../actions/answers'

import getMunicipalityName from '../utils/getMunicipalityName'

const Results = () => {
  const dispatch = useDispatch()

  const token = useSelector(({ user }) => user.token)
  const answers = useSelector(({ answers }) => answers.short)
  const municipalities = useSelector(({ municipalities }) => municipalities)

  const [sortedAnswers, setSortedAnswers] = useState(answers)
  const [filters, setFilters] = useState({
    sort: 'DEFAULT',
    municipality: 'DEFAULT',
    year: 'DEFAULT'
  })

  const onSelectChange = e => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const countRating = arr => arr.reduce((sum, next) => sum += +next.result, 0).toFixed(2)

  useEffect(() => {
    dispatch(fetchShortAnswers(token))
  }, [dispatch, token])

  useEffect(() => {
    const copy = answers && [...answers]
    const getSort = (sort, answers) => {
      switch(sort) {
        case 'alphabet': {
          const newAnswers = answers.sort((a, b) => {
            if(getMunicipalityName(municipalities, a.municipality) > getMunicipalityName(municipalities, b.municipality))
              return 1
            if(getMunicipalityName(municipalities, a.municipality) < getMunicipalityName(municipalities, b.municipality))
              return -1
            return 0
          })
          return newAnswers
        }
  
        case 'date': {
          const newAnswers = answers.sort((a, b) => (a.date > b.date && -1) || (a.date < b.date && 1) || 0)
          return newAnswers
        }
  
        case 'rating': {
          const newAnswers = answers.sort((a, b) => {
            if(countRating(a.answers) > countRating(b.answers))
              return -1
            if(countRating(a.answers) < countRating(b.answers))
              return 1
            return 0
          })
          return newAnswers
        }
  
        default:
          return answers
      }
    }
    setSortedAnswers(getSort(filters.sort, copy))
  }, [filters, answers, municipalities])

  //TODO сделать редактирование ответов на странице с анкетов
  //TODO педелать говнокод с фильтрами (мб сделать фильтрацию/сортировку на бэкенде)

  return (
    <div className="results">
      <div className="results__container container">
        <Filters onSelectChange={onSelectChange} className="results__filters" />
        {sortedAnswers ? (
          <div className="short">
            <ul className="short__list">
              {sortedAnswers.length ? (
                sortedAnswers.map(quiz =>
                  filters.municipality === 'DEFAULT' && filters.year !== 'DEFAULT' ? (
                    filters.year === new Date(quiz.date).getFullYear().toString() && (
                      <li key={`${quiz.municipality}${quiz.date}`} className="short__item">
                        <ShortCard quiz={quiz} />
                      </li>
                    )
                  ) : filters.municipality !== 'DEFAULT' && filters.year === 'DEFAULT' ? (
                    filters.municipality === quiz.municipality && (
                      <li key={`${quiz.municipality}${quiz.date}`} className="short__item">
                        <ShortCard quiz={quiz} />
                      </li>
                    )
                  ) : filters.municipality !== 'DEFAULT' && filters.year !== 'DEFAULT' ? (
                    filters.municipality === quiz.municipality && filters.year === new Date(quiz.date).getFullYear().toString() && (
                      <li key={`${quiz.municipality}${quiz.date}`} className="short__item">
                        <ShortCard quiz={quiz} />
                      </li>
                    )
                  ) : (
                    <li key={`${quiz.municipality}${quiz.date}`} className="short__item">
                      <ShortCard quiz={quiz} />
                    </li>
                  )
                )
              ) : 'Список отчетов пуст'}
            </ul>
          </div>
        ) : 'Загрузка...'}
      </div>
    </div>
  )
}

export default Results