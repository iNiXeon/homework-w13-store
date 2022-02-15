import axios from 'axios'
import actions from '../listActions'

const initialState = { goods: [], cart: [], currency: { USD: 0, EUR: 0, CAD: 0, current: 'USD' } }

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.GET_ALL_GOODS:
      return { ...state, goods: action.payload }
    case actions.GET_CURRENCY:
      return { ...state, currency: { ...state.currency, ...action.payload } }
    case actions.CHANGE_CURRENCY:
      return { ...state, currency: { ...state.currency, current: action.payload } }
    case actions.ADD_TO_CART:
      return { ...state, cart: action.payload }
    case actions.SORT_BY_NAME:
      return {
        ...state,
        goods: state.goods.sort((a, b) => {
          return a.title > b.title
        })
      }
    case actions.SORT_BY_PRICE:
      return {
        ...state,
        goods: state.goods.sort((a, b) => {
          return a.price > b.price
        })
      }
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

export const actionAddItemToCart = (itemId) => {
  return { type: actions.ADD_TO_CART, payload: itemId }
}

export const actionSortByName = () => {
  return { type: actions.SORT_BY_NAME }
}

export const actionSortByPrice = () => {
  return { type: actions.SORT_BY_PRICE }
}
