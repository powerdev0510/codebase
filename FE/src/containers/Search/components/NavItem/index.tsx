import React, { FC } from 'react'
import { Nav } from 'react-bootstrap'

import * as style from './NavItem.module.scss'

type NavItemProps = {
  eventKey: string
  title: string
  className?: string
}

const NavItem: FC<NavItemProps> = ({ eventKey, title, className }) => (
  <Nav.Item>
    <Nav.Link eventKey={eventKey} as="button" className={className}>
      <span className={style.navItemText}>{title}</span>
    </Nav.Link>
  </Nav.Item>
)

export default NavItem
