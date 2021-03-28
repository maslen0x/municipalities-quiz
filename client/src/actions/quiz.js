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
    .then(({ data }) => {
      alert('Отчет успешно отправлен')
      console.log(data)
    })
    .catch(e => alert(e.response.data.message))
}