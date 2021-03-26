import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Quiz from './pages/Quiz'
import Auth from './pages/Auth'
import Info from './pages/Info'
import TableOfIndicators from './pages/TableOfIndicators'
import Results from './pages/Results'
import Report from './pages/Report'
import indicators from './pages/indicators'
import Rating from './pages/Rating'
import Graphics from './pages/Graphics'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import { auth } from './actions/user'
import { fetchMunicipalities } from './actions/municipalities'
import { fetchQuestions } from './actions/questions'
import { fetchYears } from './actions/years'

const App = () => {
  const dispatch = useDispatch()

  const token = useSelector(({ user }) => user.token)
  const isReady = useSelector(({ user }) => user.isReady)
  const user = useSelector(({ user }) => user.currentUser)
  const years = useSelector(({ years }) => years)
  const municipalities = useSelector(({ municipalities }) => municipalities)
  const questions = useSelector(({ questions }) => questions)

  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(auth(token))
    dispatch(fetchMunicipalities())
    dispatch(fetchQuestions())
  }, [dispatch])

  useEffect(() => {
    if(!token)
      return
    dispatch(fetchYears(token))
  }, [dispatch, token])

  const routes = [
    { path: '/', exact: true, component: Info },
    { path: '/table-of-indicators', component: TableOfIndicators },
    { path: '/results/:id', component: Report },
    { path: '/results', component: Results },
    { path: '/indicators', component: indicators },
    { path: '/rating', component: Rating },
    { path: '/graphics', component: Graphics }
  ]

  return (isReady && municipalities && questions) ? (
    user ? (
      years && (
        <div className="page">
          <Sidebar />
          <Header />
          <main className="main">
            <Switch>
              {routes.map(route => <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)}
              <Redirect to="/" />
            </Switch>
          </main>
        </div>
      )
    ) : (
      <Switch>
        <Route exact path="/" component={Quiz} />
        <Route path="/login" component={Auth} />
        <Redirect to="/" />
      </Switch>
    )
  ) : 'Загрузка...'
}

export default App