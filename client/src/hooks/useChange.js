import { useState } from 'react'

const useChange = initialState => {
  const [state, setState] = useState(initialState)

  const onChange = e => {
    const { name, value } = e.target
    setState({ ...state, [name]: value})
  }

  return {
    state,
    onChange
  }
}

export default useChange