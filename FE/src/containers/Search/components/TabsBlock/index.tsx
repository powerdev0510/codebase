import React, { useState, FC } from 'react'
import { Nav, TabContainer, TabContent } from 'react-bootstrap'

import CardAuction from '~components/ui/CardAuction'
import CardUser from '~components/ui/CardUser'
import CardCollection from '~components/ui/CardCollection'
import NavItem from '../NavItem'
import TabPane from '../TabPane'
import { Collection, Creator } from '~interfaces'
import * as style from './TabsBlock.module.scss'

type TabsBlockProps = {
  items: any[]
  users: Creator[]
  collections: Collection[]
}

const TabsBlock: FC<TabsBlockProps> = ({ items, users, collections }) => {
  const defaultActiveTabKey = 'items'
  const [activeTabKey, setActiveTabKey] = useState(defaultActiveTabKey)

  const handleTabSelect = (key: string | null) => {
    if (!key) return
    setActiveTabKey(key)
  }

  return (
    <div className={style.wrap}>
      <TabContainer
        defaultActiveKey={defaultActiveTabKey}
        activeKey={activeTabKey}
        onSelect={handleTabSelect}
      >
        <Nav
          // @ts-ignore
          variant="tabs"
          defaultActiveKey="items"
          className={style.nav}
        >
          <NavItem eventKey="items" title={`Items (${items.length})`} />
          <NavItem
            eventKey="users"
            title={`Users (${users.length})`}
            className="nav-link--danger"
          />
          <NavItem
            eventKey="collections"
            title={`Collections (${collections.length})`}
            className="nav-link--warning"
          />
        </Nav>

        <TabContent>
          <TabPane cards={items} eventKey="items">
            <>
              {items.map((item) => (
                <CardAuction key={item.id} {...item} />
              ))}
            </>
          </TabPane>
          <TabPane cards={users} eventKey="users" variant="users">
            <>
              {users.map((user) => (
                <CardUser key={user.id} {...user} />
              ))}
            </>
          </TabPane>
          <TabPane
            cards={collections}
            eventKey="collections"
            variant="collections"
          >
            <>
              {collections.map((collection) => (
                <CardCollection key={collection.id} {...collection} />
              ))}
            </>
          </TabPane>
        </TabContent>
      </TabContainer>
    </div>
  )
}

export default TabsBlock
