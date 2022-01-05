import React from 'react'
import PropTypes from 'prop-types'

import '~styles/app.scss'
import Footer from '~components/general/Footer'
import Header from '~components/general/Header'
import * as style from './Layout.module.scss'
import ToastContainerCustom from '~components/general/ToastContainer'

// TODO: to TS
const Layout = (props) => {
  const { children, siteTitle, activePage } = props

  return (
    <div className={style.layout}>
      <ToastContainerCustom />
      <Header siteTitle={siteTitle} activePage={activePage} />
      <main className={style.main}>{children}</main>
      <Footer siteTitle={siteTitle} />
    </div>
  )
}

Layout.defaultProps = {
  activePage: '',
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string.isRequired,
  activePage: PropTypes.string,
}

export default Layout
