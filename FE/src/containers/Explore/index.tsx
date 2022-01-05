/* eslint-disable react/prop-types */
import React from 'react'
import { Container } from 'react-bootstrap'

import SEO from '~components/seo'
import Layout from '~components/general/Layout'
import BlockExplore from './components/BlockExplore'
import Route from '~routes'
// TODO: post-MVP
// import CardCollection from '~components/ui/CardCollection'
// import SectionHeading from './components/SectionHeading'
// @ts-ignore
// import * as style from './ExplorePage.module.scss'

// TODO: post-MVP
// const GridExploreScroll = ({ children }: any) => (
//   <div className={style.blockScrollCardsOuter}>
//     <div className={style.blockScrollCardsInner}>
//       <div className={style.gridExploreScroll}>{children}</div>
//     </div>
//   </div>
// )

type ExplorePageProps = {
  [otherProps: string]: any
}

const ExplorePage = (props: ExplorePageProps) => {
  const { data } = props
  const { site } = data
  // const curTime = new Date().getTime()

  return (
    <Layout siteTitle={site.siteMetadata.title} activePage={Route.HOMEPAGE}>
      <Container>
        <SEO title="Explore" />
        {/* TODO: post-MVP */}
        {/* {liveAuctions && liveAuctions.length > 0 && ( */}
        {/*  <section className={style.sectionLiveAuctions}> */}
        {/*    <SectionHeading */}
        {/*      text="Live Auctions" */}
        {/*      extraComponent={ */}
        {/*        <Link to="/" className={style.linkMore}> */}
        {/*          See all */}
        {/*        </Link> */}
        {/*      } */}
        {/*    /> */}
        {/*    <GridExploreScroll> */}
        {/*      {liveAuctions.map((auction) => ( */}
        {/*        <CardAuction */}
        {/*          key={auction.itemId} */}
        {/*          id={auction.id} */}
        {/*          currency="PIXEL" */}
        {/*          imgSrc={auction.collection.media} */}
        {/*          countdownTimestamp={curTime - auction.end} */}
        {/*          relatedUsers={[auction.seller]} */}
        {/*          className={style.cardScroll} */}
        {/*          variant="liveAuction" */}
        {/*          {...auction} */}
        {/*        /> */}
        {/*      ))} */}
        {/*    </GridExploreScroll> */}
        {/*  </section> */}
        {/* )} */}
        {/* {collections && collections.length > 0 && ( */}
        {/*  <section> */}
        {/*    <SectionHeading */}
        {/*      text="Trending Collections" */}
        {/*      extraComponent={ */}
        {/*        <Link to="/" className={style.linkMore}> */}
        {/*          See all */}
        {/*        </Link> */}
        {/*      } */}
        {/*    /> */}
        {/*    <GridExploreScroll> */}
        {/*      {collections.map((collection) => ( */}
        {/*        <CardCollection */}
        {/*          key={collection.tokenId} */}
        {/*          id={collection.tokenId} */}
        {/*          className={style.cardScroll} */}
        {/*          name={collection.title} */}
        {/*          imgSrc={collection.media} */}
        {/*        /> */}
        {/*      ))} */}
        {/*    </GridExploreScroll> */}
        {/*  </section> */}
        {/* )} */}
        <BlockExplore />
      </Container>
    </Layout>
  )
}

export default ExplorePage
