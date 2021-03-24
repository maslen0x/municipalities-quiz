import React from 'react'

import { SCORES, CHECKBOXES, AVERAGE, PERCENTS } from '../../constants'

import { getAnswerer } from '../../utils/parseQuestionData'

const Popup = ({ onAdd, onClose, type, source, evaluations, criteries, units, m, h }) => {
  return (
    <div className="question__popup popup">
      <form onSubmit={onAdd} className="popup__body">
        <button type="button" onClick={onClose} aria-label="Закрыть окно" className="popup__close" />
        {getAnswerer(source) && <p className="popup__title">{getAnswerer(source)} {evaluations.length + 1}</p>}
        {(type === SCORES || type === CHECKBOXES) && (
          <div className="question__criteries">
            <ul>
              {criteries.map((criterion, index) => (
                <li key={index}>
                  {type === SCORES && (
                    <label>
                      <p>{index + 1}) {criterion}</p>
                      <select className="question__select select">
                        {Array(5).fill(0).map((_, index) => <option key={index} value={index + 1}>{index + 1}</option>)}
                      </select>
                    </label>
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
          <label className="popup__label">
            <p>{criteries[0]} ({units})</p>
            <input type="number" min="0" required className="input" />
          </label>
        )}

        {type === PERCENTS && <>
          <label className="popup__label">
            <p>{m}</p>
            <input type="number" name="m" min="0" required className="input" />
          </label>
          <label className="popup__label">
            <p>{h}</p>
            <input type="number" name="h" min="0" required className="input" />
          </label>
        </>}
        <button className="popup__save btn">Сохранить</button>
      </form>
    </div>
  )
}

export default Popup