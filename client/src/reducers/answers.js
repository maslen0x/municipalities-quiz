import { SET_SHORT_ANSWERS, SET_FULL_ANSWERS, SET_RATING, SET_ANSWERS_YEARS, SET_ANSWERS_LOADING } from '../constants'

const initialState = {
  short: [],
  full: null,
  rating: [],
  years: null,
  isLoading: false
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

    case SET_ANSWERS_YEARS:
      return {
        ...state,
        years: payload
      }

    case SET_ANSWERS_LOADING:
      return {
        ...state,
        isLoading: payload
      }

    default:
      return state
  }
}

export default answers