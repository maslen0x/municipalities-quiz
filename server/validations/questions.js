const validation = ({ type, source, number, indicator, criteries, units, description, m, h }) => {
  if((type === 'PERCENTS' && source !== 'FACTS') || (type !== 'PERCENTS' && source === 'FACTS'))
    return 'Для типа PERCENTS разрешен только источник FACTS'

  if(!number || !indicator)
    return 'Введите номер и наименование показателя'

  if((type === 'SCORES' || type === 'CHECKBOXES') && !criteries.length)
    return 'Введите хотя бы 1 критерий'

  if(type === 'AVERAGE' && !units)
    return 'Введите единицы измерения'

  if((type === 'AVERAGE' || type === 'PERCENTS') && !description)
    return 'Введите описание'

  if(type === 'PERCENTS' && (!m || !h))
    return 'Введите m (делимое) и h (делитель)'

  return null
}

export default validation