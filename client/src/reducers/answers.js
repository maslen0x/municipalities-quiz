import { SET_SHORT_ANSWERS, SET_FULL_ANSWERS, SET_RATING } from '../constants'

const initialState = {
  short: [],
  full: null,
  rating: []
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

    case SET_RATING:
      return {
        ...state,
        rating: payload
      }

    default:
      return state
  }
}

export default answers