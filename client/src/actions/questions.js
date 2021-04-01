import axios from 'axios'

import { SET_QUESTIONS, CREATE_QUESTION, UPDATE_QUESTION, REMOVE_QUESTION } from '../constants'

const setQuestions = payload => ({
  type: SET_QUESTIONS,
  payload
})

const createQuestion = payload => ({
  type: CREATE_QUESTION,
  payload
})

const updateQuestion = payload => ({
  type: UPDATE_QUESTION,
  payload
})

const removeQuestion = payload => ({
  type: REMOVE_QUESTION,
  payload
})

export const fetchQuestions = () => dispatch => {
  axios.get('/api/questions')
    .then(({ data }) => dispatch(setQuestions(data)))
    .catch(e => alert(e.response.data.message))
}

export const fetchCreateQuestion = (token, data, cb) => dispatch => {
  axios.post('/api/questions', data, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(createQuestion(data))
      alert('Показатель успешно создан')
      cb()
    })
    .catch(e => alert(e.response.data.message))
}

export const fetchUpdateQuestion = (token, id, data, cb) => dispatch => {
  axios.put(`/api/questions/${id}`, data, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(updateQuestion({ id, data }))
      alert('Показатель успешно изменен')
      cb()
    })
    .catch(e => alert(e.response.data.message))
}

export const fetchRemoveQuestion = (token, id, cb) => dispatch => {
  axios.delete(`/api/questions/${id}`, {
    headers: { Authorization: token }
  })
    .then(() => {
      dispatch(removeQuestion(id))
      alert('Показатель успешно удален')
      cb()
    })
    .catch(e => alert(e.response.data.message))
}

export const fetchRestoreQuestion = (token, id, cb) => dispatch => {
  axios.put(`/api/questions/restore/${id}`, {}, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(createQuestion(data))
      alert('Показатель успешно восстановлен')
      cb()
    })
    .catch(e => alert(e.response.data.message))
}