import React, { FC } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import cn from 'classnames'

import Icon from '~components/ui/Icon'
import * as style from './ModalWrapper.module.scss'

type ModalWrapperProps = {
  title?: string
  className?: string
  show: boolean
  onHide: () => void
  backdrop?: 'static' | boolean
  contentClassName?: string
  isShort?: boolean
  isLoading?: boolean
  loadingText?: string
  extraText?: string
  [otherProps: string]: any
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  title,
  className,
  show,
  onHide,
  backdrop,
  contentClassName,
  isShort,
  children,
  isLoading = false,
  loadingText = 'Loading',
  extraText = 'Please, keep this tab open.',
  ...rest
}) => (
  <Modal
    {...rest}
    className={className}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    show={show}
    backdrop={backdrop}
    onHide={onHide}
    contentClassName={contentClassName}
  >
    <button
      className={cn(style.btnClose, { [style.hiddenOnMobile]: isShort })}
      type="button"
      onClick={onHide}
    >
      <Icon name="icon-close" size={[24, 24]} />
    </button>
    {title && (
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" as="h3">
          {title}
        </Modal.Title>
      </Modal.Header>
    )}
    {children}
    {isLoading && (
      <div className={style.loadingOverlay}>
        <div className={style.spinnerWrapper}>
          <Spinner animation="border" role="status" className={style.spinner} />
          <div className={style.textContainer}>
            <p className={style.extraText}>{extraText}</p>
            <p className={style.textLoading}>{loadingText}</p>
          </div>
        </div>
      </div>
    )}
  </Modal>
)

export default ModalWrapper
