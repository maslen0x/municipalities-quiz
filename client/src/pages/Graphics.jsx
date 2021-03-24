import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2'

import Filter from '../components/Filter'

import { fetchShortAnswers } from '../actions/answers'

import getYear from '../utils/getYear'

const Graphics = () => {
  const dispatch = useDispatch()

  const [years, setYears] = useState(null)
  const [filters, setFilters] = useState({
    municipality: 'DEFAULT',
    year: 'DEFAULT'
  })

  const token = useSelector(({ user }) => user.token)
  const municipalities = useSelector(({ municipalities }) => municipalities)
  const answers = useSelector(({ answers }) => answers.short)
  const questions = useSelector(({ questions }) => questions)

  const onFilterChange = e => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  useEffect(() => {
    console.log(filters);
  }, [filters])

  useEffect(() => {
    dispatch(fetchShortAnswers(token))
  }, [dispatch, token])

  useEffect(() => {
    if(!answers)
      return
    const yearsArr = answers.map(answer => getYear(answer.date))
    const filteredYears = [...new Set(yearsArr.reverse())]
    setYears(filteredYears)
  }, [answers])

  return (
    <div className="graphics">
      <div className="graphics__container container">
        <div style={{ marginBottom: 15 }} className="graphics__header">
          <div className="graphics__filters filters">
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
        {answers && (
          <Bar
            data={{
              labels: questions.map(question => question.number),
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: [102, 42, 46, 120, 25, 50, 80]
                }
              ]
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Graphics

// answers.map(quiz => ({
//   label: getMunicipalityName(municipalities, quiz.municipality),
//   data: quiz.answers.map(answer => answer.result)
// }))