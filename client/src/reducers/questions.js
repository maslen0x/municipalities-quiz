import { SET_QUESTIONS, UPDATE_QUESTION } from '../constants'

const initialState = null

const questions = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SET_QUESTIONS:
      return payload

    case UPDATE_QUESTION:
      return state.map(question => question._id === payload.id ? payload.data : question)

    default:
      return state
  }
}

export default questions