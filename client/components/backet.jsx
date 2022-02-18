import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionRemoveItemFromCart } from '../redux/reducers/mainPage'

const renderCards = (cards, currency, dispatch) => {
  console.log(cards)
  const output = cards.map((card) => {
    return (
      <div key={card.id} className="flex flex-column space-x-1 m-4">
        <div className="flex flex-row">
          <img className="card__image object-cover max-h-[18vh]" src={card.image} alt="" />
          <div className="card__title flex justify-start row w-[90%] font-semibold  m-2">
            Title: {card.title}
          </div>
          <div className="card__price relative flex justify-start row">
            Price {currency.current}: {card.price * currency[currency.current].toFixed(2)}
          </div>
          <div className="product__amout border-b">Count: {card.count}</div>
          <button
            type="button"
            className="product__remove rounded-full"
            onClick={() => dispatch(actionRemoveItemFromCart(card.id))}
          >
            remove from basket
          </button>
        </div>
      </div>
    )
  })
  return <div>{output}</div>
}

const Basket = () => {
  const dispatch = useDispatch()
  const goods = useSelector((state) => state.magazine.goods)
  const currency = useSelector((state) => state.magazine.currency)
  const cart = useSelector((state) => state.magazine.cart)
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
  const cards = Object.keys(cart)
    .filter((itemId) => cart[itemId] > 0)
    .map((itemId) => {
      return {
        ...goods.filter((a) => a.id === itemId)[0],
        count: cart[itemId]
      }
    })
  return (
    <div>
      <div>{renderCards(cards, currency, dispatch)}</div>
      <div id="product__total_price" className='m-2'>
        Total: {inCart * currency[currency.current].toFixed(2)}
      </div>
    </div>
  )
}

export default Basket
