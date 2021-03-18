import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Quiz from './pages/Quiz'
import Auth from './pages/Auth'
import Questions from './pages/Questions'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import { auth } from './actions/user'
import { fetchMunicipalities } from './actions/municipalities'
import { fetchQuestions } from './actions/questions'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => user.currentUser)
  const isReady = useSelector(({ user }) => user.isReady)

  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(auth(token))
    dispatch(fetchMunicipalities())
    dispatch(fetchQuestions())
  }, [dispatch])

  return isReady && (
    user ? (
      <div className="page">
        <Header />
        <Sidebar />
        <main className="main">
          <Switch>
            <Route path="/questions" component={Questions} />
            <Redirect to="/questions" />
          </Switch>
        </main>
      </div>
    ) : (
      <Switch>
        <Route exact path="/" component={Quiz} />
        <Route path="/login" component={Auth} />
        <Redirect to="/" />
      </Switch>
    )
  )
}

export default App