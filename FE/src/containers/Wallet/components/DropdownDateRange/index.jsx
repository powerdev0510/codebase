import React, { useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Overlay, Popover } from 'react-bootstrap'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import '~styles/components/react-date-range-theme.scss'

import classNames from 'classnames'
import dayjs from 'dayjs'
import * as style from './DropdownDateRange.module.scss'
import BtnFilter from '~components/ui/BtnFilter'
import TransactionFilterContext from '~contexts/DropdownFilterContext'
import Icon from '~components/ui/Icon'
import { INITIAL_DATE_RANGE_ARRAY } from '~utils/constants'

/**
 * DropdownDateRange component
 */
const DropdownDateRange = (props) => {
  const { className, filterKey, btnText, ...rest } = props

  // eslint-disable-next-line no-unused-vars
  const { filters, setFilters } = useContext(TransactionFilterContext)
  // eslint-disable-next-line no-unused-vars
  const currentFilter = filters?.[filterKey]

  const dateRange = currentFilter?.[0]

  const buttonRef = useRef()

  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const handleClearDateFilter = () => {
    setFilters((prevState) => ({
      ...prevState,
      date: INITIAL_DATE_RANGE_ARRAY,
    }))
  }

  const handleHide = () => setIsOverlayVisible(false)

  const getFormattedDateRange = (dateRangeObj) => {
    const { startDate, endDate } = dateRangeObj

    if (!startDate || !endDate) return 'All dates selected'

    return `${dayjs(startDate).format('DD MMM')} – ${dayjs(endDate).format(
      'DD MMM YYYY'
    )}`
  }

  return (
    <>
      <BtnFilter
        {...rest}
        setIsOverlayVisible={setIsOverlayVisible}
        isOpen={isOverlayVisible}
        ref={buttonRef}
        filterKey={filterKey}
      >
        {btnText}
      </BtnFilter>
      <Overlay
        target={buttonRef.current}
        placement="bottom-start"
        show={isOverlayVisible}
        onHide={handleHide}
        rootClose
        trigger="click"
        popperConfig={{
          modifiers: [{ name: 'offset', options: { offset: [0, 12] } }],
        }}
      >
        {({ placement, arrowProps, show: _show, popper, ...overlayProps }) => (
          <Popover
            id="search-popover"
            className={style.popover}
            {...overlayProps}
          >
            <div className={style.popoverHead}>
              <Icon name="icon-dropdown-filter-date" size={20} />
              <div>{getFormattedDateRange(dateRange)}</div>
              <button
                type="button"
                className={style.btnIcon}
                onClick={handleClearDateFilter}
              >
                <Icon name="icon-date-range-clear" size={24} />
              </button>
              <button
                type="button"
                className={classNames(style.btnIcon, style.iconApply)}
                onClick={handleHide}
              >
                <Icon name="icon-date-range-apply" size={24} />
              </button>
            </div>
            <div className={style.containerCalendar}>
              <DateRange
                editableDateInputs
                onChange={(item) =>
                  setFilters((prevState) => ({
                    ...prevState,
                    date: [item.selection],
                  }))
                }
                moveRangeOnFirstSelection={false}
                ranges={currentFilter}
                rangeColors={['transparent']}
                showDateDisplay={false}
              />
            </div>
          </Popover>
        )}
      </Overlay>
    </>
  )
}

DropdownDateRange.defaultProps = {
  className: '',
  onClick: () => {},
}

DropdownDateRange.propTypes = {
  className: PropTypes.string,
  filterKey: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default DropdownDateRange
