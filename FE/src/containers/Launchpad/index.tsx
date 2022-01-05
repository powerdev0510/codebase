import React, { FC } from 'react'
import { Button, Container } from 'react-bootstrap'

// @ts-ignore
import * as style from './Launchpad.module.scss'
import { Data } from '~interfaces'
import Route from '~routes'
import SEO from '~components/seo'
import Layout from '~components/general/Layout'
import CardPool from './components/CardPool'
import PixelCalculator from './components/PixelCalculator'
import { MOCK_CARD_POOLS } from '~utils/mocks'
// @ts-ignore
import iconRocket from './img/Rocket.svg'

type LaunchpadPageProps = {
  data: Data
  [otherProps: string]: any
}

const LaunchpadPage: FC<LaunchpadPageProps> = (props) => {
  const { data } = props
  const { site } = data

  return (
    <Layout siteTitle={site.siteMetadata.title} activePage={Route.HOMEPAGE}>
      <Container className={style.containerLaunch}>
        <SEO title="Launch" />
        <section>
          <h2 className={style.headingSection}>Pools</h2>
          <div className={style.poolsGrid}>
            {MOCK_CARD_POOLS.map((cardPool) => (
              <CardPool key={cardPool.id} {...cardPool} />
            ))}
          </div>
        </section>
        <section>
          <h2 className={style.headingSection}>Closed Pools</h2>
          <div className={style.poolsGrid}>
            {MOCK_CARD_POOLS.slice(0, 2).map((cardPool) => (
              <CardPool key={cardPool.id} {...cardPool} />
            ))}
          </div>
        </section>
        <section>
          <h2 className={style.headingSection}>Allocation System</h2>
          <div className={style.gridCalculator}>
            <PixelCalculator />
          </div>
        </section>
        <section className={style.sectionAbout}>
          <h2>About Launch</h2>
          <p className={style.textAboutDescription}>
            PixelLaunch allows for Metaverse-themed projects, companies, and NFT
            projects to fundraise. PixelLaunch sets new standards and methods
            for decentralized fundraising in a billion dollar market. Creators
            can access a number of different products provided by the PixelVerse
            ecosystem. Users can sign up as different tiers of members to earn
            allocations in NFTs or projects.
          </p>
          <hr />
          <p className={style.textContactHeading}>
            Would you like to add your project?
          </p>
          <p className={style.textContactDescription}>
            Don&apos;t hesitate and tell us about your project.
          </p>
          <Button
            variant="outline-success"
            as="a"
            href="https://docs.google.com/forms/u/0/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={style.btnContact}
          >
            Contact us
          </Button>
          <img src={iconRocket} alt="Rocket" className={style.iconRocket} />
        </section>
      </Container>
    </Layout>
  )
}

export default LaunchpadPage
