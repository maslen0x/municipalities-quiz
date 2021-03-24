import React from 'react'
import { PERCENTS } from '../../constants'

import countResult from '../../utils/countResult'

const Result = ({ type, evaluations }) => {
  return countResult(type, evaluations) && (
    <p className="question__result">
      Результат: {countResult(type, evaluations)}{type === PERCENTS && '%'}
    </p>
  )
}

export default Result