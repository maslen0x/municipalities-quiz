import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Quiz from './pages/Quiz'
import Auth from './pages/Auth'
import Info from './pages/Info'
import Indicators from './pages/Indicators'
import Results from './pages/Results'
import Report from './pages/Report'
import Graphics from './pages/Graphics'
import Rating from './pages/Rating'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import { auth } from './actions/user'
import { fetchMunicipalities } from './actions/municipalities'
import { fetchQuestions } from './actions/questions'
import { fetchYears } from './actions/answers'

const App = () => {
  const dispatch = useDispatch()

  const isReady = useSelector(({ user }) => user.isReady)
  const user = useSelector(({ user }) => user.currentUser)
  const years = useSelector(({ answers }) => answers.years)
  const municipalities = useSelector(({ municipalities }) => municipalities)
  const questions = useSelector(({ questions }) => questions)

  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(auth(token))
    dispatch(fetchYears(token))
    dispatch(fetchMunicipalities())
    dispatch(fetchQuestions())
  }, [dispatch])

  const routes = [
    { path: '/', exact: true, component: Info },
    { path: '/indicators', component: Indicators },
    { path: '/results/:id', component: Report },
    { path: '/results', component: Results },
    { path: '/graphics', component: Graphics },
    { path: '/rating', component: Rating }
  ]

  return (isReady && municipalities && questions && years) ? (
    user ? (
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