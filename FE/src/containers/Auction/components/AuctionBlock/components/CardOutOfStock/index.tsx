import React, { FC } from 'react'
import cn from 'classnames'

import * as style from './CardOutOfStock.module.scss'

type CardOutOfStockProps = {
  className?: string
  price?: number
  currencyName?: string
  [otherProps: string]: any
}

const CardOutOfStock: FC<CardOutOfStockProps> = ({
  className,
  price,
  currencyName,
}) => (
  <div className={cn(style.wrap, className)}>
    <p className={style.outOfStock}>Out of stock</p>
    <p className={style.soldFor}>Sold for</p>
    <p className={cn('h3', style.soldForPrice)}>
      {price} {currencyName}
    </p>
    {/* TODO: post-MVP */}
    {/* <p className={style.soldForPriceUsd}>~ $1,563.2840</p> */}
  </div>
)

export default CardOutOfStock
