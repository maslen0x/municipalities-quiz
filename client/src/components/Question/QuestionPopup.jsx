import React from 'react'

import Popup from '../Popup'
import Label from '../Label'

import { SCORES, CHECKBOXES, AVERAGE, PERCENTS } from '../../constants'

import { getAnswerer } from '../../utils/parseQuestionData'

const QuestionPopup = ({ onAdd, onClose, type, source, evaluations, criteries, units, m, h }) => {
  return (
    <Popup onSubmit={onAdd} onClose={onClose} btnText="Сохранить" className="question__popup">
      {getAnswerer(source) && <p className="popup__title">{getAnswerer(source)} {evaluations.length + 1}</p>}
      {(type === SCORES || type === CHECKBOXES) && (
        <div className="question__criteries">
          <ul>
            {criteries.map((criterion, index) => (
              <li key={index}>
                {type === SCORES && (
                  <Label label={`${index + 1}) ${criterion}`}>
                    <select className="question__select select">
                      {Array(5).fill(0).map((_, index) => <option key={index} value={index + 1}>{index + 1}</option>)}
                    </select>
                  </Label>
                )}

                {type === CHECKBOXES && (
                  <label>
                    <input type="checkbox" />
                    {criterion}
                  </label>
                )}
              </li>)
            )}
          </ul>
        </div>
      )}

      {type === AVERAGE && (
        <Label label={`${criteries[0]} (${units})`} className="popup__label">
          <input type="number" min="0" required className="input" />
        </Label>
      )}

      {type === PERCENTS && <>
        <Label label={m} className="popup__label">
          <input type="number" name="m" min="0" required className="input" />
        </Label>
        <Label label={h} className="popup__label">
          <input type="number" name="h" min="0" required className="input" />
        </Label>
      </>}
    </Popup>
  )
}

export default QuestionPopup