import React, { FC, useState, SyntheticEvent } from 'react'
import { navigate } from 'gatsby'
// @ts-ignore
import { useLocation } from '@gatsbyjs/reach-router'
import qs from 'query-string'
import cn from 'classnames'
import { FormControl } from 'react-bootstrap'

import Icon from '~components/ui/Icon'
import Route from '~routes'
import * as style from './InputSearch.module.scss'

type InputSearchProps = {
  placeholder: string
  className?: string
  behavior?: 'queryString' | 'none'
  size?: 'sm'
  value?: string
  onChange?: (e?: any) => {}
}

const InputSearch: FC<InputSearchProps> = ({
  placeholder,
  className = '',
  behavior = 'queryString',
  value,
  onChange,
  size = '',
}) => {
  const { search: searchParams } = useLocation()
  const { s: defaultSearchValue = '' } = qs.parse(searchParams)

  const [searchValue, setSearchValue] = useState(defaultSearchValue as string)

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (behavior === 'queryString') {
      const trimmedSearch = searchValue.trim()

      if (trimmedSearch) {
        const queryURLParams = qs.stringify(
          { s: trimmedSearch },
          { skipEmptyString: true }
        )
        navigate(`${Route.SEARCH}?${queryURLParams}`)
      }
    }
  }

  return (
    <form
      className={cn(className, style.inputSearchWrapper)}
      onSubmit={handleSubmit}
    >
      <FormControl
        className={cn(style.inputSearch, { [style[size]]: size })}
        value={value ?? searchValue}
        placeholder={placeholder}
        onChange={(e) =>
          onChange ? onChange(e) : setSearchValue(e.target.value)
        }
      />
      <Icon
        name="icon-search"
        size={18}
        className={style.iconSearch}
        tabIndex={-1}
      />
    </form>
  )
}

export default InputSearch
