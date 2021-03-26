import { SET_LOADING } from '../constants'

const initialState = false

const isLoading = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SET_LOADING:
      return payload

    default:
      return state
  }
}

export default isLoading