import React, { FC, useState, useRef } from 'react'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'

import Icon from '~components/ui/Icon'
import { useClickOutside } from '~hooks/useClickOutside'
import { SOCIALS } from './constatnts'
import * as style from './CardShare.module.scss'

type CardShareProps = {
  className?: string
  variant?: 'inline' | 'vertical' | 'cardBlack' | 'cardGray'
  behavior?: 'auctionPage'
  iconSize?: number
  [otherProps: string]: any
}

const CardShare: FC<CardShareProps> = ({
  className,
  variant = '',
  iconSize = 24,
  behavior,
  ...rest
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Collapse Share menu on media transition
  const handleMediaQueryChange = () => {
    setIsExpanded(false)
  }

  if (behavior === 'auctionPage') {
    /* @include b-btw(lg, xxl) */
    useMediaQuery(
      { query: '(min-width: 1024px) and (max-width: 1440px)' },
      undefined,
      handleMediaQueryChange
    )
  }

  const inputRef = useRef(null)
  useClickOutside([inputRef], handleMediaQueryChange)

  return (
    <div
      {...rest}
      className={classNames(
        style.cardShare,
        { [style[variant]]: variant, [style.expanded]: isExpanded },
        className
      )}
      ref={inputRef}
    >
      {isExpanded ? (
        <ul className={style.blockShareOptions}>
          {SOCIALS.map(({ name, link }) => (
            <li key={name}>
              <a href={link} target="_blank" rel="nofollow noopener noreferrer">
                <Icon name={`icon-${name}`} size={iconSize} />
              </a>
            </li>
          ))}

          <button
            type="button"
            className={style.btnClose}
            onClick={() => setIsExpanded(false)}
          >
            <Icon name="icon-close" size={20} />
          </button>
        </ul>
      ) : (
        <button
          className={style.btnShare}
          type="button"
          onClick={() => setIsExpanded(true)}
        >
          <p className={style.textShare}>Share</p>
          <Icon name="icon-share" size={24} />
        </button>
      )}
    </div>
  )
}

export default CardShare
