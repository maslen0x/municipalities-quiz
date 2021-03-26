import { combineReducers } from 'redux'

import municipalities from './municipalities'
import questions from './questions'
import answers from './answers'
import indicators from './indicators'
import years from './years'
import user from './user'
import quiz from './quiz'
import isLoading from './isLoading'

const rootReducer = combineReducers({
  municipalities,
  questions,
  answers,
  indicators,
  user,
  quiz,
  years,
  isLoading
})

export default rootReducer