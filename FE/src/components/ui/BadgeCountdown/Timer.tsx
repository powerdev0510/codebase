import React, { FC } from 'react'
import classNames from 'classnames'

import useCountdown from '~hooks/useCountdown'
import * as style from './BadgeCountdown.module.scss'

type TimerProps = {
  timestamp: number
}

const Timer: FC<TimerProps> = ({ timestamp }) => {
  const [countdownDiff] = useCountdown(timestamp)
  return (
    <>
      <span className={classNames(style.twoDigitContainer, style.HH)}>
        {/* @ts-ignore */}
        {countdownDiff?.format('HH[h]') ?? '00'}
      </span>
      <span className={classNames(style.twoDigitContainer, style.mm)}>
        {/* @ts-ignore */}
        {countdownDiff?.format('mm[m]') ?? '00'}
      </span>
      <span className={classNames(style.twoDigitContainer, style.ss)}>
        {/* @ts-ignore */}
        {countdownDiff?.format('ss[s]') ?? '00'}
      </span>
    </>
  )
}

export default Timer
