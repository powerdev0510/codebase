import axios, { Method } from 'axios'
import { QueryClient } from 'react-query'
import { API_ROOT_URL } from './constants'

declare const window: any

const sendRequest = async (
  method: Method,
  endpoint: string,
  params: any,
  data?: any
): Promise<any> => {
  const token = localStorage.getItem('token')
  const url = `${API_ROOT_URL}/${endpoint}`
  const headers = { Authorization: `Bearer ${token}` }
  const { data: ret } = await axios.request({
    url,
    method,
    params,
    data,
    headers,
  })
  return ret
}

export const sendGet = (endpoint: string, params = {}) =>
  sendRequest('GET', endpoint, params)

export const sendPost = (endpoint: string, data = {}, params = {}) =>
  sendRequest('POST', endpoint, params, data)

export const sendPut = (endpoint: string, data = {}, params = {}) =>
  sendRequest('PUT', endpoint, params, data)

export const sendDelete = (endpoint: string, params = {}) =>
  sendRequest('DELETE', endpoint, params)

export const sendTransaction = async (data: any) => {
  const txHash = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [data],
  })
  return txHash
}

export const sendMultipleTransaction = async (data1: any, data2: any) => {
  try {
    // Send 1st transaction
    const txHash1 = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [data1],
    })
    // Check status
    let txResult = null
    /* eslint-disable no-await-in-loop */
    while (!txResult) {
      txResult = await window.ethereum.request({
        method: 'eth_getTransactionReceipt',
        params: [txHash1],
      })
    }
    /* eslint-enable no-await-in-loop */
    // Send 2nd transaction
    const txHash2 = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [data2],
    })
    return txHash2
  } catch (e) {
    console.log(e)
  }
  return null
}

export const waitForTransactionReceipt = (txHash: string) =>
  new Promise((resolve, reject) => {
    const pollingInterval = setInterval(() => {
      window.ethereum
        .request({
          method: 'eth_getTransactionReceipt',
          params: [txHash],
        })
        .then((txResult: any) => {
          if (txResult) {
            clearInterval(pollingInterval)
            resolve(txResult)
          }
        })
        .catch((error: any) => {
          reject(error)
          clearInterval(pollingInterval)
        })
    }, 500)
  })

export const ApiKey = {
  CATEGORY_LIST: 'category/list',
  AUCTION_LIST: 'auction/list',
  AUCTION_DETAIL: 'auction/detail',
  AUCTION_PURCHASE: 'auction/purchase',
  PURCHASE_APPROVE: 'pixel/approve',
  AUCTION_HISTORY: 'auction/history',
  NFT_MINT: 'nft/mint',
  IMAGE: 'image',
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000, // 30s
      refetchOnWindowFocus: false,
      retry: false, // after getting error disable auto-retry
    },
  },
})

export const getCategoriesList = () =>
  sendGet(ApiKey.CATEGORY_LIST).then((res) => res.data)

export const getAuctionsByCategory = (
  category: string,
  sortBy: string = 'startAt',
  sortOrder: 'asc' | 'desc' = 'desc',
  limit: number = 15,
  skip: number = 0
) =>
  sendGet(ApiKey.AUCTION_LIST, {
    category,
    limit,
    sortBy,
    sortOrder,
    skip,
  }).then((res) => res.data)

export const getAuctionDetail = (auctionId: number) =>
  sendGet(`${ApiKey.AUCTION_DETAIL}/${auctionId}`).then((res) => res.data)

export const purchaseAuction = (auctionId: number) =>
  sendGet(`${ApiKey.AUCTION_PURCHASE}/${auctionId}`).then((res) => res.data)

export const approvePurchase = (auctionId: number) =>
  sendGet(`${ApiKey.PURCHASE_APPROVE}/${auctionId}`).then((res) => res.data)

export const getAuctionHistory = (auctionId: number) =>
  sendGet(`${ApiKey.AUCTION_HISTORY}/${auctionId}`).then((res) => res.data)

export const mintNFT = (formData: object) =>
  sendPost(ApiKey.NFT_MINT, formData).then((res) => res.data)
