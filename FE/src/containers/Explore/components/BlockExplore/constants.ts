export const MENU_SORT_BY = ['Recently added', 'Cheapest', 'Highest price']

export const SORT_BY_PARAMS: { [key: string]: any } = {
  'Recently added': { sortBy: 'startAt', sortOrder: 'desc' },
  Cheapest: { sortBy: 'price', sortOrder: 'asc' },
  'Highest price': { sortBy: 'price', sortOrder: 'desc' },
}
