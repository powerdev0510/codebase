import React from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'

// @ts-ignore
import * as style from './CardPool.module.scss'
import BadgeCountdown from '../BadgeCountdown'

type CardPoolProps = {
  id: number | string
  name: string
  description: string
  imgSrc: string
  className?: string
  followers: number
  coinImgSrc: string
  coinName: string
  timestampEndsAt: number
  [otherProps: string]: any
}

const CardPool = (props: CardPoolProps) => {
  const {
    id,
    className,
    imgSrc,
    name,
    description,
    coinImgSrc,
    coinName,
    followers,
    timestampEndsAt,
    ...rest
  } = props

  return (
    <div {...rest} className={classNames(style.cardPool, className)}>
      <div className={style.imgAspectRatioContainer}>
        <BadgeCountdown
          className={style.badgeCountdown}
          timestampEndsAt={timestampEndsAt}
          extraText="until token distribution"
        />
        <img className={style.img} src={imgSrc} alt={name} />
      </div>
      <div className={style.blockRight}>
        <h3>{name}</h3>
        <p className={style.textDesc}>{description}</p>
        <div className={style.rowInfo}>
          <div className={style.gridCoinInfo}>
            <img src={coinImgSrc} alt={coinName} className={style.imgCoin} />
            <p className={style.textCoinName}>{coinName}</p>
          </div>
          <div className={style.gridFollowers}>
            <p className={style.textFollowersLabel}>Followers</p>
            <p className={style.textFollowers}>
              {followers.toLocaleString('en-US')}
            </p>
          </div>
        </div>
        <Button variant="outline-success" className={style.btnDetails}>
          More details
        </Button>
      </div>
    </div>
  )
}

CardPool.defaultProps = {
  className: '',
}

export default CardPool
