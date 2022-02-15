import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { actionGetCurrency, actionChangeCurrency, actionSortByName, actionSortByPrice } from '../redux/reducers/mainPage'

const Header = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionGetCurrency())
    dispatch(actionChangeCurrency('USD'))
    dispatch(actionSortByPrice())
    dispatch(actionSortByName())
  }, [])

  const currency = useSelector((state) => state.magazine.currency)

  return (
    <div>
      <div className="BodyHeader flex flex-row mr-auto">
        <Link id="brand-name" to="/">
          Homework w13: Store _
        </Link>
        <div className="ml-auto">
          <Link id="order-count" to="/basket">
            Корзина(0)
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
            <button type="button" className="sort-price" onClick={dispatch(actionSortByPrice())}>
              ⇵ цена
            </button>
            <div>&nbsp;|&nbsp;</div>
            <button type="button" className="sort-name" onClick={dispatch(actionSortByName())}>
              ⇵ имя
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
