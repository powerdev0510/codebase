import React from 'react'
import { Container } from 'react-bootstrap'
import { graphql } from 'gatsby'

import Layout from '~components/general/Layout'
import S from '~components/seo'
import Route from '~routes'

const NotFoundPage = (props: any) => {
  const { data } = props
  const { site } = data

  return (
    <Layout siteTitle={site.siteMetadata.title} activePage={Route.NOT_FOUND}>
      <Container>
        <S title="404: Not found" />
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Container>
    </Layout>
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

export default NotFoundPage
