import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2'

import Filter from '../components/Filter'

import { fetchShortAnswers, fetchRating, setShortAnswers, setRating } from '../actions/answers'

import useChange from '../hooks/useChange'

import getQueryString from '../utils/getQueryString'
import getMunicipalityName from '../utils/getMunicipalityName'

const Graphics = () => {
  const dispatch = useDispatch()

  const filters = useChange({
    municipality: 'DEFAULT',
    year: 'DEFAULT'
  })

  const token = useSelector(({ user }) => user.token)
  const municipalities = useSelector(({ municipalities }) => municipalities)
  const answers = useSelector(({ answers }) => answers.short)
  const rating = useSelector(({ answers }) => answers.rating)
  const years = useSelector(({ years }) => years)

  useEffect(() => {
    dispatch(fetchShortAnswers(token))
    dispatch(fetchRating(token))
    return () => {
      dispatch(setShortAnswers([]))
      dispatch(setRating([]))
    }
  }, [dispatch, token])

  useEffect(() => {
    const query = getQueryString(filters.state)
    dispatch(fetchShortAnswers(token, query))
    dispatch(fetchRating(token, query))
  }, [filters.state, dispatch, token])

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
              <Filter onChange={filters.onChange} caption="Год" name="date">
                {years && years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Filter>
            </ul>
          </div>
        </div>
        {/* <Line
          data={{
            labels: answers.map(answer => answer.number),
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
        /> */}
        {answers[0] ? (
          <Bar
            data={{
              labels: answers[0].answers.map(answer => answer.number),
              datasets: [
                {
                  label: getMunicipalityName(municipalities, answers[0].municipality),
                  data: answers[0].answers.map(answer => answer.result),
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)'
                }
              ]
            }}
          />
        ) : <p>Данных нет</p>}
        {rating[0] ? (
          <Bar
            data={{
              labels: rating[0][0].answers.map(answer => answer.question.number),
              datasets: [{
                label: getMunicipalityName(municipalities, rating[0][0].municipality),
                data: rating[0][0].answers.map(answer => answer.result),
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)'
              }]
            }}
          />
        ) : <p>Данных нет</p>}
      </div>
    </div>
  )
}

export default Graphics