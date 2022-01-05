import { Category } from '~interfaces'
import { Gradients } from '~utils/enums'

export const WalletActionTabs: Category[] = [
  {
    title: 'Convert',
    value: 'convert',
    gradient: Gradients.DANGER,
  },
  {
    title: 'Send',
    value: 'send',
    gradient: Gradients.SUCCESS,
  },
]
