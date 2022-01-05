//  remove file after api connection

import {
  MOCK_AUCTIONS_EXPLORE,
  MOCK_CREATORS,
  MOCK_COLLECTIONS,
} from '~utils/mocks'

const search = (data: any[], searchValue: string) =>
  data.filter(({ name }) => name?.toLowerCase()?.includes(searchValue))

export const simulateSearch = (searchValue: string) => {
  const lowerCaseSearch = searchValue.toLowerCase()
  const users = search(MOCK_CREATORS, lowerCaseSearch)
  const collections = search(MOCK_COLLECTIONS, lowerCaseSearch)
  const items = search(MOCK_AUCTIONS_EXPLORE, lowerCaseSearch)

  return { items, users, collections }
}
