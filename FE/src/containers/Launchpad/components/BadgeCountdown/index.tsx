import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import * as style from './BadgeCountdown.module.scss'
import { dayJsToRelativeTime } from '~utils/toRelativeTime'

dayjs.extend(duration)

type BadgeCountdownProps = {
  className?: string
  timestampEndsAt: number
  [otherProps: string]: any
}

const BadgeCountdown = (props: BadgeCountdownProps) => {
  const { className, timestampEndsAt, extraText, ...rest } = props

  const [countdownDiff, setCountdownDiff] = useState<any>()
  const [isBadgeVisible, setIsBadgeVisible] = useState(true)

  const updateTimeRemaining = (endsDay: any, interval?: any) => {
    const nowDay = dayjs()

    const diff = endsDay.diff(nowDay)
    const diffDuration = dayjs.duration(diff)
    setCountdownDiff(dayJsToRelativeTime(endsDay))

    if (interval && diffDuration.asSeconds() < 1) {
      clearInterval(interval)
      setIsBadgeVisible(false)
    }
  }

  useEffect(() => {
    if (!timestampEndsAt) return

    const endsDay = dayjs.unix(timestampEndsAt)
    updateTimeRemaining(endsDay)

    const interval = setInterval(() => {
      updateTimeRemaining(endsDay, interval)
    }, 1000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval)
  }, [timestampEndsAt])

  if (!isBadgeVisible) return null

  const [digits, units] = countdownDiff?.split(' ') ?? ['', '']

  return (
    <div {...rest} className={classNames(style.badgeCountdown, className)}>
      <span
        className={classNames(style.digitsContainer, {
          [style.singleDigit]: digits.length === 1,
        })}
      >
        {digits}
      </span>{' '}
      {units} {extraText}
    </div>
  )
}

export default BadgeCountdown
