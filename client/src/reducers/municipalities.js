import { SET_MUNICIPALITIES } from '../constants'

const initialState = null

const municipalities = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SET_MUNICIPALITIES:
      return payload

    default:
      return state
  }
}

export default municipalities