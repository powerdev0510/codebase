import React from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { Link } from 'gatsby'

// @ts-ignore
import * as style from './AuctionHistoryItem.module.scss'
import { AuctionHistoryItemType } from '~utils/enums'
import { User } from '~interfaces'
import { convertPixelPrice } from '~utils'
import Picture from '~components/ui/Picture'

type AuctionHistoryItemProps = {
  className?: string
  type: AuctionHistoryItemType
  user: User
  purchaseAt?: number
  price?: any
  [otherProps: string]: any
}

const AuctionHistoryItem = (props: AuctionHistoryItemProps) => {
  const { className, type, user, purchaseAt, price } = props

  const getDescriptionText = () => {
    switch (type) {
      case AuctionHistoryItemType.MINT:
        return (
          <>
            Minted by{' '}
            <Link to={user.profileUrl} className={style.textUserLink}>
              @{user.name}
            </Link>
          </>
        )
      // TODO: post-MVP
      // case AuctionHistoryItemType.LISTED:
      //   return (
      //     <>
      //       Listed by{' '}
      //       <Link to={user.profileUrl} className={style.textUserLink}>
      //         @{user.name}
      //       </Link>{' '}
      //       for{' '}
      //       <span className={style.textPrice}>
      //         {price.amount} {price.currencyName}
      //       </span>
      //     </>
      //   )
      // case AuctionHistoryItemType.BID_PLACED:
      //   return (
      //     <>
      //       Bid placed by{' '}
      //       <Link to={user.profileUrl} className={style.textUserLink}>
      //         @{user.name}
      //       </Link>{' '}
      //       for{' '}
      //       <span className={style.textPrice}>
      //         {price.amount} {price.currencyName}
      //       </span>
      //     </>
      //   )
      case AuctionHistoryItemType.PURCHASE:
        return (
          <>
            Purchased by{' '}
            <Link to={user.profileUrl} className={style.textUserLink}>
              @{user.name}
            </Link>{' '}
            for{' '}
            <span className={style.textPrice}>
              {convertPixelPrice(price)} PIXEL
            </span>
          </>
        )
      default:
        return ''
    }
  }

  return (
    <div className={classNames(style.auctionHistoryItem, className)}>
      <Link to={user.profileUrl} className={style.imgWrapper}>
        <Picture
          src={user.profileImg}
          alt={user.name}
          className={style.img}
          maxWidth={48}
        />
      </Link>
      <p className={style.textDesc}>{getDescriptionText()}</p>
      {purchaseAt && (
        <p className={style.textDate}>
          {dayjs.unix(purchaseAt).format('MMMM D, YYYY [at] HH:mm')}
        </p>
      )}
    </div>
  )
}

export default AuctionHistoryItem
