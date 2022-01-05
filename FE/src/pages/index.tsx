import React from 'react'
import { graphql } from 'gatsby'
import { Web3ReactProvider } from '@web3-react/core'
import { QueryClientProvider } from 'react-query'
// @ts-ignore
import { Router } from '@gatsbyjs/reach-router'
import SEO from '../components/seo'
import Route from '~routes'
import ExplorePage from '~containers/Explore'
import NotFoundPage from '~pages/404'
import { queryClient } from '~utils/api'
import AuctionPage from '~containers/Auction'
// TODO: post-MVP
// import FollowingPage from '~containers/Following'
// import CreatorsPage from '~containers/Creators'
// import SearchPage from '~containers/Search'
// import ProfilePage from '~containers/Profile'
// import WalletPage from '~containers/Wallet'
// import CollectionPage from '~containers/Collection'
import LaunchpadPage from '~containers/Launchpad'
import getLibrary from '~utils/getLibrary'
import { AuthProvider } from '~hooks/useAuth'
import OverlayStateProvider from '~providers/OverlayStateProvider'

const RoutesPage = (props: any) => {
  if (typeof window === 'undefined') return <SEO />

  return (
    <OverlayStateProvider>
      <QueryClientProvider client={queryClient}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <AuthProvider>
            <Router basepath="/">
              <ExplorePage {...props} exact path={Route.HOMEPAGE} />
              <AuctionPage {...props} path={`${Route.AUCTION}:id`} />
              {/* TODO: post-MVP */}
              {/* <FollowingPage {...props} exact path={Route.FOLLOWING} /> */}
              {/* <CreatorsPage {...props} exact path={Route.CREATORS} /> */}
              {/* <SearchPage {...props} exact path={Route.SEARCH} /> */}
              {/* <ProfilePage {...props} exact path={`${Route.USER}:id`} /> */}
              {/* <WalletPage {...props} exact path={Route.WALLET} /> */}
              {/* <CollectionPage {...props}exact path={`${Route.COLLECTION}:id`} /> */}
              <LaunchpadPage {...props} exact path={Route.LAUNCHPAD} />
              <NotFoundPage {...props} default />
            </Router>
          </AuthProvider>
        </Web3ReactProvider>
      </QueryClientProvider>
    </OverlayStateProvider>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default RoutesPage
