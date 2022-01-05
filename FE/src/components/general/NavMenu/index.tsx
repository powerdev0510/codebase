import React from 'react'
import { Link } from 'gatsby'
import { Nav } from 'react-bootstrap'

import { TOP_NAV_MENU } from '~utils/constants'

type MenuProps = {
  className?: string
  variant?: 'header'
}

// eslint-disable-next-line react/prop-types
const Menu = (props: MenuProps) => {
  const { className, variant = 'header', ...rest } = props

  return (
    <Nav
      {...rest}
      className={className}
      as="ul"
      // @ts-ignore
      variant={variant}
    >
      {TOP_NAV_MENU.map(({ name, link }) => (
        <Nav.Item as="li" key={name}>
          <Nav.Link as={Link} to={link} activeClassName="active">
            {name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default Menu
