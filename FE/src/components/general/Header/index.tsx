/* eslint-disable camelcase */
import React, { useState, Suspense, useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'gatsby'
// TODO: post-MVP
// import classNames from 'classnames'
// import Menu from '~components/general/NavMenu'
// import InputSearch from '~components/ui/InputSearch'
// import NavMenuMobile from '~components/general/NavMenuMobile'
import * as style from './Header.module.scss'
import BtnAvatar from './components/BtnAvatar'
import BtnWallet from './components/BtnWallet'
import BtnIcon from '~components/ui/BtnIcon'
import Route from '~routes'
import ModalStateContext from '~contexts/OverlayContext'
import useAuth from '~hooks/useAuth'
// @ts-ignore
import PixelVerseLogo from '~img/PixelVerseLogo.svg'

const ModalRegister = React.lazy(
  () =>
    import(
      /* webpackChunkName: "modal-register" */ './components/ModalRegister'
    )
)

const ModalMint = React.lazy(
  () => import(/* webpackChunkName: "modal-mint" */ './components/ModalMint')
)

// TODO: post-MVP
// const ModalStart = React.lazy(
//   () => import(/* webpackChunkName: "modal-start" */ './components/ModalStart')
// )

// eslint-disable-next-line react/prop-types
const Header = ({ siteTitle }: { siteTitle: string }) => {
  const { user } = useAuth()

  const { isModalRegisterVisible, setIsModalRegisterVisible } =
    useContext(ModalStateContext)
  const [isModalMintVisible, setIsModalMintVisible] = useState(false)
  // const [isModalStartVisible, setIsModalStartVisible] = useState(false)
  // const [isMobileNavVisible, setIsMobileNavVisible] = useState(false)

  const handleHideModalRegister = () => setIsModalRegisterVisible(false)
  const handleShowModalRegister = () => setIsModalRegisterVisible(true)

  const handleHideModalMint = () => setIsModalMintVisible(false)
  const handleShowModalMint = () => setIsModalMintVisible(true)

  // TODO: post-MVP
  // const handleHideModalStart = () => setIsModalStartVisible(false)
  // const handleShowModalStart = () => setIsModalStartVisible(true)

  // TODO: post-MVP
  // const toggleMobileNavVisibility = () =>
  //   setIsMobileNavVisible((prevState) => !prevState)

  const isSSR = typeof window === 'undefined'

  return (
    <>
      {!isSSR && (
        <Suspense fallback={<div />}>
          <ModalRegister
            isVisible={isModalRegisterVisible}
            onHide={handleHideModalRegister}
          />
        </Suspense>
      )}
      {!isSSR && (
        <Suspense fallback={<div />}>
          <ModalMint
            isVisible={isModalMintVisible}
            onHide={handleHideModalMint}
          />
        </Suspense>
      )}
      {/* TODO: post-MVP */}
      {/* {!isSSR && ( */}
      {/*  <Suspense fallback={<div />}> */}
      {/*    <ModalStart */}
      {/*      isVisible={isModalStartVisible} */}
      {/*      onHide={handleHideModalStart} */}
      {/*    /> */}
      {/*  </Suspense> */}
      {/* )} */}
      <header className={style.header}>
        <Container className={style.headerInner}>
          <div className={style.gridLeft}>
            <Link to={Route.HOMEPAGE} title={siteTitle}>
              <img
                src={PixelVerseLogo}
                alt={siteTitle}
                width="30"
                height="32"
              />
            </Link>
            {/* TODO: post-MVP */}
            {/* <InputSearch */}
            {/*  className={style.inpSearch} */}
            {/*  placeholder="Search SolPixel" */}
            {/* /> */}
          </div>
          {/* TODO: post-MVP */}
          {/* <Menu variant="header" className={style.nav} /> */}
          <div />
          <div className={style.gridRight}>
            <BtnWallet />
            {/* TODO: post-MVP */}
            {/* <div className={style.vrLg} tabIndex={-1} /> */}
            {user && (
              <>
                <BtnAvatar
                  className={style.btnAvatar}
                  imgSrc={user.profileImg}
                />
                <div className={style.vrXxl} tabIndex={-1} />
                <Button
                  variant="outline-success"
                  className={style.btnCreate}
                  onClick={
                    user.name ? handleShowModalMint : handleShowModalRegister
                  }
                >
                  Create
                </Button>
                <BtnIcon
                  onClick={
                    user.name ? handleShowModalMint : handleShowModalRegister
                  }
                  iconName="icon-create-nft"
                  title="Create"
                  className={style.btnCreateIcon}
                  isAdaptive
                />
              </>
            )}
            {/* TODO: post-MVP */}
            {/* <BtnIcon */}
            {/*  iconName={ */}
            {/*    isMobileNavVisible */}
            {/*      ? 'icon-header-menu-close' */}
            {/*      : 'icon-header-menu' */}
            {/*  } */}
            {/*  title="Menu" */}
            {/*  variant="outline-primary" */}
            {/*  className={style.btnMenuIcon} */}
            {/*  isAdaptive */}
            {/*  onClick={toggleMobileNavVisibility} */}
            {/* /> */}
          </div>
        </Container>
      </header>
      {/* <NavMenuMobile */}
      {/*  // @ts-ignore */}
      {/*  className={classNames(style.mobileMenu, { */}
      {/*    [style.visible]: isMobileNavVisible, */}
      {/*  })} */}
      {/* /> */}
    </>
  )
}

export default Header
