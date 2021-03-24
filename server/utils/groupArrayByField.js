const groupArrayByField = (arr, fieldName) => {
  const groupes = arr.reduce((acc, el) => {
    const field = el[fieldName]
    acc[field] = [...(acc[field] || []), el]
    return acc
  }, {})
  return Object.values(groupes)
}

export default groupArrayByField