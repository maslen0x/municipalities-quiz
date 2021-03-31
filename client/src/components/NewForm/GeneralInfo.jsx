import React from 'react'

import Actions from './Actions'
import Label from '../Label'

import { AVERAGE, SCORES, CHECKBOXES, PERCENTS } from '../../constants'

import useChange from '../../hooks/useChange'

import { getType } from '../../utils/parseQuestionData'

const GeneralInfo = ({ number, indicator, type, onIncStep }) => {
  const types = [AVERAGE, SCORES, CHECKBOXES, PERCENTS]

  const data = useChange({
    number: number || '',
    indicator: indicator || '',
    type: type || 'DEFAULT'
  })

  return (
    <>
      <Label label="Номер" className="new__label">
        <input onChange={data.onChange} value={data.state.number} name="number" type="text" className="new__input input" />
      </Label> 
      <Label label="Наименование" className="new__label">
        <input onChange={data.onChange} value={data.state.indicator} name="indicator" type="text" className="new__input input" />
      </Label>
      <Label label="Тип" className="new__label">
        <select onChange={data.onChange} value={data.state.type} name="type" className="new__select select">
          <option value="DEFAULT" disabled>Выберите тип</option>
          {types.map(type => <option key={type} value={type}>{getType(type)}</option>)}
        </select>
      </Label>
      <Actions data={data.state} onIncStep={onIncStep} prev={false} />
    </>
  )
}

export default GeneralInfo
