const getRatingResult = (answer, index) => {
  const between = (value, min, max) => value >= min && value <= max

  const number = index + 1

  if(between(number, 1, 5))
    return {
      ...answer,
      result: 10
    }

  if(between(number, 6, 15))
    return {
      ...answer,
      result: 7
    }

  if(between(number, 16, 25))
    return {
      ...answer,
      result: 4
    }

  if(between(number, 26, 35))
    return {
      ...answer,
      result: 2
    }

  if(number >= 36)
    return {
      ...answer,
      result: 1
    }

  return answer
}

export default getRatingResult