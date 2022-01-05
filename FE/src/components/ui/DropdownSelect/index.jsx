import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Overlay, Popover } from 'react-bootstrap'

import * as style from './DropdownSelect.module.scss'
import Icon from '~components/ui/Icon'

/**
 * DropdownSelect component
 */
const DropdownSelect = (props) => {
  const {
    className,
    activeValue,
    setActiveValue,
    onClick,
    values,
    displayKey,
    primaryKey,
    valuesAsPlainArray,
    ...rest
  } = props

  const buttonRef = useRef()

  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const toggleOverlayVisibility = () => {
    setIsOverlayVisible((prevState) => !prevState)
  }

  return (
    <>
      <button
        {...rest}
        className={classNames(
          style.dropdownButton,
          { [style.active]: isOverlayVisible },
          className
        )}
        type="button"
        ref={buttonRef}
        onClick={(e) => {
          toggleOverlayVisibility()
          onClick(e)
        }}
      >
        <img
          src={activeValue.img}
          alt={valuesAsPlainArray ? activeValue : activeValue[displayKey]}
          width={24}
          height={24}
          className={style.img}
        />
        <span>
          {valuesAsPlainArray ? activeValue : activeValue[displayKey]}
        </span>
        <Icon
          name="icon-dropdown-filter-chevron-down"
          size={24}
          className={style.iconChevron}
        />
      </button>
      <Overlay
        target={buttonRef.current}
        placement="bottom"
        show={isOverlayVisible}
        onHide={() => setIsOverlayVisible(false)}
        rootClose
        trigger="click"
        popperConfig={{
          modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
        }}
      >
        {({ placement, arrowProps, show: _show, popper, ...overlayProps }) => (
          <Popover
            id="search-popover"
            className={style.popover}
            {...overlayProps}
          >
            <ul className={style.listOptions}>
              {Object.values(values).map((value) => (
                <li
                  className={classNames(style.itemOption, {
                    [style.itemActive]: valuesAsPlainArray
                      ? value === activeValue
                      : value[primaryKey] === activeValue[primaryKey],
                  })}
                  key={value[primaryKey]}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveValue(value)
                      setIsOverlayVisible(false)
                    }}
                    className={style.itemOptionButton}
                  >
                    <img
                      src={value.img}
                      alt={valuesAsPlainArray ? value : value[displayKey]}
                      width={24}
                      height={24}
                      className={style.img}
                    />

                    <span>
                      {valuesAsPlainArray ? value : value[displayKey]}
                    </span>
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

DropdownSelect.defaultProps = {
  className: '',
  onClick: () => {},
  primaryKey: 'id',
  displayKey: 'name',
  valuesAsPlainArray: false,
}

DropdownSelect.propTypes = {
  className: PropTypes.string,
  activeValue: PropTypes.any.isRequired,
  setActiveValue: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  primaryKey: PropTypes.string,
  displayKey: PropTypes.string,
  valuesAsPlainArray: PropTypes.bool,
}

export default DropdownSelect
