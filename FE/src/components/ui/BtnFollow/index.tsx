import React from 'react'
import cn from 'classnames'

// @ts-ignore
import * as style from './BtnFollow.module.scss'
import Icon from '~components/ui/Icon'

type BtnFollowProps = {
  className?: string
  isFollowing: boolean
  handleUnfollow?: (e?: any) => void
  handleFollow?: (e?: any) => void
  [otherProps: string]: any
}

const BtnFollow = (props: BtnFollowProps) => {
  const { className, isFollowing, handleUnfollow, handleFollow, ...rest } =
    props

  return (
    <button
      type="button"
      className={cn(
        style.followBtn,
        { [style.unfollow]: isFollowing },
        className
      )}
      onClick={isFollowing ? handleUnfollow : handleFollow}
      {...rest}
    >
      <Icon name={isFollowing ? 'icon-unfollow' : 'icon-follow'} size={20} />
    </button>
  )
}

export default BtnFollow
