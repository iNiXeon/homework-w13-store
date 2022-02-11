import axios from 'axios'
import actions from '../listActions'

const initialState = { goods: [], currency: { USD: 0, EUR: 0, CAD: 0, current: 'USD' } }

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.GET_ALL_GOODS:
      return { ...state, goods: action.payload }
    case actions.GET_CURRENCY:
      return { ...state, currency: { ...state.currency, ...action.payload } }
    case actions.CHANGE_CURRENCY:
      return { ...state, currency: { ...state.currency, current: action.payload } }
    default:
      return state
  }
}

export function actionGetAllGoods() {
  return (dispatch) => {
    axios('/api/v1/goods').then(({ data }) => {
      dispatch({ type: actions.GET_ALL_GOODS, payload: data })
    })
  }
}

export function actionGetCurrency() {
  return (dispatch) => {
    axios('/api/v1/currency').then(({ data }) => {
      dispatch({ type: actions.GET_CURRENCY, payload: data })
    })
  }
}

export const actionChangeCurrency = (currencyName) => {
    return { type: actions.CHANGE_CURRENCY, payload: currencyName }
}
