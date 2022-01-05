import React from 'react'
import classNames from 'classnames'

// @ts-ignore
import * as style from './Social.module.scss'
import { FOOTER_SOCIAL_ICONS } from './constants'
import Icon from '~components/ui/Icon'

type SocialProps = {
  className?: string
  [otherProps: string]: any
}

const Social = (props: SocialProps) => {
  const { className, ...rest } = props

  return (
    <div {...rest} className={classNames(style.social, className)}>
      {FOOTER_SOCIAL_ICONS.map((socialIcon) => (
        <a
          key={socialIcon.iconName}
          href={socialIcon.url}
          title={socialIcon.name}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <Icon name={socialIcon.iconName} size={24} />
        </a>
      ))}
    </div>
  )
}

export default Social
