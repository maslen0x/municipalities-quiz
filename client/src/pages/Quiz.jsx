import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Question from '../components/Question'

import { setQuiz, fetchQuiz } from '../actions/quiz'

const Quiz = () => {
  const dispatch = useDispatch()

  const [municipality, setMunicipality] = useState(null)

  const municipalities = useSelector(({ municipalities }) => municipalities)
  const questions = useSelector(({ questions }) => questions)
  const quiz = useSelector(({ quiz }) => quiz)

  const onSend = () => {
    if(!municipality)
      return alert('Выберите муниципальное образование')

    if(quiz.length < questions.length) {
      const left = questions.length - quiz.length
      return alert(`Введите все показатели, осталось ${left}`)
    }

    const data = quiz.map(question => ({ ...question, municipality, date: Date.now() }))
    fetchQuiz(data)

    localStorage.removeItem('quiz')
    dispatch(setQuiz([]))
  }

  const onSelect = e => {
    const currentMunicipality = e.target.value
    setMunicipality(currentMunicipality)
    localStorage.setItem('municipality', currentMunicipality)
  }

  useEffect(() => {
    const currentMunicipality = localStorage.getItem('municipality')
    currentMunicipality && setMunicipality(currentMunicipality)
  }, [])

  useEffect(() => {
    quiz.length && localStorage.setItem('quiz', JSON.stringify(quiz))
  }, [quiz])

  useEffect(() => {
    const localQuiz = JSON.parse(localStorage.getItem('quiz'))
    localQuiz && dispatch(setQuiz(localQuiz))
  }, [dispatch])

  return (
    <div className="container">
      <div className="quiz card">
        <select onChange={onSelect} value={municipality || 'DEFAULT'} name="municipalities[]" className="quiz__select select">
          <option value="DEFAULT" disabled>Выберите муниципальное образование</option>
          {municipalities.map(municipality => (
            <option key={municipality._id} value={municipality._id}>{municipality.name}</option>
          ))}
        </select>
        <div className="quiz__questions">
          {questions.map(question => <Question key={question._id} {...question} />)}
        </div>
        <button onClick={onSend} className="quiz__btn btn">Отправить</button>
      </div>
    </div>
  )
}

export default Quiz
