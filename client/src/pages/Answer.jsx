import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Filter from '../components/Filter'
import Question from '../components/Question'

import { fetchAnswer, setQuiz } from '../actions/quiz'

import useChange from '../hooks/useChange'

const Answer = () => {
  const dispatch = useDispatch()

  const initialData = {
    question: 'DEFAULT',
    municipality: 'DEFAULT',
    date: new Date().getFullYear()
  }

  const data = useChange(initialData)

  const token = useSelector(({ user }) => user.token)
  const quiz = useSelector(({ quiz }) => quiz)
  const questions = useSelector(({ questions }) => questions)
  const municipalities = useSelector(({ municipalities }) => municipalities)

  const onAdd = () => {
    const { question, municipality, date } = data.state

    if(municipality === 'DEFAULT')
      return alert('Выберите МО')

    if(!date)
      return alert('Введите год')

    const answer = {
      ...quiz.find(answer => answer.question === question),
      municipality,
      date: new Date(`01.01.${date} 12:00`).toJSON()
    }
    fetchAnswer(token, answer)
  }

  const onQuestionChange = e => {
    const { name, value } = e.target
    const { state, setState } = data
    setState({ ...state, [name]: value })
  }

  useEffect(() => {
    quiz.length && localStorage.setItem('quiz', JSON.stringify(quiz))
  }, [quiz])

  useEffect(() => {
    const localQuiz = JSON.parse(localStorage.getItem('quiz'))
    localQuiz && dispatch(setQuiz(localQuiz))
  }, [dispatch])

  return (
    <div className="answer">
      <div className="answer__container container">
        <div className="answer__header">
          <div className="answer__filters filters">
            <ul className="filters__list">
              <Filter onChange={onQuestionChange} caption="Показатель" name="question" defaultValue="Не выбрано" isDisabled={true}>
                {questions.map(question => (
                  <option key={question._id} value={question._id}>{question.number}</option>
                ))}
              </Filter>
              <Filter onChange={data.onChange} caption="МО" name="municipality" defaultValue="Не выбрано" isDisabled={true}>
                {municipalities.map(municipality => (
                  <option key={municipality._id} value={municipality._id}>{municipality.name}</option>
                ))}
              </Filter>
              <li className="filters__item">
                <p className="filters__caption">Год</p>
                <input onChange={data.onChange} value={data.state.date} name="date" type="number" min="0" className="filters__input input" />
              </li>
            </ul>
          </div>
        </div>
        <div className="answer__form">
          {data.state.question !== 'DEFAULT' && (
            <>
              <Question {...questions.find(question => question._id === data.state.question)} />
              <button onClick={onAdd} className="answer__btn btn">Отправить</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Answer