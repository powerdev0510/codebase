import React from 'react'
import PropTypes from 'prop-types'
import { Container, Nav } from 'react-bootstrap'
import { Link } from 'gatsby'

import * as style from './NavMenuMobile.module.scss'
import { TOP_NAV_MENU } from '~utils/constants'
import InputSearch from '~components/ui/InputSearch'
import Social from '~components/general/SocialMenu'

/**
 * NavMenuMobile component
 */
const NavMenuMobile = React.forwardRef((props, ref) => {
  const { className, ...rest } = props

  return (
    <div {...rest} className={className} ref={ref}>
      <Container className={style.menuMobileInner}>
        <div className={style.inpSearchWrapper}>
          <InputSearch
            placeholder="Search SolPixel"
            className={style.inpSearch}
          />
        </div>
        <div className={style.navWrapper}>
          <Nav as="ul" variant="headerMobile">
            {TOP_NAV_MENU.map(({ name, link }) => (
              <Nav.Item as="li" key={name}>
                <Nav.Link as={Link} to={link} activeClassName="active">
                  {name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <div className={style.cardFooter}>
          <Social className={style.social} />
        </div>
      </Container>
    </div>
  )
})

NavMenuMobile.defaultProps = {
  className: '',
}

NavMenuMobile.propTypes = {
  className: PropTypes.string,
}

export default NavMenuMobile
