import React from 'react'
import classNames from 'classnames'
import { isNil } from 'lodash'

import { Category } from '~interfaces'
import * as style from './FilterItem.module.scss'

type FilterItemProps = {
  className?: string
  category: Category
  activeFilter: string
  setActiveFilter: Function
  onClick?: Function
  [otherProps: string]: any
}

const FilterItem = (props: FilterItemProps) => {
  const {
    className,
    category,
    activeFilter,
    setActiveFilter,
    onClick = () => {},
    ...rest
  } = props

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveFilter(category.value)
    onClick(e)
  }

  const isActive = activeFilter === category.value

  return (
    <button
      {...rest}
      className={classNames(
        style.filterItem,
        {
          [style.active]: isActive,
          [style[category.gradient]]: isActive && category.gradient,
        },
        className
      )}
      type="button"
      onClick={handleFilter}
    >
      {category.title}
      {!isNil(category.quantity) ? ` (${category.quantity})` : ''}
    </button>
  )
}

export default FilterItem
