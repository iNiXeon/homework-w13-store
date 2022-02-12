import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionGetCurrency, actionChangeCurrency } from '../redux/reducers/mainPage'

const Header = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionGetCurrency())
    dispatch(actionChangeCurrency('USD'))
  }, [])

  const currency = useSelector((state) => state.magazine.currency)

  return (
    <div>
      <div className="BodyHeader">Homework w13: Store _</div>
      <div className="BodyBottomHeader">
        <div className="BodyBottomHeader__currency flex">
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
        <div>Корзина(0)</div>
      </div>
    </div>
  )
}

export default Header
