import React, { FC } from 'react'
import { Container } from 'react-bootstrap'

import SEO from '~components/seo'
import Layout from '~components/general/Layout'
import CardUser from '~components/ui/CardUser'
import NoDataPlaceholder from '~components/ui/NoDataPlaceholder'
import { MOCK_CREATORS } from '~utils/mocks'
import { Data } from '~interfaces'
import Route from '~routes'
import * as style from './Creators.module.scss'

type CreatorsPageProps = {
  data: Data
  [otherProps: string]: any
}

const CreatorsPage: FC<CreatorsPageProps> = (props) => {
  const { data } = props
  const { site } = data

  return (
    <Layout siteTitle={site.siteMetadata.title} activePage={Route.HOMEPAGE}>
      <Container>
        <SEO title="Creators" />

        <section>
          <h2 className={style.heading}>Creators</h2>

          <NoDataPlaceholder
            hasData={!!MOCK_CREATORS.length}
            message="No items found"
          >
            <div className={style.cardsGrid}>
              {MOCK_CREATORS.map((creator) => (
                <CardUser key={creator.id} {...creator} />
              ))}
            </div>
          </NoDataPlaceholder>
        </section>
      </Container>
    </Layout>
  )
}

export default CreatorsPage
