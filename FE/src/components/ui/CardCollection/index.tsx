import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'

// @ts-ignore
import * as style from './CardCollection.module.scss'
import { Collection } from '~interfaces'
import Route from '~routes'
import BlockUsers from '~components/ui/BlockUsers'

type CardCollectionProps = Collection & {
  className?: string
  [otherProps: string]: any
}

const CardCollection = (props: CardCollectionProps) => {
  const { className, id, name, imgSrc, relatedUsers, ...rest } = props

  return (
    <div {...rest} className={classNames(style.cardCollection, className)}>
      <div className={style.cardHead}>
        <div className={style.imgAspectRatioContainer}>
          <Link
            to={`${Route.COLLECTION}${id}`}
            className={style.imgLinkWrapper}
          >
            <img src={imgSrc} alt="a" className={style.img} />
          </Link>
          <div className={style.overlayShadow} />
          {relatedUsers && (
            <BlockUsers users={relatedUsers} className={style.blockUsers} />
          )}
        </div>
      </div>
      <div className={style.cardInfo}>
        <Link className={style.textName} to={`${Route.COLLECTION}${id}`}>
          {name}
        </Link>
      </div>
    </div>
  )
}

CardCollection.defaultProps = {
  className: '',
}

export default CardCollection
