import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionGetAllGoods } from '../redux/reducers/mainPage'

const itemsInBasket = 0

const showItemsInBasket = () => {
  if (itemsInBasket > 0) {
    if (itemsInBasket < 100) {
      return itemsInBasket
    }
    return 99
  }
  return ''
}

const Good = (item, currency) => {
  const { title, description, price, image, id } = item
  return (
    <div key={id} className="flex flex-start m-2 h-[30vh] w-[37vh]">
      <div className="sticky flex-col container bg-neutral-100 p-1 rounded-xl h-[100%] w-[100%] ">
        <div className=" p-1 flex flex-start flex-row flex-nowrap">
          <div className="flex justify-start row w-[90%] font-semibold border-b">{title}</div>
        </div>
        <div className="p-1 flex flex-nowrap">
          <div className="flex justify-start row w-[60%] font-light">{description}</div>
          <div className="flex justify-end row w-[40%] max-h-[18vh] mr-1">
            <img className="object-cover max-h-[18vh]" src={image} alt="" />
          </div>
        </div>
        <div className="p-1 absolute flex bottom-1 align-bottom w-full">
          <div className="relative flex justify-start row w-[40%]">
            {price * currency[currency.current].toFixed(2)}{' '}
          </div>
          <div className="relative flex justify-end row w-[60%] pr-2">
            <button type="button" className="rounded w-10 h-8 ">
              <svg
                className="spaced m-1"
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                viewBox="0 0 450 450"
              >
                <g
                  transform="translate(0.000000,452.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path d="M2184 4124 c-18 -9 -41 -25 -52 -37 -11 -12 -203 -287 -427 -612 -224 -324 -418 -604 -431 -622 l-25 -32 -473 -3 -473 -3 -37 -29 c-43 -33 -75 -95 -76 -146 0 -47 484 -1801 516 -1866 29 -61 117 -148 178 -174 24 -11 74 -24 112 -30 73 -10 1314 -14 1314 -4 0 3 -10 52 -22 107 -29 137 -31 391 -5 517 60 280 191 518 391 708 390 369 961 464 1454 241 44 -20 64 -25 67 -16 24 62 135 490 135 517 -1 51 -32 113 -76 146 l-37 29 -476 5 -475 5 -426 622 c-234 342 -434 632 -445 644 -44 48 -148 64 -211 33z m355 -902 c143 -211 261 -387 261 -393 0 -5 -207 -9 -541 -9 -444 0 -540 2 -536 13 13 35 541 787 547 780 4 -4 125 -180 269 -391z" />
                  <path d="M3385 1864 c-373 -83 -655 -370 -730 -743 -23 -113 -16 -312 15 -426 70 -258 251 -475 495 -595 124 -61 230 -89 361 -97 449 -26 856 274 966 714 31 124 31 342 -1 458 -89 331 -342 586 -670 676 -103 29 -335 35 -436 13z m282 -381 c74 -35 103 -106 103 -255 l0 -96 123 -4 c115 -3 126 -5 165 -31 51 -33 82 -91 82 -152 0 -60 -19 -103 -63 -142 -48 -42 -91 -53 -209 -53 l-98 0 0 -97 c0 -119 -11 -162 -53 -210 -81 -92 -227 -83 -294 19 -26 39 -28 50 -31 165 l-4 123 -94 0 c-126 0 -178 14 -224 60 -93 93 -65 247 55 301 31 14 65 19 153 19 l112 0 0 113 c0 87 4 121 19 152 47 101 154 138 258 88z" />
                </g>
                <text
                  x="80"
                  y="160"
                  alignmentBaseline="before-edge"
                  className="Rrrrr align-text-bottom "
                >
                  {showItemsInBasket()}
                </text>
              </svg>
            </button>
            <button type="button" className="rounded w-10 h-8">
              <svg
                className="spaced m-1"
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                viewBox="0 0 450 450"
              >
                <g
                  transform="translate(0.000000,452.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path d="M2184 4124 c-18 -9 -41 -25 -52 -37 -11 -12 -203 -287 -427 -612 -224 -324 -418 -604 -431 -622 l-25 -32 -473 -3 -473 -3 -37 -29 c-43 -33 -75 -95 -76 -146 0 -47 484 -1801 516 -1866 29 -61 117 -148 178 -174 24 -11 74 -24 112 -30 73 -10 1314 -14 1314 -4 0 3 -10 52 -22 107 -29 137 -31 391 -5 517 60 280 191 518 391 708 390 369 961 464 1454 241 44 -20 64 -25 67 -16 24 62 135 490 135 517 -1 51 -32 113 -76 146 l-37 29 -476 5 -475 5 -426 622 c-234 342 -434 632 -445 644 -44 48 -148 64 -211 33z m355 -902 c143 -211 261 -387 261 -393 0 -5 -207 -9 -541 -9 -444 0 -540 2 -536 13 13 35 541 787 547 780 4 -4 125 -180 269 -391z" />
                  <path d="M3385 1864 c-346 -77 -618 -336 -717 -681 -30 -104 -33 -362 -5 -461 62 -226 194 -420 374 -548 235 -169 545 -216 828 -127 404 128 679 528 652 952 -26 403 -304 742 -702 854 -96 27 -331 33 -430 11z m673 -767 c73 -48 103 -148 68 -230 -17 -43 -76 -93 -123 -106 -54 -15 -790 -15 -850 1 -168 42 -187 277 -28 349 37 18 70 19 466 16 l425 -2 42 -28z" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ItemGoods = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionGetAllGoods())
  }, [])
  const goods = useSelector((state) => state.magazine.goods)
  const currency = useSelector((state) => state.magazine.currency)
  return (
    <div>
      <div className="flex m-1 flex-wrap spaced">
        {Array.from(goods).map((it) => {
          return Good(it, currency)
        })}
      </div>
    </div>
  )
}

export default React.memo(ItemGoods)
