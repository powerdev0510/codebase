import React, { FC } from 'react'
import { Spinner } from 'react-bootstrap'

import * as style from './LoaderPlaceholder.module.scss'

type LoaderPlaceholderType = {
  isLoading: boolean
}

const LoaderPlaceholder: FC<LoaderPlaceholderType> = ({
  isLoading,
  children,
}) => {
  return isLoading ? (
    <section className={style.wrap}>
      <Spinner animation="border" role="status" />
    </section>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  )
}

export default LoaderPlaceholder
