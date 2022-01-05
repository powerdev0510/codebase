import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import Icon from '~components/ui/Icon'

/**
 * BtnMenu component
 */
const BtnMenu = React.forwardRef((props, ref) => {
  const { className, iconName, ...rest } = props

  return (
    <Button {...rest} variant="menu" ref={ref}>
      <Icon name={iconName} size={16} />
    </Button>
  )
})

BtnMenu.defaultProps = {
  className: '',
  iconName: 'icon-three-dots',
}

BtnMenu.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string,
}

export default BtnMenu
