import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Filter from '../components/Filter'
import IndicatorsCard from '../components/IndicatorsCard'

import { fetchIndicators, setIndicators } from '../actions/indicators'
import { fetchRemoveQuestion, fetchRestoreQuestion } from '../actions/questions'

import useChange from '../hooks/useChange'

import getQueryString from '../utils/getQueryString'

const Indicators = () => {
  const dispatch = useDispatch()

  const token = useSelector(({ user }) => user.token)
  const indicators = useSelector(({ indicators }) => indicators)
  const questions = useSelector(({ questions }) => questions)
  const years = useSelector(({ years }) => years)
  const isLoading = useSelector(({ isLoading }) => isLoading)

  const filters = useChange({
    question: 'DEFAULT',
    date: 'DEFAULT'
  })

  useEffect(() => {
    dispatch(fetchIndicators(token))
    return () => dispatch(setIndicators([]))
  }, [dispatch, token])

  useEffect(() => {
    const query = getQueryString(filters.state)
    dispatch(fetchIndicators(token, query))
  }, [filters.state, dispatch, token])

  const onAction = (id, token, confirm, cb) => {
    if(window.confirm(confirm)) {
      const query = getQueryString(filters.state)
      const reload = () => dispatch(fetchIndicators(token, query))
      dispatch(cb(token, id, reload))
    }
  }

  const onRemove = id => onAction(
    id,
    token,
    'Вы действительно хотите удалить показатель? Все отчеты по нему сохранятся, но он не будет доступен в общем опросе.',
    fetchRemoveQuestion
  )

  const onRestore = id => onAction(
    id,
    token,
    'Вы действительно хотите восстановить показатель? Он будет доступен в общем опросе.',
    fetchRestoreQuestion
  )

  return (
    <div className="indicators">
      <div className="indicators__container container">
        <div className="indicators__header">
          <div className="indicators__filters filters">
            <ul className="filters__list">
              <Filter onChange={filters.onChange} caption="Показатель" name="question">
                {questions.map(question => (
                  <option key={question._id} value={question._id}>{question.number}</option>
                ))}
              </Filter>
              <Filter onChange={filters.onChange} caption="Год" name="date">
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Filter>
            </ul>
          </div>
        </div>
        <ul className="indicators__list">
          {!isLoading ? (
            indicators.length ? (
              indicators.map(group => (
                <li key={group.year} className="indicators__item">
                  <p className="indicators__year title">
                    {group.year}
                  </p>
                  {group.answers.map(card => (
                    <IndicatorsCard key={card._id} {...card} onRemove={onRemove} onRestore={onRestore} />
                  ))}
                </li>
              ))
            ) : 'Список пуст'
          ) : 'Загрузка...'}
        </ul>
      </div>
    </div>
  )
}

export default Indicators
