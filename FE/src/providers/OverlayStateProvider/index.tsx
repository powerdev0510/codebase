import React, { ReactNode, useState } from 'react'
import OverlayContext from '~contexts/OverlayContext'
import { Toast } from '~interfaces'

type OverlayStateProviderProps = {
  children: ReactNode
  [otherProps: string]: any
}

const OverlayStateProvider = (props: OverlayStateProviderProps) => {
  const { children, ...rest } = props

  const [isModalRegisterVisible, setIsModalRegisterVisible] = useState(false)
  const [toastStack, setToastStack] = useState<Toast[]>([])

  const addToastToStack = (toast: Toast) =>
    setToastStack((prevState) => [...prevState, toast])

  return (
    <OverlayContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isModalRegisterVisible,
        setIsModalRegisterVisible,
        toastStack,
        addToastToStack,
      }}
      {...rest}
    >
      {children}
    </OverlayContext.Provider>
  )
}

export default OverlayStateProvider
