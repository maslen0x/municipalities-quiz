import { combineReducers } from 'redux'

import municipalities from './municipalities'
import questions from './questions'
import answers from './answers'
import user from './user'
import quiz from './quiz'
import rating from './rating'

const rootReducer = combineReducers({
  municipalities,
  questions,
  answers,
  user,
  quiz,
  rating
})

export default rootReducer