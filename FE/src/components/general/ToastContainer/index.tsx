import React, { useContext } from 'react'
import classNames from 'classnames'
import { ToastContainer } from 'react-bootstrap'
import OverlayContext from '~contexts/OverlayContext'

import * as style from './ToastContainer.module.scss'
import ToastCustom from './components/ToastCustom'

type ToastContainerProps = {
  className?: string
  [otherProps: string]: any
}

const ToastContainerCustom = (props: ToastContainerProps) => {
  const { className, ...rest } = props

  const { toastStack } = useContext(OverlayContext)

  return (
    <ToastContainer
      {...rest}
      className={classNames(style.toastContainer, className)}
    >
      {toastStack.map((toast, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ToastCustom key={index} type={toast.type} text={toast.text} show />
      ))}
    </ToastContainer>
  )
}

export default ToastContainerCustom
