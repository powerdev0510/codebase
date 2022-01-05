import React from 'react'
import classNames from 'classnames'

import * as style from './BlockFigures.module.scss'

type BlockFiguresProps = {
  className?: string
  price: number
  currencyName: string
  priceUsd: number | string
  variant?: string
  [otherProps: string]: any
}

const BlockFigures = (props: BlockFiguresProps) => {
  const {
    className,
    price,
    currencyName,
    priceUsd,
    variant = '',
    ...rest
  } = props

  return (
    <div {...rest} className={classNames(style.gridPrice, className)}>
      <p
        className={classNames(style.textPriceCoins, {
          [style[variant]]: variant,
        })}
      >
        {price} {currencyName}
      </p>
      {/* TODO: post-MVP */}
      {/* <p className={style.textPriceUsd}>~ ${priceUsd}</p> */}
    </div>
  )
}

export default BlockFigures
