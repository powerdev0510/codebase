import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { Accordion } from 'react-bootstrap'

import DropdownFilter from '~components/ui/DropdownFilter'
import InputSearch from '~components/ui/InputSearch'
import ItemTransaction from '../ItemTransaction'
import BtnWithIconToggle from '../BtnWithIconToggle'
import DropdownDateRange from '../DropdownDateRange'
import TransactionFilterContext from '~contexts/DropdownFilterContext'
import { INITIAL_DATE_RANGE_ARRAY } from '~utils/constants'
import { MOCK_TRANSACTIONS } from '~utils/mocks'
import { TransactionStatus, TransactionType } from '~utils/enums'
import { filterTransactions } from './utils'
import * as style from './CardTransactions.module.scss'

dayjs.extend(isBetween)

/**
 * CardTransactions component
 */
const CardTransactions = (props) => {
  const { className, ...rest } = props

  const filterBarRef = useRef()

  const [transactionFilters, setTransactionFilters] = useState({
    date: INITIAL_DATE_RANGE_ARRAY,
    search: '',
  })

  const [isFilterBarExtended, setIsFilterBarExtended] = useState(false)

  return (
    <div className={className}>
      <Accordion className="accordion--fade">
        <div className={style.rowHeading}>
          <h3>Transactions</h3>
          <BtnWithIconToggle
            eventKey="0"
            setIsFilterBarExtended={setIsFilterBarExtended}
          />
        </div>
        <Accordion.Collapse eventKey="0" className={style.accordionCollapse}>
          <div className={style.filterBarContainer}>
            <TransactionFilterContext.Provider
              // eslint-disable-next-line react/jsx-no-constructed-context-values
              value={{
                filters: transactionFilters,
                setFilters: setTransactionFilters,
              }}
            >
              <div className={style.filterBar} ref={filterBarRef}>
                <DropdownFilter
                  filterEnum={TransactionType}
                  filterKey="type"
                  btnText="Transaction Type"
                  iconName="icon-transaction-convert"
                />
                <DropdownFilter
                  filterEnum={TransactionStatus}
                  filterKey="status"
                  btnText="Status"
                />
                <DropdownDateRange btnText="Date" filterKey="date" />
              </div>
              <InputSearch
                className={style.inpSearch}
                behavior="none"
                placeholder="Search"
                isSearchFilter
                size="sm"
                onChange={(e) =>
                  setTransactionFilters((prevState) => ({
                    ...prevState,
                    search: e.target.value,
                  }))
                }
                onClear={() =>
                  setTransactionFilters((prevState) => ({
                    ...prevState,
                    search: '',
                  }))
                }
                value={transactionFilters.search}
              />
            </TransactionFilterContext.Provider>
          </div>
        </Accordion.Collapse>
      </Accordion>
      <div {...rest} className={style.cardTransactions}>
        <div className={style.itemHeader}>
          <p>Transaction type</p>
          <p className={style.textStatus}>Status</p>
          <p className={style.textCreationDate}>Creation date</p>
          <p className={style.textAmount}>Amount</p>
        </div>
        {MOCK_TRANSACTIONS.filter((transaction) =>
          filterTransactions(
            transaction,
            isFilterBarExtended,
            transactionFilters
          )
        ).map(({ id, ...transactionProps }) => (
          <ItemTransaction key={id} id={id} {...transactionProps} />
        ))}
      </div>
    </div>
  )
}

CardTransactions.defaultProps = {
  className: '',
}

CardTransactions.propTypes = {
  className: PropTypes.string,
}

export default CardTransactions
