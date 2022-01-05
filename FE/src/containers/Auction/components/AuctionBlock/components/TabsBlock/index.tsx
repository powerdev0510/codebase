import React, { useState } from 'react'
import {
  Nav,
  Spinner,
  TabContainer,
  TabContent,
  TabPane,
} from 'react-bootstrap'
import { useQuery } from 'react-query'
import classNames from 'classnames'

// @ts-ignore
import * as style from './TabsBlock.module.scss'
import BlockUsers from '~components/ui/BlockUsers'
// TODO: post-MVP
// import AuctionHistoryItem from '../AuctionHistoryItem'
// import CardCollection from '~components/ui/CardCollection'
import { Collection, User } from '~interfaces'
import { ApiKey, getAuctionHistory } from '~utils/api'
import AuctionHistoryItem from '~containers/Auction/components/AuctionBlock/components/AuctionHistoryItem'

type TabsBlockProps = {
  auctionId: number
  className?: string
  description: string
  owner: User
  creator: User
  collection: Collection
  [otherProps: string]: any
}

const TabsBlock = (props: TabsBlockProps) => {
  const {
    className,
    description,
    owner,
    creator,
    collection,
    auctionId,
    ...rest
  } = props

  const defaultActiveTabKey = 'details'
  const [activeTabKey, setActiveTabKey] = useState(defaultActiveTabKey)
  const [historyQueryEnabled, setHistoryQueryEnabled] = useState(false)

  const { data: historyData, isLoading: isHistoryLoading } = useQuery(
    [ApiKey.AUCTION_HISTORY, auctionId],
    () => getAuctionHistory(auctionId),
    { enabled: historyQueryEnabled }
  )

  const handleTabSelect = (key: string | null) => {
    if (!key) return

    setActiveTabKey(key)

    if (key === 'history') setHistoryQueryEnabled(true)
  }

  return (
    <div {...rest} className={className}>
      <TabContainer
        defaultActiveKey={defaultActiveTabKey}
        activeKey={activeTabKey}
        onSelect={handleTabSelect}
      >
        <div className={style.navWrapper}>
          <div className={style.navScroll}>
            <Nav
              // @ts-ignore
              variant="tabs"
              defaultActiveKey="details"
              className={style.nav}
            >
              <Nav.Item>
                <Nav.Link eventKey="details" as="button">
                  Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="history"
                  as="button"
                  className="nav-link--warning"
                >
                  History
                </Nav.Link>
              </Nav.Item>
              {/* TODO: post-MVP */}
              {/* <Nav.Item> */}
              {/*  <Nav.Link */}
              {/*    eventKey="collection" */}
              {/*    as="button" */}
              {/*    className="nav-link--danger" */}
              {/*  > */}
              {/*    Collection */}
              {/*  </Nav.Link> */}
              {/* </Nav.Item> */}
            </Nav>
          </div>
          <div className={style.blendShadowL} />
          <div className={style.blendShadowR} />
        </div>
        <TabContent>
          <TabPane eventKey="details">
            <div className={style.tabDetailsContent}>
              <p className={style.textDescription}>{description}</p>
              <div className={style.gridRelatedUsers}>
                <BlockUsers
                  variant="auctionPage"
                  users={[creator]}
                  infoRole="Creator"
                />
                <BlockUsers
                  variant="auctionPage"
                  users={[owner]}
                  infoRole="Owner"
                />
              </div>
            </div>
          </TabPane>
          <TabPane eventKey="history">
            <div
              className={classNames(style.tabHistoryContent, {
                [style.isLoading]: isHistoryLoading,
              })}
            >
              <div className={style.gridHistoryItems}>
                {!isHistoryLoading ? (
                  historyData?.map((historyItem: any) => (
                    <AuctionHistoryItem
                      // eslint-disable-next-line no-underscore-dangle
                      key={historyItem._id}
                      {...historyItem}
                    />
                  ))
                ) : (
                  <>
                    <Spinner
                      animation="grow"
                      role="status"
                      className={style.spinner}
                    />
                    <Spinner
                      animation="grow"
                      role="status"
                      className={style.spinner}
                    />
                  </>
                )}
              </div>
            </div>
          </TabPane>
          {/* TODO: post-MVP */}
          {/* <TabPane eventKey="collection"> */}
          {/*  <CardCollection */}
          {/*    name={collection.name} */}
          {/*    relatedUsers={collection.relatedUsers} */}
          {/*    id={collection.id} */}
          {/*    imgSrc={collection.imgSrc} */}
          {/*    className={style.cardCollection} */}
          {/*  /> */}
          {/* </TabPane> */}
        </TabContent>
      </TabContainer>
    </div>
  )
}

export default TabsBlock
