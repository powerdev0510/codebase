import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import { Link } from 'gatsby'

import * as style from './CardPersonal.module.scss'
import Icon from '~components/ui/Icon'
import InputCopy from '~components/ui/InputCopy'
import MenuMoreActions from '~components/ui/MenuMoreActions'
import CardStats from '../CardStats'
import { PROFILE_STATS } from '../../constants'
import BadgeVerified from '~components/ui/BadgeVerified'
import {
  MENU_MORE_ACTION_ITEMS_EDIT_IMAGE,
  MENU_MORE_ACTION_ITEMS_OTHER_PROFILE,
  MENU_MORE_ACTION_ITEMS_OWN_PROFILE,
} from './constants'
import FormEditProfile from '../FormEditProfile'
import ModalVerifyProfile from '../ModalVerifyProfile'

/**
 * CardPersonal component
 */

const CardPersonal = (props) => {
  const {
    className,
    isOwnProfile,
    isVerified,
    name,
    username,
    bannerImg,
    avatarImg,
    followers,
    following,
    walletAddress,
    isFollowed,
    onClickFollowers,
    onClickFollowing,
    email,
    ...rest
  } = props

  const handleMenuSelect = () => {}

  const modifiedStats = [
    { name: 'Followers', value: followers, onClick: onClickFollowers },
    { name: 'Following', value: following, onClick: onClickFollowing },
    ...PROFILE_STATS,
  ]

  const [isEditing, setIsEditing] = useState(false)
  const [isModalVerifyVisible, setIsModalVerifyVisible] = useState(false)

  const handleEditProfileClick = () => setIsEditing(true)
  const handleHideModalVerify = () => setIsModalVerifyVisible(false)
  const handleShowModalVerify = () => setIsModalVerifyVisible(true)

  return (
    <div {...rest} className={classNames(style.cardPersonal, className)}>
      <ModalVerifyProfile
        isVisible={isModalVerifyVisible}
        onHide={handleHideModalVerify}
      />
      <img
        className={style.banner}
        src={bannerImg}
        alt="profile background"
        width="100%"
        height="160px"
      />
      {isOwnProfile && !isEditing && (
        <MenuMoreActions
          menuItems={MENU_MORE_ACTION_ITEMS_OWN_PROFILE}
          onSelect={handleMenuSelect}
          className={style.btnMoreActions}
        />
      )}
      {isOwnProfile && isEditing && (
        <MenuMoreActions
          iconName="icon-edit"
          menuItems={MENU_MORE_ACTION_ITEMS_EDIT_IMAGE}
          onSelect={handleMenuSelect}
          className={style.btnMoreActions}
        />
      )}
      {!isOwnProfile && (
        <MenuMoreActions
          menuItems={MENU_MORE_ACTION_ITEMS_OTHER_PROFILE}
          onSelect={handleMenuSelect}
          className={style.btnMoreActions}
        />
      )}
      <div className={style.cardBody}>
        <div className={style.avatarWrapper}>
          <img src={avatarImg} alt="avatar" className={style.avatar} />
          {isOwnProfile && isEditing && (
            <MenuMoreActions
              iconName="icon-edit"
              menuItems={MENU_MORE_ACTION_ITEMS_EDIT_IMAGE}
              onSelect={handleMenuSelect}
              className={style.btnMoreActionsAvatar}
            />
          )}
        </div>
        {!isEditing ? (
          <>
            <div className={style.gridName}>
              <h3 className={style.textName}>
                <span>{name}</span>
                {isVerified ? (
                  <BadgeVerified size="md" variant="success" />
                ) : (
                  <div className={style.badgeVerifiedWrapper}>
                    <button type="button" onClick={handleShowModalVerify}>
                      <BadgeVerified size="md" variant="muted" />
                    </button>
                    <div className={style.blockExtraMessageContainer}>
                      <div className={style.blockExtraMessage}>
                        to get a check mark you need to go through{' '}
                        <button
                          type="button"
                          className={style.textPink}
                          onClick={handleShowModalVerify}
                        >
                          verification
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </h3>
              <p className={style.textNickname}>@{username}</p>
            </div>
            <InputCopy
              value={walletAddress}
              className={style.inputCopy}
              classNameBtn={style.inputCopyBtn}
            />
            <div className={style.gridStats}>
              <button
                className={style.btnStats}
                type="button"
                onClick={onClickFollowers}
              >
                <p>Followers</p>
                <p>{followers}</p>
              </button>
              <button
                className={style.btnStats}
                type="button"
                onClick={onClickFollowing}
              >
                <p>Following</p>
                <p>{following}</p>
              </button>
            </div>
            <CardStats className={style.cardStats} stats={modifiedStats} />
            <div className={style.gridButtons}>
              {/* eslint-disable-next-line no-nested-ternary */}
              {isOwnProfile ? (
                <>
                  <Button variant="outline-success" size="lg" as={Link} to="/">
                    Create
                  </Button>
                  <Button
                    variant="black"
                    size="lg"
                    className={style.btnWithIcon}
                    onClick={handleEditProfileClick}
                  >
                    <Icon name="icon-edit" size={24} />
                    <span>Edit Profile</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline-danger" size="lg">
                    Buy Tokens
                  </Button>
                  {isFollowed ? (
                    <Button
                      variant="black"
                      size="lg"
                      className={style.btnWithIcon}
                    >
                      <Icon name="icon-unfollow" size={24} />
                      <span>Unfollow</span>
                    </Button>
                  ) : (
                    <Button
                      variant="black"
                      size="lg"
                      className={style.btnWithIcon}
                    >
                      <Icon name="icon-follow" size={24} />
                      <span>Follow</span>
                    </Button>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <FormEditProfile
            defaultValues={{ name, username, email }}
            onSubmit={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  )
}

CardPersonal.defaultProps = {
  className: '',
  isOwnProfile: false,
  isFollowed: false,
  isVerified: false,
  onClickFollowers: () => {},
  onClickFollowing: () => {},
}

CardPersonal.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  className: PropTypes.string,
  isOwnProfile: PropTypes.bool,
  isVerified: PropTypes.bool,
  isFollowed: PropTypes.bool,
  bannerImg: PropTypes.string.isRequired,
  avatarImg: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  walletAddress: PropTypes.string.isRequired,
  onClickFollowers: PropTypes.func,
  onClickFollowing: PropTypes.func,
}

export default CardPersonal
