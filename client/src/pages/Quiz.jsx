import React from 'react'
import { useSelector } from 'react-redux'

const Quiz = () => {
  const municipalities = useSelector(({ municipalities }) => municipalities)
  const questions = useSelector(({ questions }) => questions)

  return (
    <div className="wrapper">
      {municipalities && questions ? (
        <>
          <select name="municipalities[]" defaultValue="DEFAULT" className="select">
            <option value="DEFAULT" disabled>Выберите муниципальное образование</option>
            {municipalities.map(municipality => (
                <option key={municipality._id} value={municipality.name}>{municipality.name}</option>
            ))}
          </select>
          <div>
            {questions.map(question => (
              <div key={question._id} style={{ maxWidth: 1200, margin: '15px auto' }}>
                <b>{question.number}</b>
                <p>{question.indicator}</p>
                <small>{question.description}</small>
              </div>
            ))}
          </div>
        </>
      ) : 'Загрузка...'}
      
    </div>
  )
}

export default Quiz
