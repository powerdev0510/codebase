import React from 'react'
import { Button, ModalBody } from 'react-bootstrap'

// @ts-ignore
import * as style from './ModalVerifyProfile.module.scss'
import ModalWrapper from '~components/ui/ModalWrapper'
import Icon from '~components/ui/Icon'

type ModalVerifyProfileProps = {
  className?: string
  isVisible: boolean
  onHide: () => {}
  [otherProps: string]: any
}

const ModalVerifyProfile = (props: ModalVerifyProfileProps) => {
  const { className, isVisible, onHide, ...rest } = props

  return (
    <ModalWrapper
      title="Verify your Profile"
      {...rest}
      className={className}
      show={isVisible}
      onHide={onHide}
    >
      <ModalBody className={style.modalBody}>
        <p>Show the SolPixel community that your profile is authentic.</p>
        <div className={style.gridButtons}>
          <Button variant="outline-primary" className={style.btn}>
            <span>Verify via Twitter</span>
            <Icon name="icon-twitter" size={24} />
          </Button>
          <Button variant="outline-danger" className={style.btn}>
            <span>Verify via Instagram</span>
            <Icon name="icon-instagram" size={24} />
          </Button>
        </div>
      </ModalBody>
    </ModalWrapper>
  )
}

export default ModalVerifyProfile
