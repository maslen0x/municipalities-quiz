import { SET_QUESTIONS, CREATE_QUESTION, UPDATE_QUESTION, REMOVE_QUESTION } from '../constants'

const initialState = null

const questions = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SET_QUESTIONS:
      return payload

    case CREATE_QUESTION:
      return [...state, payload].sort((a, b) => a.number > b.number ? 1 : -1)

    case UPDATE_QUESTION:
      return state
        .map(question => question._id === payload.id ? payload.data : question)
        .sort((a, b) => a.number > b.number ? 1 : -1)

    case REMOVE_QUESTION:
      return state.filter(question => question._id !== payload)

    default:
      return state
  }
}

export default questions