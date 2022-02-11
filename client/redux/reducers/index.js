import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import magazine from './mainPage'

const rootReducer = (history) =>
  combineReducers({
    magazine,
    router: connectRouter(history)
  })

export default rootReducer
