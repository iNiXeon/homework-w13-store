import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  actionGetCurrency,
  actionChangeCurrency,
  actionSortByName,
  actionSortByPrice
} from '../redux/reducers/mainPage'

const Header = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionGetCurrency())
    dispatch(actionChangeCurrency('USD'))
    dispatch(actionSortByName())
    dispatch(actionSortByPrice())
  }, [])

  const currency = useSelector((state) => state.magazine.currency)
  const cart = useSelector((state) => state.magazine.cart)
  const goods = useSelector((state) => state.magazine.goods)
  const inCart = Object.keys(cart)
    .filter((itemID) => cart[itemID] > 0)
    .reduce((sumCart, itemID) => {
      return (
        sumCart +
        parseInt(
          goods.filter((good) => good.id === itemID).map((good) => good.price * cart[itemID]),
          10
        )
      )
    }, 0)

  return (
    <div>
      <div className="BodyHeader flex flex-row mr-auto">
        <Link id="brand-name" to="/">
          Homework w13: Store _
        </Link>
        <div className="ml-auto">
          <Link id="order-count" to="/basket">
            Корзина({(inCart * currency[currency.current].toFixed(2)).toFixed(2)}
            &nbsp;{currency.current})
          </Link>
        </div>
      </div>
      <div className="BodyBottomHeader block">
        <div className="BodyBottomHeader__currency flex">
          <div className="mr-auto flex flex-row">
            <div>Валюта:</div>
            <div className="flex spaced">
              <button
                type="button"
                className="ml-1"
                onClick={() => dispatch(actionChangeCurrency('USD'))}
              >
                [USD:{currency.USD.toFixed(2)}]
              </button>
              <button
                type="button"
                className="ml-1"
                onClick={() => dispatch(actionChangeCurrency('EUR'))}
              >
                [EUR:{currency.EUR.toFixed(2)}]
              </button>
              <button
                type="button"
                className="ml-1"
                onClick={() => dispatch(actionChangeCurrency('CAD'))}
              >
                [CAD:{currency.CAD.toFixed(2)}]
              </button>
            </div>
          </div>
          <div className="flex flex-row ml-auto">
            <button type="button" id="sort-price" onClick={() => dispatch(actionSortByPrice())}>
              ⇵ цена
            </button>
            <div>&nbsp;|&nbsp;</div>
            <button type="button" id="sort-name" onClick={() => dispatch(actionSortByName())}>
              ⇵ имя
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
