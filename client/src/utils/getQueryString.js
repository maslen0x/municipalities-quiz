const getQueryString = filters => {
  const keys = Object.keys(filters)
  const query = keys.reduce((query, key) => {
    return query += filters[key] !== 'DEFAULT'
      ? `${key}=${filters[key]}&`
      : ''
  }, '')
  return query
}

export default getQueryString