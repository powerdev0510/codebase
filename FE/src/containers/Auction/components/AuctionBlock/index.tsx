import React, { useState } from 'react'
import classNames from 'classnames'

// @ts-ignore
import * as style from './AuctionBlock.module.scss'
import BadgeCountdown from '~components/ui/BadgeCountdown'
// TODO: post-MVP
// import CardShare from '~components/ui/CardShare'
import CardPurchase from './components/CardCurrentBid'
import CardOutOfStock from './components/CardOutOfStock'
import TabsBlock from './components/TabsBlock'
import { Collection, User } from '~interfaces'
import { Status } from '~utils/enums'
import BlockFigures from '~containers/Auction/components/AuctionBlock/components/BlockFigures'
import useAuth from '~hooks/useAuth'
import Picture from '~components/ui/Picture'

type PriceData = {
  price: number
  currencyName: string
  priceUsd: string | number
}

type AuctionBlockProps = {
  className?: string
  id: number
  imgSrc: string
  name: string
  bid?: PriceData
  purchase?: PriceData
  percentOfSalesToCreator: number
  status: string
  timestamp?: number
  collection: Collection
  description: string
  owner: User
  creator: User
  [otherProps: string]: any
}

const AuctionBlock = (props: AuctionBlockProps) => {
  const {
    id,
    className,
    imgSrc,
    name,
    bid,
    purchase,
    // TODO: post-MVP
    // percentOfSalesToCreator,
    status,
    timestamp,
    collection,
    description,
    owner,
    creator,
  } = props

  const isCompleted = status === Status.COMPLETED
  const hasCountdownBadge = !isCompleted && timestamp

  const [isApproved, setIsApproved] = useState(false)

  const { user } = useAuth()

  const isOwnNft = owner?.address === user?.address

  return (
    <div className={classNames(style.auctionBlock, className)}>
      <div className={style.imgWrapper}>
        <div className={style.imgAspectRatioContainer}>
          <Picture
            src={imgSrc}
            alt={name}
            className={style.img}
            maxWidth={600}
            maxHeight={600}
          />
          {!!hasCountdownBadge && (
            <BadgeCountdown
              size="lgAdaptive"
              timestamp={timestamp}
              className={style.badgeCountdown}
              status={status}
            />
          )}
        </div>
      </div>
      <div className={style.colInfo}>
        <h1 className={style.heading}>
          {name}
          {/* TODO: post-MVP */}
          {/* <CardShare className={style.cardShareInline} variant="inline" /> */}
        </h1>
        <div className={style.rowFigures}>
          {/* TODO: post-MVP */}
          {/* {bid && <BlockFigures {...bid} variant="danger" />} */}
          {purchase && <BlockFigures {...purchase} variant={status} />}
        </div>
        {isCompleted ? (
          <CardOutOfStock className={style.gridAsideCard} {...purchase} />
        ) : (
          <>
            {/* TODO: post-MVP */}
            {/* {bid && ( */}
            {/*  <div className={style.groupCardPurchase}> */}
            {/*    <BlockFigures {...bid} variant="danger" /> */}
            {/*    <CardPurchase */}
            {/*      id={id} */}
            {/*      variant="bid" */}
            {/*      {...bid} */}
            {/*      className={style.gridAsideCard} */}
            {/*    /> */}
            {/*  </div> */}
            {/* )} */}
            {purchase && (
              <div className={style.groupCardPurchase}>
                <BlockFigures {...purchase} variant="success" />
                <CardPurchase
                  id={id}
                  variant={bid ? 'purchaseSecondary' : 'purchasePrimary'}
                  {...purchase}
                  isApproved={isApproved}
                  setIsApproved={setIsApproved}
                  className={style.gridAsideCard}
                  disabled={isOwnNft}
                />
              </div>
            )}
          </>
        )}
        {/* TODO: post-MVP */}
        {/* <p className={style.textPercentToCreator}> */}
        {/*  <span className={style.textWhite}>{percentOfSalesToCreator}%</span> of */}
        {/*  sales will go to creator */}
        {/* </p> */}
        {/* TODO: post-MVP */}
        {/* <CardShare className={style.cardShare} /> */}
        <TabsBlock
          auctionId={id}
          className={style.tabsBlock}
          description={description}
          owner={owner}
          creator={creator}
          collection={collection}
        />
      </div>
      <div className={style.gridAside}>
        {isCompleted ? (
          <CardOutOfStock className={style.gridAsideCard} {...purchase} />
        ) : (
          <>
            {/* TODO: post-MVP */}
            {/* {bid && ( */}
            {/*  <CardPurchase */}
            {/*    id={id} */}
            {/*    variant="bid" */}
            {/*    {...bid} */}
            {/*    className={style.gridAsideCard} */}
            {/*  /> */}
            {/* )} */}
            {purchase && (
              <CardPurchase
                id={id}
                variant={bid ? 'purchaseSecondary' : 'purchasePrimary'}
                {...purchase}
                isApproved={isApproved}
                setIsApproved={setIsApproved}
                className={style.gridAsideCard}
                disabled={isOwnNft}
              />
            )}
          </>
        )}
        {/* TODO: post-MVP */}
        {/* <p className={style.textPercentToCreator}> */}
        {/*  <span className={style.textWhite}>{percentOfSalesToCreator}%</span> of */}
        {/*  sales will go to creator */}
        {/* </p> */}
        {/* TODO: post-MVP */}
        {/* <CardShare className={style.cardShare} /> */}
      </div>
    </div>
  )
}

export default AuctionBlock
