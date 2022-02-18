import axios from 'axios'
import actions from '../listActions'

const initialState = {
  goods: [],
  cart: {},
  currency: { USD: 0, EUR: 0, CAD: 0, current: 'USD' },
  sorting: 'title_up'
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.GET_ALL_GOODS:
      return { ...state, goods: action.payload }
    case actions.GET_CURRENCY:
      return { ...state, currency: { ...state.currency, ...action.payload } }
    case actions.CHANGE_CURRENCY:
      return { ...state, currency: { ...state.currency, current: action.payload } }
    case actions.ADD_TO_CART:
      return {
        ...state,
        cart: { ...state.cart, [action.payload]: (state.cart[action.payload] || 0) + 1 }
      }
    case actions.REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: state.cart[action.payload] > 0 ? state.cart[action.payload] - 1 : 0
        }
      }
    case actions.SORT_BY_PRICE: {
      let sorting = 'price_up'
      let goods = []
      if (state.sorting === 'price_up') {
        sorting = 'price_down'
        goods = [...state.goods].sort((a, b) => {
          return a.price - b.price
        })
      } else {
        sorting = 'price_up'
        goods = [...state.goods].sort((a, b) => {
          return b.price - a.price
        })
      }
      return {
        ...state,
        sorting,
        goods
      }
    }
    case actions.SORT_BY_NAME: {
      let sorting = 'title_up'
      let goods = []
      if (state.sorting === 'title_up') {
        sorting = 'title_down'
        goods = [...state.goods].sort((a, b) => {
          if (a.title_up < b.title_up) {
            return 1
          }
          if (a.title > b.title) {
            return -1
          }
          return 0
        })
      } else {
        goods = [...state.goods].sort((a, b) => {
          sorting = 'title_up'
          if (a.title > b.title) {
            return 1
          }
          if (a.title < b.title) {
            return -1
          }
          return 0
        })
      }
      return {
        ...state,
        sorting,
        goods
      }
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

export const actionRemoveItemFromCart = (itemId) => {
  return { type: actions.REMOVE_FROM_CART, payload: itemId }
}

export function actionSortByName() {
  return { type: actions.SORT_BY_NAME }
}

export const actionSortByPrice = () => {
  return { type: actions.SORT_BY_PRICE }
}
