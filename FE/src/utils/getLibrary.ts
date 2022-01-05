import { ethers } from 'ethers'

export default (provider: any) => {
  return new ethers.providers.Web3Provider(provider)
}
