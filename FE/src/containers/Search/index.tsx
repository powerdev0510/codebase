import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
// @ts-ignore
import { useLocation } from '@gatsbyjs/reach-router'
import qs from 'query-string'

import SEO from '~components/seo'
import Layout from '~components/general/Layout'
import Content from './components/Content'
import NoData from './components/NoData'
import { Data } from '~interfaces'
import { simulateSearch } from './utils'
import LoaderPlaceholder from '~components/ui/LoaderPlaceholder'

type SearchPageProps = {
  data: Data
  [otherProps: string]: any
}

const SearchPage: FC<SearchPageProps> = (props) => {
  const { data } = props
  const { site } = data

  const { search: searchParams } = useLocation()
  const { s: defaultSearchValue } = qs.parse(searchParams)
  const searchValue = defaultSearchValue as string

  // data from query
  const isLoading = false
  const searchedData = searchValue && simulateSearch(searchValue)
  const hasData =
    searchedData && Object.values(searchedData).some((item) => item.length)

  return (
    <Layout siteTitle={site.siteMetadata.title}>
      <Container>
        <SEO title="Search" />
        <LoaderPlaceholder isLoading={isLoading}>
          {hasData ? (
            <Content {...{ ...searchedData, searchValue }} />
          ) : (
            <NoData searchValue={searchValue} />
          )}
        </LoaderPlaceholder>
      </Container>
    </Layout>
  )
}

export default SearchPage
