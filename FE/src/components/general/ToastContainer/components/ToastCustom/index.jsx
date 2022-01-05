import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Toast } from 'react-bootstrap'
import Icon from '~components/ui/Icon'
import TOAST_CONTENTS from '../../constants'

/**
 * ToastCustom component
 */
const ToastCustom = (props) => {
  const { className, type, show, text, ...rest } = props

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => setIsVisible(show), [])

  const toastContents = TOAST_CONTENTS[type]

  return (
    <Toast
      bg="mistedGlass"
      {...rest}
      className={className}
      show={isVisible}
      autohide
      onClose={() => setIsVisible(false)}
    >
      <Toast.Header closeButton={false}>
        <span>{toastContents.heading}</span>
        <button
          type="button"
          aria-label="Close"
          title="Close"
          className="toast-header-btn-close"
          onClick={() => setIsVisible(false)}
        >
          <Icon name="icon-dropdown-filter-x" size={24} />
        </button>
      </Toast.Header>
      <Toast.Body>{text ?? toastContents.text}</Toast.Body>
    </Toast>
  )
}

ToastCustom.defaultProps = {
  className: '',
  text: null,
  show: false,
}

ToastCustom.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  show: PropTypes.bool,
}

export default ToastCustom
