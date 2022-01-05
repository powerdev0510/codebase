import { User } from '~interfaces'
import { AuctionHistoryItemType } from '~utils/enums'

type HistoryItem = {
  type: AuctionHistoryItemType
  user: User
  timestamp: number
  price?: { amount: string | number; currencyName: string }
}

// eslint-disable-next-line import/prefer-default-export
export { HistoryItem }
