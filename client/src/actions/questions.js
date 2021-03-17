import axios from 'axios'

import { SET_QUESTIONS } from '../constants'

const setQuestions = payload => ({
  type: SET_QUESTIONS,
  payload
})

export const fetchQuestions = () => dispatch => {
  axios.get('/api/questions')
    .then(({ data }) => dispatch(setQuestions(data)))
    .catch(console.log)
}