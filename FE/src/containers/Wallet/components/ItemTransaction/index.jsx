import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import {
  AccordionCollapse,
  Accordion,
  AccordionContext,
  useAccordionButton,
} from 'react-bootstrap'

import * as style from './ItemTransaction.module.scss'
import Icon from '~components/ui/Icon'
import TransactionStatusIndicator from '../TransactionStatusIndicator'
import { TransactionStatus, TransactionType } from '~utils/enums'
import getTransactionText from './getTransactionText'

// eslint-disable-next-line react/prop-types
const ContextAwareToggle = ({ eventKey, callback }) => {
  const { activeEventKey } = useContext(AccordionContext)

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  )

  const isCurrentEventKey = activeEventKey === eventKey

  return (
    <button
      type="button"
      aria-label="Show transaction info"
      title="Show transaction info"
      className={classNames(style.btnExpand, {
        [style.active]: isCurrentEventKey,
      })}
      onClick={decoratedOnClick}
    >
      <Icon
        name="icon-dropdown-filter-chevron-down"
        size={24}
        className={style.iconChevron}
      />
    </button>
  )
}

/**
 * ItemTransaction component
 */
const ItemTransaction = (props) => {
  const {
    className,
    id,
    status,
    amountMain,
    amountExtra,
    timestampCreated,
    type,
    user,
    ...rest
  } = props

  // eslint-disable-next-line react/prop-types,react/no-unstable-nested-components
  const TextDateTime = ({ dateTimeClassName }) => (
    <p className={classNames(style.textDateTime, dateTimeClassName)}>
      <span>{dayjs.unix(timestampCreated).format('D MMM')},</span>{' '}
      <span className={style.textTime}>
        {dayjs.unix(timestampCreated).format('hh:mm a')}
      </span>
    </p>
  )

  return (
    <Accordion
      {...rest}
      className={classNames(style.itemTransaction, className)}
    >
      <div className={style.iconContainer}>
        <Icon name={`icon-transaction-${type}`} size={24} />
      </div>
      <div className={style.colType}>
        <p className={style.textDesc}>
          {getTransactionText({ type, user, amountMain, amountExtra })}
        </p>
        <p className={style.textId}>ID {id}</p>
      </div>
      <TransactionStatusIndicator
        status={status}
        className={style.statusIndicator}
      />
      <TextDateTime dateTimeClassName={style.blockDateTimeXxl} />
      <div className={style.colAmount}>
        <p className={style.textAmountMain}>
          {amountMain.isNegative ? '-' : '+'} {amountMain.amount}{' '}
          {amountMain.currency}
        </p>
        {amountExtra && (
          <p className={style.textAmountExtra}>
            {amountExtra.isNegative ? '-' : '+'} {amountExtra.amount}{' '}
            {amountExtra.currency}
          </p>
        )}
      </div>
      <ContextAwareToggle eventKey={id} />
      <AccordionCollapse eventKey={id} className={style.accordionCollapse}>
        <div className={style.blockExpand}>
          <div className={style.blockExpandRow}>
            <p>Status:</p>
            <TransactionStatusIndicator status={status} />
          </div>
          <div className={style.blockExpandRow}>
            <p>Creation date:</p>
            <TextDateTime />
          </div>
        </div>
      </AccordionCollapse>
    </Accordion>
  )
}

ItemTransaction.defaultProps = {
  className: '',
  amountExtra: null,
  user: {},
}

ItemTransaction.propTypes = {
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  status: PropTypes.oneOf(Object.values(TransactionStatus)).isRequired,
  timestampCreated: PropTypes.number.isRequired,
  type: PropTypes.oneOf(Object.values(TransactionType)).isRequired,
  amountMain: PropTypes.any.isRequired,
  amountExtra: PropTypes.any,
  user: PropTypes.object,
}

export default ItemTransaction
