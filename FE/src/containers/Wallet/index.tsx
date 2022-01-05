/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import Route from '~routes'
import SEO from '~components/seo'
import Layout from '~components/general/Layout'
import CarouselWallet from './components/CarouselWallet'
import CardInformative from './components/CardInformative'
import CardTransactions from './components/CardTransactions'
import CardWalletActions from './components/CardWalletActions'
import { MOCK_WALLETS } from '~utils/mocks'
import * as style from './WalletPage.module.scss'

type WalletPageProps = {
  [otherProps: string]: any
}

const WalletPage = (props: WalletPageProps) => {
  const { data } = props
  const { site } = data

  const [activeWallet, setActiveWallet] = useState(MOCK_WALLETS[0])

  return (
    <Layout siteTitle={site.siteMetadata.title} activePage={Route.WALLET}>
      <Container>
        <SEO title="Wallet" />
        <div className={style.gridMain}>
          <CarouselWallet
            headingText="Your Tokens"
            activeWallet={activeWallet}
            setActiveWallet={setActiveWallet}
            className={style.carouselWallet}
          />
          <CardTransactions className={style.cardTransactions} />
          <CardWalletActions className={style.cardWalletActions} />
          <CardInformative
            heading="Be attentive"
            text="It can take from five days up to a month to process the transaction."
            className={style.cardInfo}
          />
        </div>
      </Container>
    </Layout>
  )
}

export default WalletPage
