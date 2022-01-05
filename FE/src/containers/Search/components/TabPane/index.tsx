import React, { FC } from 'react'
import { TabPane as TabPaneRB } from 'react-bootstrap'
import cn from 'classnames'

import NoDataPlaceholder from '~components/ui/NoDataPlaceholder'
import * as style from './TabPane.module.scss'

type TabPaneProps = {
  cards: any[]
  eventKey: string
  variant?: string
}

const TabPane: FC<TabPaneProps> = ({
  cards,
  eventKey,
  variant = '',
  children,
}) => (
  <TabPaneRB eventKey={eventKey}>
    <NoDataPlaceholder hasData={!!cards.length} message="No items found">
      <div className={cn(style.tabContent, { [style[variant]]: variant })}>
        {children}
      </div>
    </NoDataPlaceholder>
  </TabPaneRB>
)

export default TabPane
