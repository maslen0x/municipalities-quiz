import { SET_INDICATORS } from '../constants'

const initialState = []

const indicators = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SET_INDICATORS:
      return payload

    default:
      return state
  }
}

export default indicators