import React, { useState } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'

import FilterItem from '~components/ui/FilterItem'
import { Category } from '~interfaces'
import { TEXT_BTN_EXPAND } from './constants'
import * as style from './FiltersBar.module.scss'

type FiltersBarProps = {
  className?: string
  filters: Category[]
  activeFilter: string
  classNameFiltersContainer?: string
  setActiveFilter: Function
  hasExpandButton?: boolean
  [otherProps: string]: any
}

const FiltersBar = (props: FiltersBarProps) => {
  const {
    className,
    filters,
    activeFilter,
    setActiveFilter,
    hasExpandButton,
    classNameFiltersContainer,
    ...rest
  } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleFiltersExpanded = () => {
    setIsExpanded((prevState) => !prevState)
  }

  return (
    <div
      {...rest}
      className={classNames(
        style.filtersBar,
        {
          [style.isExpanded]: isExpanded,
          [style.hasExpandButton]: hasExpandButton,
        },
        className
      )}
    >
      <div className={style.extraPaddingContainer}>
        <div
          className={classNames(
            style.filtersContainer,
            classNameFiltersContainer
          )}
        >
          {filters.map((category) => (
            <FilterItem
              key={category.title}
              category={category}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          ))}
          {hasExpandButton && (
            <Button
              variant="outline-dark-field"
              className={style.btnExpand}
              onClick={toggleFiltersExpanded}
            >
              {isExpanded
                ? TEXT_BTN_EXPAND.expanded
                : TEXT_BTN_EXPAND.collapsed}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FiltersBar
