import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Answerers from './Answerers'
import Result from './Result'
import QuestionPopup from './QuestionPopup'

import { SCORES, CHECKBOXES, AVERAGE, PERCENTS } from '../../constants'

import { setAnswer, removeAnswer } from '../../actions/quiz'

import usePopup from '../../hooks/usePopup'

import { getSource, getAnswerer } from '../../utils/parseQuestionData'
import convertCheckboxesToScores from '../../utils/convertCheckboxesToScores'
import getValues from '../../utils/getValues'

const Question = ({ _id, number, indicator, type, source, description, units, criteries, m, h }) => {
  const dispatch = useDispatch()

  const { isPopupVisible, onOpenPopup, onClosePopup } = usePopup()
  const [evaluations, setEvaluations] = useState([])

  const quiz = useSelector(({ quiz }) => quiz)

  const onAddEvaluation = e => {
    e.preventDefault()
    const elements = Array.from(e.target.elements)
    const values = getValues(type, elements)
    const newEvaluations = type === PERCENTS ? values : [...evaluations, values]

    const createAnswer = (evaluations, questionId) => {
      const { m, h } = evaluations
      return type === PERCENTS
        ? { question: questionId, m, h }
        : { question: questionId, evaluations: type === AVERAGE ? [evaluations] : evaluations }
    }

    const answer = createAnswer(newEvaluations, _id)
    dispatch(setAnswer(answer))
    onClosePopup()
  }

  const onRemoveEvaluation = evaluationIndex => {
    const newEvaluations = evaluations.filter((_, index) => index !== evaluationIndex)

    const answer = {
      question: _id,
      evaluations: type === AVERAGE ? [newEvaluations] : newEvaluations
    }

    newEvaluations.length
      ? dispatch(setAnswer(answer))
      : dispatch(removeAnswer(_id))
  }

  useEffect(() => {
    const answer = quiz.find(answer => answer.question === _id)
    if(answer) {
      const { evaluations, m, h } = answer
      type === AVERAGE && setEvaluations(evaluations[0]);
      (type === SCORES || type === CHECKBOXES) && setEvaluations(evaluations);
      type === PERCENTS && setEvaluations({ m, h });
    } else {
      setEvaluations([])
    }
  }, [quiz, _id, type])

  return (
    <article className="question">
      <p className="question__title"><b>{number}</b> {indicator}</p>
      <p className="question__source">{getSource(source)}</p>
      {description && <p className="question__description">{description}</p>}

      {type === AVERAGE && <>
        <div className="question__criteries">
          {criteries[0]} ({units})
        </div>
        <Answerers
          evaluations={evaluations}
          answerer={getAnswerer(source)}
          onRemove={onRemoveEvaluation}
          getValues={evaluation => evaluation}
        />
        <Result type={AVERAGE} evaluations={evaluations} />
      </>}

      {type === SCORES && <>
        <div className="question__criteries">
          <p>критерии оценки:</p>
          <ul>
            {criteries.map((criterion, index) => <li key={index}>{index + 1}) {criterion}</li>)}
          </ul>
          <p>шкала оценки: 1 – очень плохо, 2 – скорее плохо, 3 – нейтрально, 4 – хорошо, 5 – отлично</p>
        </div>
        <Answerers
          evaluations={evaluations}
          answerer={getAnswerer(source)}
          onRemove={onRemoveEvaluation}
          getValues={evaluation => evaluation.map((value, index) => index === 0 ? value : `, ${value}`)}
        />
        <Result type={SCORES} evaluations={evaluations} />
      </>}

      {type === CHECKBOXES && <>
        <div className="question__criteries">
          <ul>
            {criteries.map((criterion, index) => (
              <li key={index}>
                {index + 1}) {index === criteries.length - 1 ? `${criterion}.` : `${criterion};`}
              </li>
            ))}
          </ul>
        </div>
        <p className="question__according">
          при соответствии: 3 критериям – 10 баллов; 2 критериям – 6 баллов; 1 критерию – 3 балла; отсутствие соответствий – 0 баллов
        </p>
        <Answerers
          evaluations={evaluations}
          answerer={getAnswerer(source)}
          onRemove={onRemoveEvaluation}
          getValues={evaluation => convertCheckboxesToScores(evaluation)}
        />
        <Result type={CHECKBOXES} evaluations={evaluations} />
      </>}

      {type === PERCENTS && <>
        <div className="question__percents">
          <p>{evaluations.m ? `${evaluations.m} —` : '1)'} {m}</p>
          <p>{evaluations.h ? `${evaluations.h} —` : '2)'} {h}</p>
        </div>
        <Result type={PERCENTS} evaluations={evaluations} />
      </>}

      <button onClick={onOpenPopup} aria-label="Добавить оценку" className="question__add" />

      {isPopupVisible && (
        <QuestionPopup
          onAdd={onAddEvaluation}
          onClose={onClosePopup}
          type={type}
          source={source}
          evaluations={evaluations}
          criteries={criteries}
          units={units}
          m={m}
          h={h}
        />
      )}
    </article>
  )
}

export default Question