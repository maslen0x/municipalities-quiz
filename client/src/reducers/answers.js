import { SET_SHORT_ANSWERS, SET_FULL_ANSWERS } from '../constants'

const initialState = {
  short: null,
  full: null
}

const answers = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SET_SHORT_ANSWERS:
      return {
        ...state,
        short: payload
      }

    case SET_FULL_ANSWERS:
      return {
        ...state,
        full: payload
      }

    default:
      return state
  }
}

export default answers