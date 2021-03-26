import axios from 'axios'

import { SET_YEARS } from '../constants'

const setYears = payload => ({
  type: SET_YEARS,
  payload
})

export const fetchYears = token => dispatch => {
  axios.get('/api/answers/years', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setYears(data)))
    .catch(e => alert(e.response.data.message))
}