import React from 'react'
import classNames from 'classnames'

// @ts-ignore
import * as style from './CardStats.module.scss'

type CardStatsProps = {
  className?: string
  stats: { name: string; value: string | number; onClick?: (e?: any) => {} }[]
  [otherProps: string]: any
}

const CardStats = (props: CardStatsProps) => {
  const { className, stats, ...rest } = props

  return (
    <div {...rest} className={classNames(style.cardStats, className)}>
      {stats.map((stat) =>
        stat.onClick ? (
          <button
            className={style.colStat}
            type="button"
            onClick={stat.onClick}
          >
            <p className={style.textValue}>{stat.value}</p>
            <p className={style.textDescription}>{stat.name}</p>
          </button>
        ) : (
          <div className={style.colStat}>
            <p className={style.textValue}>{stat.value}</p>
            <p className={style.textDescription}>{stat.name}</p>
          </div>
        )
      )}
    </div>
  )
}

export default CardStats
