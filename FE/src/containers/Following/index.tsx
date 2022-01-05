import React, { FC, useState, useMemo, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import cn from 'classnames'

import SEO from '~components/seo'
import Layout from '~components/general/Layout'
import FiltersBar from '~components/ui/FiltersBar'
import CardAuction from '~components/ui/CardAuction'
import NoDataPlaceholder from '~components/ui/NoDataPlaceholder'
import { FILTERS } from './constants'
import Route from '~routes'
import { Data } from '~interfaces'
import { sendGet } from '~utils/api'

import * as style from './Following.module.scss'

type FollowingPageProps = {
  data: Data
  [otherProps: string]: any
}

const FollowingPage: FC<FollowingPageProps> = (props) => {
  const { data } = props
  const { site } = data
  const [list, setList] = useState<any[]>([])

  const defaultFilter = FILTERS[0].value
  const [activeFilter, setActiveFilter] = useState(defaultFilter)

  const filteredCards = useMemo(
    () => list.filter(({ status }) => status === activeFilter),
    [activeFilter]
  )

  useEffect(() => {
    sendGet('connection/following/list')
      .then(({ data: followings }) => {
        setList(followings)
      })
      .catch((e) => console.log('Failed to fetch Following list', e))
  }, [])

  return (
    <Layout siteTitle={site.siteMetadata.title} activePage={Route.HOMEPAGE}>
      <Container>
        <SEO title="Following" />

        <section>
          <h2 className={cn('h3', style.heading)}>Following</h2>

          <div className={style.gridFiltersBarWrapper}>
            <FiltersBar
              filters={FILTERS}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>
          <NoDataPlaceholder
            hasData={!!filteredCards.length}
            message="No items found"
          >
            <div className={style.cardsGrid}>
              {filteredCards.map((auctionProps) => (
                <CardAuction key={auctionProps.id} {...auctionProps} />
              ))}
            </div>
          </NoDataPlaceholder>
        </section>
      </Container>
    </Layout>
  )
}

export default FollowingPage
