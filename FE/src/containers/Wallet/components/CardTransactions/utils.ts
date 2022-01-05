import dayjs from 'dayjs'
import { objectFieldMatchesSearch } from '~utils'

export const filterTransactions = (
  transaction: any,
  isFilterBarExtended: boolean,
  transactionFilters: any
) => {
  if (!isFilterBarExtended) return true

  /* Type match */
  const typeMatch = transactionFilters?.type
    ? transaction.type === transactionFilters?.type
    : true

  /* Status match */
  const statusMatch = transactionFilters?.status
    ? transaction.status === transactionFilters?.status
    : true

  /* Date match */
  let dateMatches = true

  const dateFilter = transactionFilters.date
  const { startDate, endDate } = dateFilter?.[0] ?? {}

  if (startDate && endDate) {
    dateMatches = dayjs
      .unix(transaction.timestampCreated)
      .isBetween(startDate, endDate, 'day', '[]')
  }

  /* Search match (example, not final) */
  let searchQueryMatches = true

  const searchQuery = transactionFilters.search
  if (searchQuery) {
    searchQueryMatches =
      objectFieldMatchesSearch(transaction.amountMain?.currency, searchQuery) ||
      objectFieldMatchesSearch(
        transaction.amountExtra?.currency,
        searchQuery
      ) ||
      objectFieldMatchesSearch(transaction.user?.name, searchQuery) ||
      objectFieldMatchesSearch(transaction.type, searchQuery) ||
      objectFieldMatchesSearch(transaction.status, searchQuery)
  }

  return typeMatch && statusMatch && dateMatches && searchQueryMatches
}
