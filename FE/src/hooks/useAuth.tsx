import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  InjectedConnector,
  NoEthereumProviderError,
} from '@web3-react/injected-connector'
import { ethers } from 'ethers'

import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from '~utils/enums'
import { sendGet, sendPost } from '~utils/api'
import OverlayContext from '~contexts/OverlayContext'

declare const window: any

export type UserType = {
  address: string
  name?: string
  profileImg?: string
  coverImg?: string
}

type LogInContextType = {
  isLoading: boolean
  isLoggedIn: boolean
  user?: UserType
  connect: () => Promise<any>
  register: (params: any, callback?: Function) => any
  disconnect: () => void
}

const AuthContext = createContext<LogInContextType>({
  isLoading: false,
  isLoggedIn: false,
  user: undefined,
  // @ts-ignore
  connect: () => {},
  register: () => {},
  disconnect: () => {},
})

const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
})

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<UserType>()

  const { active, error, activate, deactivate, account } = useWeb3React()

  const { addToastToStack } = useContext(OverlayContext)

  const connect = async () => {
    await activate(injected, (e) => {
      //
      // Wrong network error
      if (e instanceof UnsupportedChainIdError) {
        //
        // Attempt to switch chain
        if (window.ethereum) {
          window.ethereum
            .request({
              method: 'wallet_switchEthereumChain',
              params: [
                { chainId: ethers.utils.hexValue(SupportedChainId.RINKEBY) },
              ],
            })
            .then(() => connect())
            .catch((switchError: any) => {
              // User rejected the switch
              if (switchError.code === 4001) {
                // Nothing special, handled automatically
              }

              // Network not added to MetaMask
              if (switchError.code === 4902) {
                // TODO: add "wallet_addEthereumChain" if not default ethereum network
              }
            })
        }
        return
      }

      // No MetaMask error
      if (e instanceof NoEthereumProviderError) {
        addToastToStack({ type: 'missingMetaMask' })
      }
    })
    setIsLoading(false)
  }

  // Reconnect is already authorized by MetaMask
  // E.g. page refresh
  // Does not work with deactivate()
  useEffect(() => {
    setIsLoading(true)
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized && !active && !error) {
          connect()
        }
      })
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsLoading(false))
  }, [activate, active, error])

  const disconnect = async () => {
    try {
      deactivate()
    } catch (e) {
      console.log(e)
    }
  }

  const connectUser = async () => {
    try {
      setIsLoading(true)
      const { data: ret } = await sendPost('user/connect', { address: account })
      localStorage.setItem('token', ret.token)
      // @ts-ignore
      setUser({ address: account })
      setIsLoggedIn(true)
      const { data } = await sendGet('user/profile')
      setUser(data)
    } catch (e) {
      console.log('Failed to connect user', e)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (params: any) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true)

        const { data: ret } = await sendPost('user/register', params)
        localStorage.setItem('token', ret.token)

        const { data } = await sendGet('user/profile')

        setUser(data)
        setIsLoggedIn(true)
        setIsLoading(false)

        // eslint-disable-next-line no-promise-executor-return
        return resolve(data)
      } catch (e) {
        console.log('Failed to register user', e)
        setIsLoading(false)

        // eslint-disable-next-line no-promise-executor-return
        return reject(e)
      }
    })
  }

  useEffect(() => {
    if (active) {
      connectUser()
    } else {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      setUser(undefined)
    }
  }, [active, account])

  const memoedValue = useMemo(
    () => ({
      isLoggedIn,
      user,
      connect,
      register,
      disconnect,
      isLoading,
    }),
    [isLoggedIn, user, connect, register, disconnect, isLoading]
  )

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
