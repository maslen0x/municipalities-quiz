import React from 'react'

import getRandom from '../../utils/getRandom'

const Answerers = ({ evaluations, answerer, onRemove, getValues }) => {
  if(Array.isArray(evaluations))
    return (
      <ul className="question__answerers">
        {evaluations && evaluations.map((evaluation, index) => (
          <li key={getRandom()}>
            <button onClick={() => onRemove(index)} aria-label="Удалить оценку" className="question__remove" />
            <p className="question__answerer">{answerer} {index + 1}: {getValues(evaluation)}</p>
          </li>
        ))}
      </ul>
    )
  return <></>
}

export default Answerers