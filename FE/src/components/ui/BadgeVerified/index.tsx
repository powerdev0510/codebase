import React from 'react'
import classNames from 'classnames'

import Icon from '~components/ui/Icon'
import * as style from './BadgeVerified.module.scss'

type BadgeVerifiedProps = {
  className?: string
  variant?: 'success' | 'muted'
  size?: 'sm' | 'md'
  [otherProps: string]: any
}

const BadgeVerified = (props: BadgeVerifiedProps) => {
  const { className, variant = 'success', size = 'sm', ...rest } = props

  return (
    <div
      className={classNames(
        style.badgeVerified,
        { [style[variant]]: variant },
        { [style[size]]: variant },
        className
      )}
      title="Verified"
      {...rest}
    >
      <Icon name="icon-verified" size={6.6} className={style.icon} />
    </div>
  )
}

export default BadgeVerified
