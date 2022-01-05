import React from 'react'
import classNames from 'classnames'

import Timer from './Timer'
import { Status } from '~utils/enums'
import * as style from './BadgeCountdown.module.scss'

type BadgeCountdownProps = {
  className?: string
  timestampStart?: number
  timestampEnd?: number
  status: string
  size?: 'lgAdaptive'
  [otherProps: string]: any
}

const BadgeCountdown = (props: BadgeCountdownProps) => {
  const {
    className,
    timestampStart,
    timestampEnd,
    status,
    size = '',
    ...rest
  } = props

  const isLive = status === Status.LIVE
  const isUpcoming = status === Status.UPCOMING

  if (!((isLive && timestampEnd) || (isUpcoming && timestampStart))) {
    return null
  }

  return (
    <div
      {...rest}
      className={classNames(
        style.badgeCountdown,
        { [style.active]: isLive },
        { [style[size]]: size },
        className
      )}
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLive ? (
        <div className={style.textCountdown}>
          <span>
            <Timer timestamp={timestampEnd!} />
            left
          </span>
        </div>
      ) : (
        <>
          Starts in <Timer timestamp={timestampStart!} />
        </>
      )}
    </div>
  )
}

export default BadgeCountdown
