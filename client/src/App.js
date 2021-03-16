import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchMunicipalities } from './actions/municipalities'

const App = () => {
  const dispatch = useDispatch()

  const municipalities = useSelector(({ municipalities }) => municipalities)

  useEffect(() => {
    dispatch(fetchMunicipalities())
  }, [dispatch])

  return (
    <div className="wrapper">
      <select name="municipalities[]" defaultValue="DEFAULT" className="select">
        <option value="DEFAULT" disabled>Выберите муниципальное образование</option>
        {municipalities && (
          municipalities.map(municipality => (
            <option key={municipality._id} value={municipality.name}>{municipality.name}</option>
          ))
        )}
      </select>
    </div>
  )
}

export default App