import React from 'react'
import { useSelector } from 'react-redux'

import { getSource, getDescription, getRatingScale, getUnits } from '../utils/parseQuestionData'

const TableOfIndicators = () => {
  const questions = useSelector(({ questions }) => questions)

  return (
    <div className="indicators-table">
      <div className="indicators-table__container container">
        <table className="indicators-table__table">
          <caption className="indicators-table__title title">Показатели</caption>
          <thead>
            <tr>
              <td>№ строки</td>
              <td>№ показателя</td>
              <td>Наименование показателя</td>
              <td>Источник данных для расчета показателя</td>
              <td>Описание показателя (критерия оценки показателя)</td>
              <td>Шкала оценки</td>
              <td>Единицы измерения</td>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question._id}>
                <td>{index + 1}</td>
                <td>{question.number}</td>
                <td>{question.indicator}</td>
                <td>{getSource(question.source)}</td>
                <td>{getDescription(question)}</td>
                <td>{getRatingScale(question)}</td>
                <td>{question.units || getUnits(question.source)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableOfIndicators