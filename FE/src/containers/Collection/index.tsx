import React from 'react'
import { Container } from 'react-bootstrap'

import { Data } from '~interfaces'
import Route from '~routes'
import * as style from './Collection.module.scss'
import S from '~components/seo'
import Layout from '~components/general/Layout'
import SectionAuctions from '~components/general/SectionAuctions'
import { MOCK_AUCTIONS_EXPLORE } from '~utils/mocks'
import { AuctionStatesCollection } from '~utils/enums'
import CardCollectionDetails from './components/CardCollectionDetails'

const noCache = Math.random()

const CollectionPage = (props: { data: Data }) => {
  const { data } = props
  const { site } = data

  return (
    <Layout siteTitle={site.siteMetadata.title} activePage={Route.USER}>
      <Container className={style.container}>
        <S title="Marvel BIG NFT Collection" />
        <CardCollectionDetails
          imgSrc={`https://picsum.photos/1000/1000?nocache=${noCache}`}
          name="Marvel BIG NFT Collection"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. laboris nisi ut aliquip ex ea commodo
          consequat..."
        />
        <SectionAuctions
          auctions={MOCK_AUCTIONS_EXPLORE}
          categories={AuctionStatesCollection}
          filterField="state"
          className={style.auctionsContainer}
        />
      </Container>
    </Layout>
  )
}

export default CollectionPage
