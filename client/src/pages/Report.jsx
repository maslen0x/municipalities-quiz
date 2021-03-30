import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Answer from '../components/Answer'
import Loading from '../components/Loading'

import { fetchFullAnswer, setFullAnswers } from '../actions/answers'

import getMunicipalityName from '../utils/getMunicipalityName'

const Report = () => {
  const dispatch = useDispatch()

  const token = useSelector(({ user }) => user.token)
  const municipalities = useSelector(({ municipalities }) => municipalities)
  const answers = useSelector(({ answers }) => answers.full)

  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchFullAnswer(token, id))
    return () => dispatch(setFullAnswers([]))
  }, [dispatch, token, id])

  return (
    <section className="report">
      <h2 className="report__title title">{getMunicipalityName(municipalities, id)}</h2>
      <ul className="report__list">
        <Loading state={answers}>
          {answers.map(answer => (
            <li key={answer._id} className="report__item">
              <Answer {...answer} />
            </li>
          ))}
        </Loading>
      </ul>
    </section>
  )
}

export default Report