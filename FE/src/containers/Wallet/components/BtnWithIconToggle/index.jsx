import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { AccordionContext, Button, useAccordionButton } from 'react-bootstrap'

import * as style from './BtnWithIconToggle.module.scss'
import Icon from '~components/ui/Icon'

/**
 * BtnWithIconToggle component
 */
const BtnWithIconToggle = React.forwardRef((props, ref) => {
  const { className, eventKey, callback, setIsFilterBarExtended, ...rest } =
    props

  const { activeEventKey } = useContext(AccordionContext)

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  )

  const isCurrentEventKey = activeEventKey === eventKey

  setIsFilterBarExtended(isCurrentEventKey)

  return (
    <Button
      {...rest}
      variant="outline-dark-field"
      className={classNames(style.btnWIconToggle, className)}
      type="button"
      ref={ref}
      onClick={decoratedOnClick}
    >
      <span className={style.text}>Filters</span>
      {isCurrentEventKey ? (
        <Icon name="icon-close" size={24} />
      ) : (
        <Icon
          name="icon-filter-settings"
          size={20}
          className={style.iconFilterSettings}
        />
      )}
    </Button>
  )
})

BtnWithIconToggle.defaultProps = {
  className: '',
  eventKey: null,
  callback: () => {},
  setIsFilterBarExtended: () => {},
}

BtnWithIconToggle.propTypes = {
  className: PropTypes.string,
  eventKey: PropTypes.any,
  callback: PropTypes.func,
  setIsFilterBarExtended: PropTypes.func,
}

export default BtnWithIconToggle
