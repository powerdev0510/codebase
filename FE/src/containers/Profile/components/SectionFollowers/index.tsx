import React from 'react'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'

// @ts-ignore
import * as style from './SectionFollowers.module.scss'
import Icon from '~components/ui/Icon'
import InputSearch from '~components/ui/InputSearch'
import ItemFollower from '../ItemFollower'
import { Creator } from '~interfaces'

type SectionFollowersProps = {
  className?: string
  onClickBack: (e?: any) => void
  heading: string
  users: Creator[]
  [otherProps: string]: any
}

const SectionFollowers = (props: SectionFollowersProps) => {
  const { className, onClickBack, heading, users, ...rest } = props

  const isMobile = useMediaQuery({
    query: '(max-width: 640px)',
  })

  return (
    <section
      {...rest}
      className={classNames(style.sectionFollowers, className)}
    >
      <div className={style.sectionHead}>
        <div className={style.headingWrapper}>
          <button onClick={onClickBack} type="button" className={style.btnBack}>
            <Icon name="icon-chevron-left" size={24} />
          </button>
          <h3>{heading}</h3>
        </div>
        <InputSearch
          placeholder={!isMobile ? `Search ${heading}` : 'Search'}
          className={style.inpSearch}
        />
      </div>
      <div className={style.gridFollowers}>
        {users.map((user) => (
          <ItemFollower className={style.gridItem} {...user} />
        ))}
      </div>
    </section>
  )
}

export default SectionFollowers
