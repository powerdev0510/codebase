import { Category } from '~interfaces'

export enum Gradients {
  PRIMARY = 'primary',
  DANGER = 'danger',
  SUCCESS = 'success',
  YELLOW = 'yellow',
  WARNING = 'warning',
}

export const AuctionCategories = [
  { title: 'All', value: 'all', gradient: Gradients.SUCCESS },
  { title: 'Art', value: 'art', gradient: Gradients.DANGER },
  { title: 'Photography', value: 'photography', gradient: Gradients.WARNING },
  { title: 'Games', value: 'games', gradient: Gradients.PRIMARY },
  { title: 'Metaverses', value: 'metaverses', gradient: Gradients.SUCCESS },
  { title: 'Music', value: 'music', gradient: Gradients.DANGER },
  { title: 'Domains', value: 'domains', gradient: Gradients.WARNING },
  { title: 'DeFi', value: 'defi', gradient: Gradients.PRIMARY },
  { title: 'Metaver', value: 'metaver', gradient: Gradients.SUCCESS },
  { title: 'Places', value: 'places', gradient: Gradients.DANGER },
  { title: 'Abstract', value: 'abstract', gradient: Gradients.WARNING },
  { title: 'History', value: 'history', gradient: Gradients.PRIMARY },
  { title: 'Anime', value: 'anime', gradient: Gradients.SUCCESS },
  { title: 'Literature', value: 'literature', gradient: Gradients.DANGER },
  { title: 'Animals', value: 'animals', gradient: Gradients.WARNING },
  { title: 'Furniture', value: 'furniture', gradient: Gradients.PRIMARY },
  // { id: 16, name: 'Sculpture' },
]

export const AuctionStates: Category[] = [
  {
    title: 'On Sale',
    value: 'onSale',
    gradient: Gradients.DANGER,
  },
  {
    title: 'Created',
    value: 'created',
    gradient: Gradients.WARNING,
  },
  {
    title: 'Sold',
    value: 'sold',
    gradient: Gradients.SUCCESS,
  },
  {
    title: 'Bidding',
    value: 'bidding',
    gradient: Gradients.YELLOW,
  },
  {
    title: 'Collectibles',
    value: 'collectibles',
    gradient: Gradients.PRIMARY,
  },
]

export const AuctionStatesCollection: Category[] = [
  {
    title: 'On Sale',
    value: 'onSale',
    gradient: Gradients.DANGER,
  },
  {
    title: 'Completed',
    value: 'sold',
    gradient: Gradients.WARNING,
  },
  {
    title: 'Owned',
    value: 'collectibles',
    gradient: Gradients.PRIMARY,
  },
]

export enum AuctionHistoryItemType {
  MINT = 'Mint',
  LISTED = 'Listed',
  BID_PLACED = 'Bid Placed',
  PURCHASE = 'Purchase',
}

export enum Status {
  LIVE = 'live',
  UPCOMING = 'upcoming',
  COMPLETED = 'complete',
}

export const TransactionStatus = {
  COMPLETED: 'Completed',
  IN_PROCESS: 'In process',
  FAILED: 'Failed',
}

export const TransactionType = {
  CONVERT: 'convert',
  SEND: 'send',
  RECEIVE: 'receive',
}

export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,
  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  // SupportedChainId.MAINNET,
  // SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  // SupportedChainId.GOERLI,
  // SupportedChainId.KOVAN,
  //
  // SupportedChainId.ARBITRUM_ONE,
  // SupportedChainId.ARBITRUM_RINKEBY,
  // SupportedChainId.OPTIMISM,
  // SupportedChainId.OPTIMISTIC_KOVAN,
]

export const ALL_SUPPORTED_CHAIN_OPTIONS = [
  // {
  //   label: 'MAINNET',
  //   value: 1,
  // },
  // {
  //   label: 'ROPSTEN',
  //   value: 3,
  // },
  {
    label: 'RINKEBY',
    value: 4,
  },
  // {
  //   label: 'GOERLI',
  //   value: 5,
  // },
  // {
  //   label: 'KOVAN',
  //   value: 42,
  // },
  // {
  //   label: 'ARBITRUM_ONE',
  //   value: 42161,
  // },
  // {
  //   label: 'ARBITRUM_RINKEBY',
  //   value: 421611,
  // },
  // {
  //   label: 'OPTIMISM',
  //   value: 10,
  // },
  // {
  //   label: 'OPTIMISTIC_KOVAN',
  //   value: 69,
  // },
]
