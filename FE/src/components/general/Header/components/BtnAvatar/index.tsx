import React, { useContext } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
// TODO: post-MVP
// import { Link } from 'gatsby'
// import Route from '~routes'
import * as style from './BtnAvatar.module.scss'
import ModalStateContext from '~contexts/OverlayContext'
import useAuth from '~hooks/useAuth'
import Icon from '~components/ui/Icon'
import Picture from '~components/ui/Picture'

type BtnAvatarProps = {
  className?: string
  imgSrc?: string
  [otherProps: string]: any
}

const BtnAvatar = (props: BtnAvatarProps) => {
  const { className, imgSrc, ...rest } = props

  const { user } = useAuth()
  const { setIsModalRegisterVisible } = useContext(ModalStateContext)

  const handleShowModalRegister = () => setIsModalRegisterVisible(true)

  return (
    <Button
      {...rest}
      className={classNames(style.btnAvatar, className)}
      variant="outline-dark"
      type="button"
      onClick={!user?.name ? handleShowModalRegister : () => {}}
      // TODO: post-MVP
      // @ts-ignore
      // as={Link}
      // to={`${Route.USER}1`}
    >
      {imgSrc ? (
        <Picture
          src={imgSrc}
          alt="Avatar"
          width="100%"
          height="100%"
          className={style.imgAvatar}
          maxWidth={48}
        />
      ) : (
        <Icon name="icon-user-default" size={[24, 20]} />
      )}
    </Button>
  )
}

export default BtnAvatar
