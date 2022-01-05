/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import * as style from './ItemInputSuggestion.module.scss'

/**
 * ItemInputSuggestion component
 */
const ItemInputSuggestion = (props) => {
  const {
    className,
    name,
    img,
    comment,
    walletAddress,
    walletFundsTrail,
    ...rest
  } = props

  return (
    <button
      {...rest}
      type="button"
      className={classNames(style.itemInputSuggestion, className)}
    >
      <img src={img} alt={name} width={40} height={40} className={style.img} />
      <p className={style.textName}>@{name}</p>
      <p className={style.textComment}>{comment}</p>
    </button>
  )
}

ItemInputSuggestion.defaultProps = {
  className: '',
}

ItemInputSuggestion.propTypes = {
  className: PropTypes.string,
  suggestion: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
  img: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
}

export default ItemInputSuggestion
