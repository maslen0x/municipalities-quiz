import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchMunicipalities } from './actions/municipalities'
import { fetchQuestions } from './actions/questions'

const App = () => {
  const dispatch = useDispatch()

  const municipalities = useSelector(({ municipalities }) => municipalities)
  const questions = useSelector(({ questions }) => questions)

  useEffect(() => {
    dispatch(fetchMunicipalities())
    dispatch(fetchQuestions())
  }, [dispatch])

  return (
    <div className="wrapper">
      <select name="municipalities[]" defaultValue="DEFAULT" className="select">
        <option value="DEFAULT" disabled>Выберите муниципальное образование</option>
        {municipalities && (
          municipalities.map(municipality => (
            <option key={municipality._id} value={municipality.name}>{municipality.name}</option>
          ))
        )}
      </select>
      <div>
        {questions && questions.map(question => (
          <div style={{ maxWidth: 1200, margin: '15px auto' }}>
            <b>{question.number}</b>
            <p>{question.indicator}</p>
            <small>{question.description}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App