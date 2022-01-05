import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import * as style from './CardInformative.module.scss'

/**
 * CardInformative component
 */
const CardInformative = (props) => {
  const { className, heading, text, ...rest } = props

  return (
    <div {...rest} className={classNames(style.cardInformative, className)}>
      <p className={style.textHeading}>{heading}</p>
      <p className={style.textContent}>{text}</p>
    </div>
  )
}

CardInformative.defaultProps = {
  className: '',
}

CardInformative.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default CardInformative
