import React from 'react'
import classNames from 'classnames'

// @ts-ignore
import * as style from './CardCollectionDetails.module.scss'
import CardShare from '~components/ui/CardShare'

type CardCollectionDetailsProps = {
  className?: string
  imgSrc: string
  name: string
  description: string
  [otherProps: string]: any
}

const CardCollectionDetails = (props: CardCollectionDetailsProps) => {
  const { className, imgSrc, name, description, ...rest } = props

  return (
    <div
      {...rest}
      className={classNames(style.cardCollectionDetails, className)}
    >
      <img src={imgSrc} alt="collection" className={style.img} />
      <div className={style.cardBody}>
        <h3>{name}</h3>
        <p className={style.textDescription}>{description}</p>
        <div className={style.gridButtons}>
          <CardShare variant="cardBlack" />
        </div>
      </div>
    </div>
  )
}

export default CardCollectionDetails
