/* eslint-disable react/prop-types */
import React from 'react'
import { Container } from 'react-bootstrap'
import { useQuery } from 'react-query'

// @ts-ignore
import * as style from './AuctionPage.module.scss'
import Route from '~routes'
import SEO from '~components/seo'
import Layout from '~components/general/Layout'
import AuctionBlock from './components/AuctionBlock'
import { ApiKey, getAuctionDetail } from '~utils/api'
import LoaderPlaceholder from '~components/ui/LoaderPlaceholder'

type AuctionPageProps = {
  [otherProps: string]: any
}

const AuctionPage = (props: AuctionPageProps) => {
  const { data, id } = props
  const { site } = data

  const { isLoading, data: auctionInfo } = useQuery(
    [ApiKey.AUCTION_DETAIL, id],
    () => getAuctionDetail(id)
  )

  return (
    <Layout siteTitle={site.siteMetadata.title} activePage={Route.AUCTION}>
      <Container>
        <SEO title="Auction" />
        <LoaderPlaceholder isLoading={isLoading}>
          {auctionInfo && (
            <AuctionBlock
              {...auctionInfo}
              className={style.blockAuction}
              purchase={{ price: auctionInfo.price, currencyName: 'PIXEL' }}
              history={[]}
            />
          )}
        </LoaderPlaceholder>
      </Container>
    </Layout>
  )
}

export default AuctionPage
