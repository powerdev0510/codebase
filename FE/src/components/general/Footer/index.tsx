/* eslint-disable camelcase */

import React from 'react'
// TODO: post-MVP
import { Container } from 'react-bootstrap'
import Menu from '~components/general/NavMenu'
import Social from '~components/general/SocialMenu'

// @ts-ignore
import * as style from './Footer.module.scss'

// eslint-disable-next-line react/prop-types
const Footer = () => {
  return (
    <footer className={style.footer}>
      <Container className={style.footerInner}>
        {/* @ts-ignore */}
        <Menu variant="footer" className={style.nav} />
        <Social />
      </Container>
    </footer>
  )
}

export default Footer
