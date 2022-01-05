import React, { FC } from 'react'

import * as style from './NoDataPlaceholder.module.scss'

type NoDataPlaceholderProps = {
  hasData: boolean
  message?: string
}

const NoDataPlaceholder: FC<NoDataPlaceholderProps> = ({
  hasData,
  message,
  children,
}) => {
  return (
    // use Fragment to make TS happy 🤗 when children return
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {hasData ? (
        children
      ) : (
        <div className={style.message}>{message || 'No data available'}</div>
      )}
    </>
  )
}

export default NoDataPlaceholder
