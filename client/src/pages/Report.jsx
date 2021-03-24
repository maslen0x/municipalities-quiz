import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Answer from '../components/Answer'

import { fetchFullAnswer, setFullAnswers } from '../actions/answers'

import getMunicipalityName from '../utils/getMunicipalityName'

const Report = () => {
  const dispatch = useDispatch()

  const token = useSelector(({ user }) => user.token)
  const municipalities = useSelector(({ municipalities }) => municipalities)
  const questions = useSelector(({ questions }) => questions)
  const answers = useSelector(({ answers }) => answers.full)

  const [parsedAnswers, setParsedAnswers] = useState(answers)

  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchFullAnswer(token, id))
    return () => dispatch(setFullAnswers(null))
  }, [dispatch, token, id])

  useEffect(() => {
    const mapped = answers && [...answers]
      .map(answer => ({
        ...answer,
        question: questions.find(question => question._id === answer.question)
      }))
      .sort((a, b) => a.question.number > b.question.number ? 1 : -1)
    setParsedAnswers(mapped)
  }, [answers, questions])

  return (
    <section className="report">
      <h2 className="report__title title">{getMunicipalityName(municipalities, id)}</h2>
      <ul className="report__list">
        {parsedAnswers ? (
          parsedAnswers.map(answer => (
            <li key={answer._id} className="report__item">
              <Answer {...answer} />
            </li>
          ))
        ) : 'Загрузка...'}
      </ul>
    </section>
  )
}

export default Report
