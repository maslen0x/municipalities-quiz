import axios from 'axios'

import { SET_MUNICIPALITIES } from '../constants'

const setMunicipalities = payload => ({
  type: SET_MUNICIPALITIES,
  payload
})

export const fetchMunicipalities = () => dispatch => {
  axios.get('/api/municipalities')
    .then(({ data }) => dispatch(setMunicipalities(data)))
    .catch(e => alert(e.response.data.message))
}