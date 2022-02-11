import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Head from '../components/bodyHeader'
import Main from '../components/itemGoods'
import NotFound from '../components/404'
import store from '../redux'

import '../css/main.css'

const RootComponent = () => {
  return (
    <Provider store={store}>
      <Head />
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default RootComponent
