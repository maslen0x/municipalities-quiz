import { combineReducers } from 'redux'

import municipalities from './municipalities'
import questions from './questions'

const rootReducer = combineReducers({
  municipalities,
  questions
})

export default rootReducer