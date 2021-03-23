import axios from 'axios'
import { SET_SHORT_ANSWERS, SET_FULL_ANSWERS } from '../constants'

const setShortAnswers = payload => ({
  type: SET_SHORT_ANSWERS,
  payload
})

const setFullAnswers = payload => ({
  type: SET_FULL_ANSWERS,
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