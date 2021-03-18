import axios from 'axios'

import { SET_USER, LOG_OUT, SET_READY } from '../constants'

const setUser = payload => ({
  type: SET_USER,
  payload
})

export const logOut = payload => ({
  type: LOG_OUT,
  payload
})

const setReady = payload => ({
  type: SET_READY,
  payload
})

export const logIn = (login, password) => dispatch => {
  axios.post('/api/users/login', {
    login,
    password
  })
    .then(({ data }) => dispatch(setUser(data)))
    .catch(e => alert(e.response.data.message))
}

export const auth = token => dispatch => {
  axios.get('/api/users/auth', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setUser(data)))
    .catch(e => {
      console.log(e.response.data.message)
      localStorage.removeItem('token')
    })
    .finally(() => dispatch(setReady(true)))
}