import axios from 'axios'

import { setLoading } from '../actions/isLoading'

import { SET_SHORT_ANSWERS, SET_FULL_ANSWERS, SET_RATING } from '../constants'

const setShortAnswers = payload => ({
  type: SET_SHORT_ANSWERS,
  payload
})

export const setFullAnswers = payload => ({
  type: SET_FULL_ANSWERS,
  payload
})

const setRating = payload => ({
  type: SET_RATING,
  payload
})

export const fetchShortAnswers = (token, query = '') => dispatch => {
  dispatch(setLoading(true))
  axios.get(`/api/answers/short?${query}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(setShortAnswers(data))
      dispatch(setLoading(false))
    })
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