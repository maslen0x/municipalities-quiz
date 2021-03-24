import { SET_RATING } from '../constants'

const initialState = null

const rating = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SET_RATING:
      return payload

    default:
      return state
  }
}

export default rating