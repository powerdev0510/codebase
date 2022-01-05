/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import Layout from '~components/general/Layout'
import CardPersonal from './components/CardPersonal'
import * as style from './Profile.module.scss'
import S from '~components/seo'
import { MOCK_AUCTIONS_EXPLORE, MOCK_CREATORS } from '~utils/mocks'
import Route from '~routes'
import CardStats from './components/CardStats'
import { Data } from '~interfaces'
import { PROFILE_STATS } from './constants'
import SectionFollowers from './components/SectionFollowers'
import SectionAuctions from '../../components/general/SectionAuctions'
import { AuctionStates } from '~utils/enums'

const noCache = Math.random()

/**
 * Profile component
 */
const ProfilePage = (props: { data: Data; [otherProps: string]: any }) => {
  const { data, id: uid } = props
  const { site } = data

  const [activeSection, setActiveSection] = useState('auctions')

  // Temporary behavior
  const isOwnProfile = uid === '1'

  return (
    <Layout siteTitle={site.siteMetadata.title} activePage={Route.USER}>
      <Container className={style.container}>
        <S title="Profile" />
        <CardPersonal
          name="John Smith"
          email="katyperry@gmail.com"
          username="johnsmith"
          isOwnProfile={isOwnProfile}
          isVerified={!isOwnProfile}
          bannerImg={`https://picsum.photos/1000/480?nocache=${noCache}`}
          avatarImg={`https://picsum.photos/480/480?nocache=${noCache}`}
          followers={10}
          following={120}
          walletAddress="0x9486371gd44js56d4k692dfk30dl0bC618148sC238"
          onClickFollowers={() => setActiveSection('followers')}
          onClickFollowing={() => setActiveSection('following')}
        />
        <CardStats stats={PROFILE_STATS} className={style.cardStats} />
        <div className={style.sectionContainer}>
          {activeSection === 'auctions' && (
            <SectionAuctions
              auctions={MOCK_AUCTIONS_EXPLORE}
              displayCounts
              categories={AuctionStates}
              filterField="state"
            />
          )}
          {activeSection === 'followers' && (
            <SectionFollowers
              heading="Followers"
              onClickBack={() => setActiveSection('auctions')}
              users={MOCK_CREATORS.slice(
                0,
                Math.floor(MOCK_CREATORS.length / 2)
              )}
            />
          )}
          {activeSection === 'following' && (
            <SectionFollowers
              heading="Following"
              onClickBack={() => setActiveSection('auctions')}
              users={MOCK_CREATORS.slice(Math.floor(MOCK_CREATORS.length / 2))}
            />
          )}
        </div>
      </Container>
    </Layout>
  )
}

export default ProfilePage
