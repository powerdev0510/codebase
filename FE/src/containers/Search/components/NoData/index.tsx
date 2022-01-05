import React, { FC } from 'react'
import { Link } from 'gatsby'

import { Button } from 'react-bootstrap'
import Route from '~routes'
import * as style from './NoData.module.scss'

type NoDataType = {
  searchValue?: string
}

const NoData: FC<NoDataType> = ({ searchValue }) => (
  <section className={style.wrap}>
    {searchValue ? (
      <>
        <h1 className={style.heading}>No items found</h1>
        <p className={style.description}>
          We’re usually a treasure chest of knowlenge, but we couldn’t find what
          you’re looking for
        </p>
      </>
    ) : (
      <>
        <h1 className={style.heading}>Type text to search</h1>
        <p className={style.description}>
          You can type some text in the search field to find what you’re looking
          for, or go to Explore page
        </p>
      </>
    )}

    <Button
      // @ts-ignore
      as={Link}
      to={Route.HOMEPAGE}
      variant="outline-danger"
      className={style.btnExplore}
    >
      Explore
    </Button>
  </section>
)

export default NoData
