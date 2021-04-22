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
        {answers[0] && rating[0] ? (
          <>
            <Bar
              data={{
                labels: answers[0].answers.map(answer => answer.number),
                datasets: [{
                  label: getMunicipalityName(municipalities, answers[0].municipality),
                  data: answers[0].answers.map(answer => answer.result),
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)'
                }]
              }}
            />
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
          </>
        ) : 'Загрузка...'}
      </div>
    </div>
  )
}

export default Graphics