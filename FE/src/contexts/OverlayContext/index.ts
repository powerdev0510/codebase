import { createContext } from 'react'
import { Toast } from '~interfaces'

type ModalStateContextType = {
  isModalMintVisible?: boolean
  setIsModalMintVisible?: Function
  isModalRegisterVisible: boolean
  setIsModalRegisterVisible: Function
  toastStack: Toast[]
  addToastToStack: Function
}

export default createContext<ModalStateContextType>({
  isModalRegisterVisible: false,
  setIsModalRegisterVisible: () => {},
  toastStack: [],
  addToastToStack: () => {},
})
