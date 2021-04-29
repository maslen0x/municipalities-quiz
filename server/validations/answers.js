const validation = ({ question, municipality, date, evaluations, m, h }) => {
  if(!question)
    return 'Введите показатель'

  if(!municipality)
    return 'Введите муниципалитет'

  if(!date)
    return 'Введите дату'

  if(!(evaluations || m || h) || (evaluations && !evaluations.length))
    return 'Введите значения'

  return null
}

export default validation