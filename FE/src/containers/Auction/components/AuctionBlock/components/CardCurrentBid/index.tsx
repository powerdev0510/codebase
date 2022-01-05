import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'

import BidModal from '../../../BidModal'
import * as style from './CardCurrentBid.module.scss'
import useAuth from '~hooks/useAuth'
import ModalStateContext from '~contexts/OverlayContext'

type CardCurrentBidProps = {
  id: number
  price: number
  currencyName: string
  headingText?: any
  className?: string
  priceUsd?: string | number
  variant: 'bid' | 'purchasePrimary' | 'purchaseSecondary'
  isApproved: boolean
  setIsApproved: Function
  disabled?: boolean
  [otherProps: string]: any
}

const CardPurchase = (props: CardCurrentBidProps) => {
  const {
    id,
    price,
    currencyName,
    className,
    headingText,
    variant,
    priceUsd,
    isApproved,
    setIsApproved,
    disabled,
    ...rest
  } = props

  const { user, isLoggedIn } = useAuth()
  const { setIsModalRegisterVisible } = useContext(ModalStateContext)

  const [isModalPurchaseVisible, setIsModalPurchaseVisible] = useState(false)

  const handleHideModalPurchase = () => setIsModalPurchaseVisible(false)
  const handleShowModalPurchase = () => setIsModalPurchaseVisible(true)

  const handleShowModalRegister = () => setIsModalRegisterVisible(true)

  const isBid = variant === 'bid'
  const isPurchasePrimary = variant === 'purchasePrimary'
  const isPurchaseSecondary = variant === 'purchaseSecondary'

  return (
    <div
      {...rest}
      className={classNames(
        style.cardCurrentBid,
        { [style[variant]]: variant },
        className
      )}
    >
      {isBid && <p className={style.textCurrentBid}>Current Bid</p>}
      {isPurchasePrimary && <p className={style.textCurrentBid}>Price</p>}
      {isBid ||
        (isPurchasePrimary && (
          <p className="h3">
            {price} {currencyName}
          </p>
        ))}
      {isPurchaseSecondary && (
        <p className={style.textSecondary}>
          {price} {currencyName}
        </p>
      )}
      <Button
        variant={isBid ? 'outline-danger' : 'outline-success'}
        className={style.btnBid}
        onClick={user?.name ? handleShowModalPurchase : handleShowModalRegister}
        disabled={!isLoggedIn || disabled}
      >
        {isBid ? 'Place a Bid' : 'Buy Now'}
      </Button>
      <BidModal
        isVisible={isModalPurchaseVisible}
        id={id}
        variant="purchase"
        onHide={handleHideModalPurchase}
        price={price}
        currencyName={currencyName}
        isApproved={isApproved}
        setIsApproved={setIsApproved}
      />
    </div>
  )
}

CardPurchase.defaultProps = {
  className: '',
}

export default CardPurchase
