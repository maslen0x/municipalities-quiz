import axios from 'axios'

import { setLoading } from '../actions/isLoading'

import { SET_SHORT_ANSWERS, SET_FULL_ANSWERS, SET_RATING } from '../constants'

export const setShortAnswers = payload => ({
  type: SET_SHORT_ANSWERS,
  payload
})

export const setFullAnswers = payload => ({
  type: SET_FULL_ANSWERS,
  payload
})

export const setRating = payload => ({
  type: SET_RATING,
  payload
})

export const fetchShortAnswers = (token, query = '') => dispatch => {
  dispatch(setLoading(true))
  axios.get(`/api/answers/short?${query}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setShortAnswers(data)))
    .catch(e => alert(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}

export const fetchFullAnswer = (token, municipality) => dispatch => {
  dispatch(setLoading(true))
  axios.get(`/api/answers/full/${municipality}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setFullAnswers(data)))
    .catch(e => alert(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}

export const fetchRating = (token, query = '') => dispatch => {
  dispatch(setLoading(true))
  axios.get(`/api/answers/rating?${query}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setRating(data)))
    .catch(e => alert(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}