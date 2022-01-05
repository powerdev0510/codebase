import Route from '~routes'

export const API_ROOT_URL = 'http://localhost:4000/api/v1'

export const TOP_NAV_MENU = [
  {
    name: 'Explore',
    link: Route.HOMEPAGE,
  },
  {
    name: 'Launch',
    link: Route.LAUNCHPAD,
  },
]

export const INITIAL_DATE_RANGE_ARRAY = [
  { startDate: null, endDate: null, key: 'selection' },
]
