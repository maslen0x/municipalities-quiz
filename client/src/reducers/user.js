import { SET_USER, LOG_OUT, SET_READY } from '../constants'

const initialState = {
  token: null,
  currentUser: null,
  isReady: false
}

const user = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SET_USER:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        token: payload.token,
        currentUser: payload.user
      }

    case SET_READY:
      return {
        ...state,
        isReady: payload
      }

    case LOG_OUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null
      }
  
    default:
      return state
  }
}

export default user