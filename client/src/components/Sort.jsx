import React from 'react'

const Sort = ({ onChange, caption, name, options, className }) => {
  return (
    <div className={`${className} sort`}>
      <p className="sort__caption">{caption}</p>
      <select onChange={onChange} name={name} defaultValue="DEFAULT" className="sort__select select">
        <option value="DEFAULT">Без сортировки</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Sort
