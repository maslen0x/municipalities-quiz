import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, Line, Pie } from 'react-chartjs-2'

import Filter from '../components/Filter'

import { fetchShortAnswers } from '../actions/answers'

import useChange from '../hooks/useChange'

import getYear from '../utils/getYear'

const Graphics = () => {
  const dispatch = useDispatch()

  const [years, setYears] = useState(null)
  const filters = useChange({
    municipality: 'DEFAULT',
    year: 'DEFAULT'
  })

  const token = useSelector(({ user }) => user.token)
  const municipalities = useSelector(({ municipalities }) => municipalities)
  const answers = useSelector(({ answers }) => answers.short)

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
              <Filter onChange={filters.onChange} caption="МО" name="municipality">
                {municipalities.map(municipality => (
                  <option key={municipality._id} value={municipality._id}>{municipality.name}</option>
                ))}
              </Filter>
              <Filter onChange={filters.onChange} caption="Год" name="year">
                {years && years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Filter>
            </ul>
          </div>
        </div>
        <Line
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
              }
            ]
          }}
        />
        <Bar
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
              }
            ]
          }}
        />
        <Pie
          data={{
            labels: [
              'Red',
              'Blue',
              'Yellow'
            ],
            datasets: [{
              data: [300, 50, 100],
              backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
              ],
              hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
              ]
            }]
          }}
        />
      </div>
    </div>
  )
}

export default Graphics