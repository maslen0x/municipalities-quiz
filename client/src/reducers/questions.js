import { SET_QUESTIONS } from '../constants'

const initialState = null

const questions = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SET_QUESTIONS:
      return payload
  
    default:
      return state
  }
}

export default questions