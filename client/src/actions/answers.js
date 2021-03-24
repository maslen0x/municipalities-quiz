import axios from 'axios'
import { SET_SHORT_ANSWERS, SET_FULL_ANSWERS, SET_RATING, SET_ANSWERS_YEARS, SET_ANSWERS_LOADING } from '../constants'

const setShortAnswers = payload => ({
  type: SET_SHORT_ANSWERS,
  payload
})

const setFullAnswers = payload => ({
  type: SET_FULL_ANSWERS,
  payload
})

const setRating = payload => ({
  type: SET_RATING,
  payload
})

const setYears = payload => ({
  type: SET_ANSWERS_YEARS,
  payload
})

const setLoading = payload => ({
  type: SET_ANSWERS_LOADING,
  payload
})

export const fetchShortAnswers = token => dispatch => {
  axios.get('/api/answers/short', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setShortAnswers(data)))
    .catch(e => alert(e.response.data.message))
}

export const fetchFullAnswer = (token, municipality) => dispatch => {
  axios.get(`/api/answers/full/${municipality}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setFullAnswers(data)))
    .catch(e => alert(e.response.data.message))
}

export const fetchRating = (token, query = '') => dispatch => {
  dispatch(setLoading(true))
  axios.get(`/api/answers/rating?${query}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(setRating(data))
      dispatch(setLoading(false))
    })
    .catch(e => alert(e.response.data.message))
}

export const fetchYears = token => dispatch => {
  axios.get('/api/answers/years', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setYears(data)))
    .catch(e => alert(e.response.data.message))
}