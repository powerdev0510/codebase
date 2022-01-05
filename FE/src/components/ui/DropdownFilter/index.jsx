import React, { useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Overlay, Popover } from 'react-bootstrap'

import * as style from './DropdownFilter.module.scss'
import BtnFilter from '../BtnFilter'
import DropdownFilterContext from '~contexts/DropdownFilterContext'

/**
 * DropdownFilter component
 */
const DropdownFilter = (props) => {
  const {
    className,
    filterEnum,
    filterKey,
    btnText,
    iconName,
    isClearable,
    variant,
    ...rest
  } = props

  const { filters, setFilters } = useContext(DropdownFilterContext)

  const buttonRef = useRef()

  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const currentFilter = filters?.[filterKey]

  return (
    <>
      <BtnFilter
        {...rest}
        setIsOverlayVisible={setIsOverlayVisible}
        isOpen={isOverlayVisible}
        ref={buttonRef}
        filterKey={filterKey}
        iconName={iconName}
        isClearable={isClearable}
        variant={variant}
      >
        {btnText}
      </BtnFilter>
      <Overlay
        target={buttonRef.current}
        placement={variant === 'inlinePrimary' ? 'bottom' : 'bottom-start'}
        show={isOverlayVisible}
        onHide={() => setIsOverlayVisible(false)}
        rootClose
        trigger="click"
        popperConfig={{
          modifiers: [{ name: 'offset', options: { offset: [0, 12] } }],
        }}
      >
        {({ placement, arrowProps, show: _show, popper, ...overlayProps }) => (
          <Popover
            id="search-popover"
            className={classNames(style.popover, { [style[variant]]: variant })}
            {...overlayProps}
          >
            <ul className={style.listOptions}>
              {Object.values(filterEnum).map((filterValue) => (
                <li key={filterValue}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOverlayVisible(false)
                      setFilters((prevValue) => ({
                        ...prevValue,
                        [filterKey]:
                          // eslint-disable-next-line no-nested-ternary
                          prevValue?.[filterKey] !== filterValue
                            ? filterValue
                            : isClearable
                            ? null
                            : filterValue,
                      }))
                    }}
                    className={classNames(style.itemOptionButton, {
                      [style.itemActive]: currentFilter === filterValue,
                    })}
                  >
                    <span>{filterValue}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Popover>
        )}
      </Overlay>
    </>
  )
}

DropdownFilter.defaultProps = {
  className: '',
  onClick: () => {},
  iconName: null,
  isClearable: true,
  btnText: '',
  variant: '',
}

DropdownFilter.propTypes = {
  className: PropTypes.string,
  filterEnum: PropTypes.object.isRequired,
  filterKey: PropTypes.string.isRequired,
  btnText: PropTypes.string,
  iconName: PropTypes.string,
  onClick: PropTypes.func,
  isClearable: PropTypes.bool,
  variant: PropTypes.string,
}

export default DropdownFilter
