import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'

import * as style from './ItemFollower.module.scss'
import BtnFollow from '~components/ui/BtnFollow'
import Route from '~routes'

type ItemFollowerProps = {
  className?: string
  id: number
  name: string
  followers: number
  imgSrc: string
  [otherProps: string]: any
}

const ItemFollower = (props: ItemFollowerProps) => {
  const { className, id, name, followers, imgSrc } = props

  const userLink = `${Route.USER}${id}`

  return (
    <div className={classNames(style.itemFollower, className)}>
      <Link to={userLink}>
        <img src={imgSrc} alt={name} className={style.img} />
      </Link>
      <div>
        <Link className={style.textName} to={userLink}>
          {name}
        </Link>
        <p className={style.textFollowers}>{followers} Followers</p>
      </div>
      <BtnFollow isFollowing />
    </div>
  )
}

export default ItemFollower
