import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'

// @ts-ignore
import * as style from './BlockUsers.module.scss'
import Icon from '~components/ui/Icon'
import BadgeVerified from '~components/ui/BadgeVerified'
import { User } from '~interfaces'
import Picture from '~components/ui/Picture'

type BlockUsersProps = {
  users: User[]
  className?: string
  variant?: 'auctionPage'
  infoRole?: string
  [otherProps: string]: any
}

const BlockUsers = (props: BlockUsersProps) => {
  const { className, users = [], variant = '', infoRole, ...rest } = props

  // TODO: add multiple users support
  const isSingleUser = users.length === 1

  return (
    <div
      {...rest}
      className={classNames(
        style.blockUsers,
        { [style[variant]]: variant },
        className
      )}
    >
      <div>
        {users.map((user) => (
          <Link
            key={user.name}
            to={user.profileUrl}
            className={style.imgUserWrapper}
            title={`@${user.name}`}
          >
            <Picture
              src={user.profileImg}
              alt={`@${user.name}`}
              className={style.imgUser}
              maxWidth={48}
            />
            {user.isVerified && <BadgeVerified />}
          </Link>
        ))}
      </div>
      {variant === 'auctionPage' && (
        <div className={style.gridInfo}>
          <p className={style.textRole}>{infoRole}</p>
          <p className={style.textName}>
            {isSingleUser ? users[0].name : `${users.length} ${infoRole}s`}
          </p>
        </div>
      )}
      {variant !== 'auctionPage' && (
        <div className={style.blockUserNames}>
          <div className={style.blockUserNamesInner}>
            {users.map((user) => (
              <div className={style.rowUser} key={user.name}>
                <p>
                  <span className={style.textRole}>{infoRole}:</span>{' '}
                  <Link to={user.profileUrl} className={style.textUsername}>
                    @{user.name}
                  </Link>
                </p>
                {user.isVerified && (
                  <Icon
                    name="icon-verified"
                    size={8}
                    className={style.iconVerifiedSmall}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlockUsers
