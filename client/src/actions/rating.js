import axios from 'axios'

import { SET_RATING } from '../constants'

const setRating = payload => ({
  type: SET_RATING,
  payload
})

export const fetchRating = token => dispatch => {
  axios.get('/api/answers/rating', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setRating(data)))
    .catch(e => alert(e.response.data.message))
}