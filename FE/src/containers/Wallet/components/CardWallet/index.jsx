import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import * as style from './CardWallet.module.scss'

/**
 * CardWallet component
 */
const CardWallet = React.forwardRef((props, ref) => {
  const {
    className,
    name,
    img,
    amountCoins,
    amountUSD,
    isActive,
    activeWallet,
    // eslint-disable-next-line react/prop-types
    currencyCode,
    id,
    ...rest
  } = props

  return (
    <div
      {...rest}
      className={classNames(
        style.cardWallet,
        { [style.active]: id === activeWallet?.id },
        className
      )}
      ref={ref}
    >
      <div className={style.gridInfo}>
        <img
          src={img}
          alt={name}
          width={32}
          height={32}
          className={style.coinImg}
        />
        <p className={style.name}>{name}</p>
      </div>
      <div>
        <p className={style.textCoins}>{amountCoins}</p>
        <p className={style.textUSD}>~ ${amountUSD}</p>
      </div>
    </div>
  )
})

CardWallet.defaultProps = {
  className: '',
  isActive: false,
}

CardWallet.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  amountCoins: PropTypes.string.isRequired,
  amountUSD: PropTypes.string.isRequired,
  activeWallet: PropTypes.object.isRequired,
  id: PropTypes.any.isRequired,
  isActive: PropTypes.bool,
}

export default CardWallet
