import axios from 'axios'

import { SET_QUIZ, SET_ANSWER, REMOVE_ANSWER } from "../constants"

export const setQuiz = payload => ({
  type: SET_QUIZ,
  payload
})

export const setAnswer = payload => ({
  type: SET_ANSWER,
  payload
})

export const removeAnswer = payload => ({
  type: REMOVE_ANSWER,
  payload
})

export const fetchQuiz = data => {
  axios.post('/api/answers', data)
    .then(() => {
      alert('Отчет успешно отправлен')
    })
    .catch(e => alert(e.response.data.message))
}

export const fetchAnswer = (token, data) => {
  axios.post('/api/answers/one', data, {
    headers: { Authorization: token }
  })
    .then(() => {
      alert('Отчет успешно отправлен')
    })
    .catch(e => alert(e.response.data.message))
  }