import { SET_QUIZ, SET_ANSWER, REMOVE_ANSWER } from '../constants'

const initialState = []

const quiz = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case SET_QUIZ:
      return payload

    case SET_ANSWER: {
      const candidate = state.find(answer => answer.question === payload.question)
      if(candidate)
        return state.map(answer => answer.question === payload.question ? payload : answer)

      return [
        ...state,
        payload
      ]
    }

    case REMOVE_ANSWER: {
      const newState = state.filter(answer => answer.question !== payload)
      !newState.length && localStorage.removeItem('quiz')
      return newState
    }

    default:
      return state
  }
}

export default quiz