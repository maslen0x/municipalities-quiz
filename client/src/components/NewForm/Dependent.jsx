import React from 'react'

import Label from '../Label'
import Actions from './Actions'

import { PERCENTS, AVERAGE, RESPONDENTS, EXPERTS, FACTS } from '../../constants'

import useChange from '../../hooks/useChange'

import { getSource } from '../../utils/parseQuestionData'

const Dependent = ({ type, source, units, onIncStep, onDecStep }) => {
  const sources = [RESPONDENTS, EXPERTS]

  const data = useChange({
    source: source || 'DEFAULT',
    units: type === AVERAGE ? (units || '') : undefined
  })

  return (
    <>
      <Label label="Источник данных" className="new__label">
        <select onChange={data.onChange} value={data.state.source} name="source" className="new__select select">
          <option value="DEFAULT" disabled>Выберите источник данных</option>
          {type !== PERCENTS ? <>
            {sources.map(source => <option key={source} value={source}>{getSource(source)}</option>)}
          </> : (
            <option value="FACTS">{getSource(FACTS)}</option>
          )}
        </select>
      </Label>

      {type === AVERAGE && (
        <Label label="Единицы измерения (в родительном падеже)" className="new__label">
          <input onChange={data.onChange} value={data.state.units} name="units" type="text" className="new__input input" />
        </Label>
      )}

      <Actions data={data.state} onIncStep={onIncStep} onDecStep={onDecStep} />
    </>
  )
}

export default Dependent