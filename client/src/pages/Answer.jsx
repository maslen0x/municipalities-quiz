import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Filter from '../components/Filter'
import Question from '../components/Question'

import { setQuiz } from '../actions/quiz'

import useChange from '../hooks/useChange'

const Answer = () => {
  const dispatch = useDispatch()

  const data = useChange({
    question: 'DEFAULT',
    municipality: 'DEFAULT',
    date: new Date().getFullYear()
  })

  const token = useSelector(({ user }) => user.token)
  const quiz = useSelector(({ quiz }) => quiz)
  const questions = useSelector(({ questions }) => questions)
  const municipalities = useSelector(({ municipalities }) => municipalities)

  const onAdd = () => {
    console.log('question', data.state.question)
    console.log('municipality', data.state.municipality)
    console.log('date', data.state.date)
  }

  const onQuestionChange = e => {
    const { name, value } = e.target
    const { state, setState } = data
    setState({ ...state, [name]: value})
    // quiz.length && dispatch(setQuiz([]))
  }

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
            <Question {...questions.find(question => question._id === data.state.question)} />
          )}
          <button onClick={onAdd} className="answer__btn btn">Отправить</button>
        </div>
      </div>
    </div>
  )
}

export default Answer