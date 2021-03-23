import React from 'react'

import { AVERAGE, CHECKBOXES, SCORES, PERCENTS } from '../constants'

import getRandom from '../utils/getRandom'
import { getSource, getDescription, getAnswerer, getUnits } from '../utils/parseQuestionData'
import convertCheckboxesToScores from '../utils/convertCheckboxesToScores'
import countResult from '../utils/countResult'

const Answer = ({ question, evaluations, m, h }) => {
  return (
    <article className="answer-card">
      <p className="answer-card__title"><b>{question.number}</b> {question.indicator}</p>
      <p className="answer-card__source">{getSource(question.source)}</p>
      <div className="answer-card__description">{getDescription(question)}</div>

      {question.type === AVERAGE && <>
        <ul className="answer-card__list">
          {evaluations[0].map((value, index) => (
            <li key={getRandom()} className="answer-card__item">
              {getAnswerer(question.source)} {index + 1}: {value} ({question.units})
            </li>
          ))}
        </ul>
        <p className="question__result">Результат: {countResult(question.type, evaluations[0])} ({question.units})</p>
      </>}

      {question.type === SCORES && <>
        <ul className="answer-card__list">
          {evaluations.map((evaluation, index) => (
            <li key={getRandom()} className="answer-card__item">
              {getAnswerer(question.source)} {index + 1}: {evaluation.map((value, index) => index === 0 ? value : `, ${value}`)}
            </li>
          ))}
        </ul>
        <p className="question__result">Результат: {countResult(question.type, evaluations)} {getUnits(question.source)}</p>
      </>}

      {question.type === CHECKBOXES && <>
        <ul className="answer-card__list">
          {evaluations.map((evaluation, index) => (
            <li key={getRandom()} className="answer-card__item">
              {getAnswerer(question.source)} {index + 1}: {convertCheckboxesToScores(evaluation)}
            </li>
          ))}
        </ul>
        <p className="question__result">Результат: {countResult(question.type, evaluations)} {getUnits(question.source)}</p>
      </>}

      {question.type === PERCENTS && <>
        <div className="answer-card__percents">
          <p>{m} — {question.m}</p>
          <p>{h} — {question.h}</p>
        </div>
        <p className="question__result">Результат: {countResult(question.type, { m, h })}%</p>
      </>}
    </article>
  )
}

export default Answer