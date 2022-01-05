import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { camelCase } from 'lodash'
import * as style from './TransactionStatusIndicator.module.scss'
import { TransactionStatus } from '~utils/enums'

/**
 * TransactionStatusIndicator component
 */
const TransactionStatusIndicator = (props) => {
  const { className, status, ...rest } = props

  return (
    <p
      {...rest}
      className={classNames(
        style.transactionStatusIndicator,
        style[camelCase(status)],
        className
      )}
    >
      {status}
    </p>
  )
}

TransactionStatusIndicator.defaultProps = {
  className: '',
}

TransactionStatusIndicator.propTypes = {
  className: PropTypes.string,
  status: PropTypes.oneOf(Object.values(TransactionStatus)).isRequired,
}

export default TransactionStatusIndicator
