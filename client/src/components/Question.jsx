import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SCORES, CHECKBOXES, AVERAGE, PERCENTS } from '../constants'

import { setAnswer, removeAnswer } from '../actions/quiz'

import { getSource, getAnswerer } from '../utils/parseQuestionData'
import getRandom from '../utils/getRandom'
import convertCheckboxesToScores from '../utils/convertCheckboxesToScores'
import countResult from '../utils/countResult'

const Question = ({ _id, number, indicator, type, source, description, units, criteries, m, h }) => {
  const dispatch = useDispatch()

  const [popupVisible, setPopupVisible] = useState(false)
  const [evaluations, setEvaluations] = useState([])
  const [answerer, setAnswerer] = useState(null)

  const quiz = useSelector(({ quiz }) => quiz)

  const onOpenPopup = () => {
    setPopupVisible(true)
    document.documentElement.style.overflow = 'hidden'
  }

  const onClosePopup = () => {
    setPopupVisible(false)
    document.documentElement.style.overflow = ''
  }

  const onAddEvaluation = e => {
    e.preventDefault()
    const elements = Array.from(e.target.elements)

    const getValues = () => {
      switch(type) {
        case SCORES: {
          const selects = elements.filter(el => el.nodeName === 'SELECT')
          const values = selects.map(select => select.value)
          return values
        }

        case CHECKBOXES: {
          const checkboxes = elements.filter(el => el.nodeName === 'INPUT')
          const values = checkboxes.map(checkbox => +checkbox.checked)
          return values
        }

        case AVERAGE: {
          const value = elements.find(el => el.nodeName === 'INPUT').value
          return value
        }

        case PERCENTS: {
          const m = elements.find(el => el.name === 'm').value
          const h = elements.find(el => el.name === 'h').value
          return { m, h }
        }

        default:
          return null
      }
    }

    const values = getValues()

    const newEvaluations = type === PERCENTS ? values : [...evaluations, values]
    setEvaluations(newEvaluations)
    onClosePopup()

    const createAnswer = () => {
      return type === PERCENTS
        ? {
          question: _id,
          m: values.m,
          h: values.h
        }
        : {
          question: _id,
          evaluations: type === AVERAGE ? [newEvaluations] : newEvaluations
        }
    }
    const answer = createAnswer()
    dispatch(setAnswer(answer))
  }

  const onRemoveEvaluation = index => {
    const newEvaluations = evaluations.filter((_, i) =>  i !== index)
    setEvaluations(newEvaluations)

    const answer = {
      question: _id,
      evaluations: type === AVERAGE ? [newEvaluations] : newEvaluations
    }

    newEvaluations.length
      ? dispatch(setAnswer(answer))
      : dispatch(removeAnswer(_id))
  }

  const closePopupByClick = useCallback(e => e.target.classList.contains('popup') && onClosePopup(), [])
  const closePopupByKeydown = useCallback(e => e.key === 'Escape' && onClosePopup(), [])

  useEffect(() => {
    document.addEventListener('click', closePopupByClick)
    document.addEventListener('keydown', closePopupByKeydown)
    return () => {
      document.removeEventListener('click', closePopupByClick)
      document.removeEventListener('keydown', closePopupByKeydown)
    }
  }, [closePopupByClick, closePopupByKeydown])

  useEffect(() => {
    const answerer = getAnswerer(source)
    setAnswerer(answerer)
  }, [source])

  useEffect(() => {
    const answer = quiz.find(answer => answer.question === _id)
    if(answer) {
      type === PERCENTS && setEvaluations({ m: answer.m, h: answer.h });
      (type === SCORES || type === CHECKBOXES) && setEvaluations(answer.evaluations);
      type === AVERAGE && setEvaluations(answer.evaluations[0]);
    }
  }, [quiz, _id, type])

  return (
    <article className="question">
      <p className="question__title"><b>{number}</b> {indicator}</p>
      <p>{getSource(source)}</p>
      {description && <p>{description}</p>}

      {type === AVERAGE && <>
        <div className="question__criteries">
          {criteries[0]} ({units})
        </div>
        <ul className="question__answerers">
          {evaluations.map((evaluation, index) => (
            <li key={getRandom()}>
              <button onClick={() => onRemoveEvaluation(index)} aria-label="Удалить оценку" className="question__remove" />
              <button aria-label="Редактировать оценку" className="question__edit" />
              {answerer} {index + 1}: {evaluation}
            </li>
          ))}
        </ul>
        {!!countResult(AVERAGE, evaluations) && <p className="question__result">Результат: {countResult(AVERAGE, evaluations)}</p>}
      </>}

      {type === SCORES && <>
        <div className="question__criteries">
          <p>критерии оценки:</p>
          <ul>
            {criteries.map((criterion, index) => <li key={index}>{index + 1}) {criterion}</li>)}
          </ul>
          <p>шкала оценки: 1 – очень плохо, 2 – скорее плохо, 3 – нейтрально, 4 – хорошо, 5 – отлично</p>
        </div>
        <ul className="question__answerers">
          {evaluations.map((evaluation, index) => (
            <li key={getRandom()}>
              <button onClick={() => onRemoveEvaluation(index)} aria-label="Удалить оценку" className="question__remove" />
              <button aria-label="Редактировать оценку" className="question__edit" />
              {answerer} {index + 1}: {evaluation.map((value, index) => index === 0 ? value : `, ${value}`)}
            </li>
          ))}
        </ul>
        {!!countResult(SCORES, evaluations) && <p className="question__result">Результат: {countResult(SCORES, evaluations)}</p>}
      </>}

      {type === CHECKBOXES && <>
        <div className="question__criteries">
          <ul>
            {criteries.map((criterion, index) => <li key={index}>{index + 1}) {index !== criteries.length - 1 ? `${criterion};` : `${criterion}.`}</li>)}
          </ul>
        </div>
        <p>при соответствии: 3 критериям – 10 баллов; 2 критериям – 6 баллов; 1 критерию – 3 балла; отсутствие соответствий – 0 баллов</p>
        <ul className="question__answerers">
          {evaluations.map((evaluation, index) => (
            <li key={getRandom()}>
              <button onClick={() => onRemoveEvaluation(index)} aria-label="Удалить оценку" className="question__remove" />
              <button aria-label="Редактировать оценку" className="question__edit" />
              {answerer} {index + 1}: {convertCheckboxesToScores(evaluation)}
            </li>
          ))}
        </ul>
        {!!countResult(CHECKBOXES, evaluations) && <p className="question__result">Результат: {countResult(CHECKBOXES, evaluations)}</p>}
      </>}

      {evaluations.m && evaluations.h && <>
        <div className="question__percents">
          <p>{evaluations.m} — {m}</p>
          <p>{evaluations.h} — {h}</p>
        </div>
        <p className="question__result">Результат: {countResult(PERCENTS, evaluations)}%</p>
      </>}

      <button onClick={onOpenPopup} aria-label="Добавить оценку" className="question__add" />
      {popupVisible && (
        <div className="question__popup popup">
          <form onSubmit={onAddEvaluation} className="popup__body">
            <button type="button" onClick={onClosePopup} aria-label="Закрыть окно" className="popup__close" />
            {answerer && <p className="popup__title">{answerer} {evaluations.length + 1}</p>}
            {(type === SCORES || type === CHECKBOXES) && (
              <div className="question__criteries">
                <ul>
                  {criteries.map((criterion, index) => (
                    <li key={index}>
                      {type === SCORES && (
                        <label>
                          <p>{index + 1}) {criterion}</p>
                          <select className="question__select select">
                            {Array(5).fill(0).map((_, index) => <option key={index} value={index + 1}>{index + 1}</option>)}
                          </select>
                        </label>
                      )}

                      {type === CHECKBOXES && (
                        <label>
                          <input type="checkbox" />
                          {criterion}
                        </label>
                      )}
                    </li>)
                  )}
                </ul>
              </div>
            )}

            {type === AVERAGE && (
              <label className="popup__label">
                <p>{criteries[0]} ({units})</p>
                <input type="number" min="0" required className="input" />
              </label>
            )}

            {type === PERCENTS && <>
              <label className="popup__label">
                <p>{m}</p>
                <input type="number" name="m" min="0" required className="input" />
              </label>
              <label className="popup__label">
                <p>{h}</p>
                <input type="number" name="h" min="0" required className="input" />
              </label>
            </>}
            <button className="popup__save btn">Сохранить</button>
          </form>
        </div>
      )}
    </article>
  )
}

export default Question