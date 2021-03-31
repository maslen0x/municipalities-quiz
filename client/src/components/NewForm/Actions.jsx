import React from 'react'

const Actions = ({ data, onDecStep, onIncStep, prev = true, next = true, finish = false, handleAdd }) => {
  const handleDecStep = () => {
    const empty = Object.keys(data).reduce((acc, key) => {
      acc = { ...acc, [key]: undefined }
      return acc
    }, {})
    onDecStep(empty)
  }

  const handleIncStep = () => {
    const values = Object.values(data)
    const empty = values.filter(el => el === 'DEFAULT' || (typeof el === 'string' && el.trim() === ''))
    const isValid = !empty.length
    isValid
      ? onIncStep(data)
      : alert('Заполните все поля')
  }

  return (
    <div className="new__actions">
      {prev && <button onClick={handleDecStep} className="new__prev btn">Предыдущий шаг</button>}
      {next && <button onClick={handleIncStep} className="new__next btn">Следующий шаг</button>}
      {finish && <button onClick={handleAdd} className="new__add btn">Добавить показатель</button>}
    </div>
  )
}

export default Actions