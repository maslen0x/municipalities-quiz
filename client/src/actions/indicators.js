import axios from 'axios'

import { setLoading } from '../actions/isLoading'

import { SET_INDICATORS } from '../constants'

const setIndicators = payload => ({
  type: SET_INDICATORS,
  payload
})

export const fetchIndicators = (token, query = '') => dispatch => {
  dispatch(setLoading(true))
  axios.get(`/api/indicators?${query}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(setIndicators(data))
      dispatch(setLoading(false))
    })
    .catch(e => alert(e.response.data.message))
}