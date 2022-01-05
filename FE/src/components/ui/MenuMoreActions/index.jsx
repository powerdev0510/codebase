import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'react-bootstrap'
import classNames from 'classnames'

import Icon from '~components/ui/Icon'
import BtnMenu from './components/BtnMenu'

/**
 * MenuMoreActions component
 */
const MenuMoreActions = (props) => {
  const { className, menuItems, onSelect, iconName, ...rest } = props

  return (
    <Dropdown {...rest} className={className} onSelect={onSelect} align="end">
      <Dropdown.Toggle as={BtnMenu} iconName={iconName} />
      <Dropdown.Menu
        variant="dark"
        className="dropdown-menu-more-actions"
        popperConfig={{
          modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
        }}
      >
        {menuItems.map(({ variant, icon, text, ...otherOptions }) => (
          <Dropdown.Item
            {...otherOptions}
            eventKey={text}
            key={text}
            className={classNames({
              [`dropdown-item--${variant}`]: variant,
            })}
          >
            <Icon name={icon} size={16} />
            <span>{text}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

MenuMoreActions.defaultProps = {
  className: '',
  onSelect: null,
  iconName: 'icon-three-dots',
}

MenuMoreActions.propTypes = {
  className: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      variant: PropTypes.string,
    })
  ).isRequired,
  onSelect: PropTypes.func,
  iconName: PropTypes.string,
}

export default MenuMoreActions
