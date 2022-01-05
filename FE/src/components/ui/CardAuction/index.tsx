import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'

// @ts-ignore
import * as style from './CardAuction.module.scss'
import BlockUsers from '~components/ui/BlockUsers'
// TODO: post-MVP
// import CardShare from '~components/ui/CardShare'
// import BadgeCountdown from '~components/ui/BadgeCountdown'
import { User } from '~interfaces'
import Route from '~routes'
import Picture from '~components/ui/Picture'

type CardAuctionProps = {
  className?: string
  variant?: string
  id: number
  name: string
  price: number
  currency: string
  status: string
  imgSrc: string
  owner: User
  [otherProps: string]: any
}

const CardAuction = (props: CardAuctionProps) => {
  const {
    className,
    variant = '',
    id,
    name,
    price,
    currency = 'PIXEL',
    status,
    imgSrc,
    owner,
  } = props

  return (
    <div
      className={classNames(style.cardAuction, className, {
        [style[variant]]: variant,
      })}
    >
      <div className={style.cardHead}>
        <div className={style.imgAspectRatioContainer}>
          <Link to={`${Route.AUCTION}${id}`} className={style.imgLinkWrapper}>
            <Picture
              alt={name}
              src={imgSrc}
              className={style.img}
              maxWidth={600}
              maxHeight={600}
              pixelRatios={null}
            />
          </Link>
          <div className={style.overlayShadow} />
          {/* <BadgeCountdown */}
          {/*  timestampStart={start} */}
          {/*  timestampEnd={end} */}
          {/*  className={style.badgeCountdown} */}
          {/*  status={status} */}
          {/* /> */}
          {owner && (
            <BlockUsers
              users={[owner]}
              className={style.blockUsers}
              infoRole="Owner"
            />
          )}
        </div>
      </div>
      <div className={style.cardInfo}>
        <Link className={style.textName} to={`${Route.AUCTION}${id}`}>
          {name}
        </Link>
        <div className={style.bottomRow}>
          <p className={style.textStatus}>Price:</p>
          <p className={classNames(style.textPrice, style[status])}>
            <span>
              {price} {currency}
            </span>
          </p>
          {/* TODO: post-MVP */}
          {/* <CardShare variant="vertical" iconSize={16} /> */}
        </div>
      </div>
    </div>
  )
}

export default CardAuction
