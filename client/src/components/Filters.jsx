import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Filters = ({ onSelectChange, className }) => {
  const [years, setYears] = useState(null)

  const municipalities = useSelector(({ municipalities }) => municipalities)
  const answers = useSelector(({ answers }) => answers.short)

  useEffect(() => {
    if(!answers)
      return
    const yearsArr = answers.map(answer => new Date(answer.date).getFullYear())
    const filteredYears = [...new Set(yearsArr.reverse())]
    setYears(filteredYears)
  }, [answers])

  return (
    <div className={`${className} filters`}>
      <ul className="filters__list">
        <li className="filters__item">
          <p className="filters__caption">Сортировка</p>
          <select onChange={onSelectChange} name="sort" defaultValue="DEFAULT" className="filters__select select">
            <option value="DEFAULT">Без сортировки</option>
            <option value="alphabet">По алфавиту</option>
            <option value="date">По дате</option>
            <option value="rating">По рейтингу</option>
          </select>
        </li>
        <li className="filters__item">
          <p className="filters__caption">МО</p>
          <select onChange={onSelectChange} name="municipality" defaultValue="DEFAULT" className="filters__select select">
          <option value="DEFAULT">Без фильтра</option>
          {municipalities.map(municipality => (
            <option key={municipality._id} value={municipality._id}>{municipality.name}</option>
          ))}
          </select>
        </li>
        <li className="filters__item">
          <p className="filters__caption">Год</p>
          <select onChange={onSelectChange} name="year" defaultValue="DEFAULT" className="filters__select select">
            <option value="DEFAULT">Без фильтра</option>
            {years && years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </li>
      </ul>
    </div>
  )
}

export default Filters