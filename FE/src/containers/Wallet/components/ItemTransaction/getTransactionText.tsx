import { Link } from 'gatsby'
import React from 'react'
import { TransactionType } from '~utils/enums'
import * as style from '~containers/Wallet/components/ItemTransaction/ItemTransaction.module.scss'

export default ({ type, user, amountMain, amountExtra }: any) => {
  switch (type) {
    case TransactionType.RECEIVE:
      return (
        <>
          Received from{' '}
          <Link to={user?.profileUrl} className={style.textDescLink}>
            {user?.name}
          </Link>
        </>
      )
    case TransactionType.SEND:
      return (
        <>
          Send to{' '}
          <Link to={user?.profileUrl} className={style.textDescLink}>
            {user?.name}
          </Link>
        </>
      )
    case TransactionType.CONVERT:
      return (
        <>
          Convert from{' '}
          <span className={style.textPrimary}>{amountExtra?.currency}</span> to{' '}
          <span className={style.textPrimary}>{amountMain?.currency}</span>
        </>
      )
    default:
      return 'Unknown transaction'
  }
}
