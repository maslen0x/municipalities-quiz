import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'

import { apiUrl } from './constants'

import App from './App'

import store from './store'

import './assets/sass/index.sass'

axios.defaults.baseURL = apiUrl

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)