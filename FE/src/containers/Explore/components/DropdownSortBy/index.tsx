import React, { FC } from 'react'
import { Dropdown } from 'react-bootstrap'
import cn from 'classnames'

import DropdownToggle from '~components/ui/DropdownToggle'
import * as style from './DropdownSortBy.module.scss'

type DropdownSortByType = {
  activeFilter: string
  onSelect: (eventKey: string | null) => void
  menuOptions: string[]
  togglerClassName?: string
}

const DropdownSortBy: FC<DropdownSortByType> = ({
  activeFilter,
  onSelect,
  menuOptions,
  togglerClassName,
}) => {
  return (
    <Dropdown onSelect={onSelect} align="end">
      <Dropdown.Toggle
        as={DropdownToggle}
        iconName="icon-filter-settings"
        variant="outline-dark-field"
        iconSize={20}
        className={togglerClassName}
      />
      <Dropdown.Menu
        variant="dark"
        className={style.menu}
        popperConfig={{
          modifiers: [{ name: 'offset', options: { offset: [0, 12] } }],
        }}
      >
        <p className={style.title}>Sort by</p>
        {menuOptions.map((option) => {
          const isActive = activeFilter === option
          return (
            <Dropdown.Item
              eventKey={option}
              key={option}
              className={cn('dropdown-item--warning', style.option)}
              active={isActive}
              disabled={isActive}
            >
              {/* use span to set width for the gradient precision */}
              <span className={style.optionTitle}>{option}</span>
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownSortBy
