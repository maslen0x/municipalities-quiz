import React from 'react'

import getRandom from '../../utils/getRandom'

const Answerers = ({ evaluations, answerer, onRemove, getValues }) => {
  return (
    <ul className="question__answerers">
      {evaluations.map((evaluation, index) => (
        <li key={getRandom()}>
          <button onClick={() => onRemove(index)} aria-label="Удалить оценку" className="question__remove" />
          {/* <button aria-label="Редактировать оценку" className="question__edit" /> */}
          <p className="question__answerer">{answerer} {index + 1}: {getValues(evaluation)}</p>
        </li>
      ))}
    </ul>
  )
}

export default Answerers

//TODO сделать редактирование ответов на странице с анкетов