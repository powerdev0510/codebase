import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import dayjs from 'dayjs'

import * as style from './BtnFilter.module.scss'
import Icon from '~components/ui/Icon'
import TransactionFilterContext from '~contexts/DropdownFilterContext'
import { INITIAL_DATE_RANGE_ARRAY } from '~utils/constants'

/**
 * BtnFilter component
 */
const BtnFilter = React.forwardRef((props, ref) => {
  const {
    className,
    isOpen,
    filterKey,
    children,
    setIsOverlayVisible,
    onClick,
    iconName,
    isClearable,
    variant,
    ...rest
  } = props

  const { filters, setFilters } = useContext(TransactionFilterContext)

  const getReadableDateValue = (dateRangesArray) => {
    const dateRange = dateRangesArray?.[0]

    const { startDate, endDate } = dateRange

    if (!startDate || !endDate) return null

    return `${dayjs(startDate).format('DD MMM')} – ${dayjs(endDate).format(
      'DD MMM'
    )}`
  }

  const currentFilterValue =
    filterKey === 'date'
      ? getReadableDateValue(filters[filterKey])
      : filters[filterKey]

  const clearCurrentFilter = () => {
    if (filterKey === 'date') {
      setFilters((prevState) => ({
        ...prevState,
        [filterKey]: INITIAL_DATE_RANGE_ARRAY,
      }))
      return
    }

    setFilters((prevState) => ({
      ...prevState,
      [filterKey]: null,
    }))
  }

  const toggleOverlayVisibility = () => {
    setIsOverlayVisible((prevState) => !prevState)
  }

  return (
    <button
      {...rest}
      className={classNames(
        style.btnTransactionFilter,
        { [style.open]: isOpen, [style[variant]]: variant },
        className
      )}
      type="button"
      ref={ref}
      onClick={(e) => {
        toggleOverlayVisibility()
        onClick(e)
      }}
    >
      {variant !== 'inlinePrimary' && (
        <Icon
          name={iconName || `icon-dropdown-filter-${filterKey}`}
          size={24}
          className={style.iconFilter}
        />
      )}
      <span>{currentFilterValue ?? children}</span>
      {currentFilterValue && isClearable ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            clearCurrentFilter()
            setIsOverlayVisible(false)
          }}
        >
          <Icon
            name="icon-dropdown-filter-x"
            size={20}
            className={style.iconClear}
          />
        </button>
      ) : (
        <Icon
          name="icon-dropdown-filter-chevron-down"
          size={24}
          className={style.iconChevron}
        />
      )}
    </button>
  )
})

BtnFilter.defaultProps = {
  className: '',
  isOpen: false,
  isClearable: true,
  onClick: () => {},
  iconName: null,
  variant: '',
}

BtnFilter.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  iconName: PropTypes.string,
  isOpen: PropTypes.bool,
  isClearable: PropTypes.bool,
  filterKey: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  setIsOverlayVisible: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default BtnFilter
