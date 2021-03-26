import { SET_YEARS } from '../constants'

const initialState = null

const years = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SET_YEARS:
      return payload

    default:
      return state
  }
}

export default years