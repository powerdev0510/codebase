import { Status, Gradients } from '~utils/enums'

export const FILTERS = [
  { title: 'Live', value: Status.LIVE, gradient: Gradients.DANGER },
  { title: 'Upcoming', value: Status.UPCOMING, gradient: Gradients.SUCCESS },
  { title: 'Completed', value: Status.COMPLETED, gradient: Gradients.WARNING },
]
