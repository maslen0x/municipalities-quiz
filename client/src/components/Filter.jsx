import React from 'react'

const Filter = ({ onChange, caption, name, children, defaultValue = 'Без фильтра', isDisabled = false }) => {
  return (
    <li className="filters__item">
      <p className="filters__caption">{caption}</p>
      <select onChange={onChange} name={name} defaultValue="DEFAULT" className="filters__select select">
        <option value="DEFAULT" disabled={isDisabled}>{defaultValue}</option>
        {children}
      </select>
    </li>
  )
}

export default Filter
