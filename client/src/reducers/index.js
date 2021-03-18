import { combineReducers } from 'redux'

import municipalities from './municipalities'
import questions from './questions'
import user from './user'

const rootReducer = combineReducers({
  municipalities,
  questions,
  user
})

export default rootReducer