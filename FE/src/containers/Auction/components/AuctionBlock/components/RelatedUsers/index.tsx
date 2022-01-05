import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'

// @ts-ignore
import * as style from './RelatedUsers.module.scss'
import { User } from '~interfaces'

type RelatedUsersProps = {
  className?: string
  users: [User]
  [otherProps: string]: any
}

const RelatedUsers = (props: RelatedUsersProps) => {
  const { className, users, ...rest } = props

  return (
    <div {...rest} className={classNames(style.div, className)}>
      {users.map((user) => (
        <Link key={user.name} to={user.profileUrl} title={user.name}>
          <img alt={user.name} src={user.profileImg} />
        </Link>
      ))}
    </div>
  )
}

RelatedUsers.defaultProps = {
  className: '',
}

export default RelatedUsers
