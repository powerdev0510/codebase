import React from 'react'
import { Link } from 'gatsby'
import cn from 'classnames'

import BadgeVerified from '~components/ui/BadgeVerified'
import { Collection } from '~interfaces'
import Route from '~routes'
import * as style from './CardUser.module.scss'
import BtnFollow from '~components/ui/BtnFollow'

type CardUserProps = {
  id: number
  name: string
  followers: number
  isVerified: boolean
  isFollowing: boolean
  imgSrc: string
  collection: Collection
  [otherProps: string]: any
}

const CardUser = (props: CardUserProps) => {
  const { id, name, followers, isVerified, isFollowing, imgSrc, collection } =
    props

  const handleFollow = () => {}
  const handleUnfollow = () => {}

  return (
    <div className={style.cardUser}>
      <div className={style.cardHead}>
        <Link to={`${Route.USER}${id}`} className={style.imgLinkWrapper}>
          <img src={collection.imgSrc} alt="a" className={style.img} />
        </Link>
      </div>
      <div className={style.cardFooter}>
        <div className={style.imgUserWrapper}>
          <img src={imgSrc} alt={`@${name}`} className={style.imgUser} />
          {isVerified && <BadgeVerified />}
        </div>

        <div className={style.userInfo}>
          <Link
            className={cn(style.textName, style.footerText)}
            to={`${Route.USER}${id}`}
          >
            {name}
          </Link>
          <p className={cn(style.textFollowers, style.footerText)}>
            {followers} Followers
          </p>
        </div>
      </div>
      <BtnFollow
        isFollowing={isFollowing}
        handleUnfollow={handleUnfollow}
        handleFollow={handleFollow}
        className={style.btnFollow}
      />
    </div>
  )
}

export default CardUser
