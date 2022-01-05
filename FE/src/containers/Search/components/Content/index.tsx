import React, { FC } from 'react'

import TabsBlock from '../TabsBlock'
import { Collection, Creator } from '~interfaces'
import * as style from './Content.module.scss'

type ContentProps = {
  items: any[]
  users: Creator[]
  collections: Collection[]
  searchValue: string
}

const Content: FC<ContentProps> = ({
  searchValue,
  items,
  users,
  collections,
}) => (
  <section>
    <h2 className={style.heading}>
      We found <span className={style.textResult}>360</span> results for{' '}
      <span className={style.textSearchValue}>{searchValue}</span>
    </h2>

    <TabsBlock {...{ items, users, collections }} />
  </section>
)

export default Content
