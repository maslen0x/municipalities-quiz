const groupArrayByYear = arr => {
  const groupes = arr.reduce((acc, el) => {
    const year = new Date(el.date).getFullYear()
    acc[year] = [...(acc[year] || []), el]
    return acc
  }, {})
  return Object.values(groupes)
}

export default groupArrayByYear