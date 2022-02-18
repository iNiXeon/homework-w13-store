import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import BodyHeader from '../components/bodyHeader'
import NotFound from '../components/404'
import Main from '../components/itemGoods'
import Basket from '../components/backet'
import Startup from './startup'

import '../css/main.css'

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <BodyHeader />
        <Startup>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/basket" component={Basket} />
            <Route component={NotFound} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
