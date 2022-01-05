import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import * as copy from 'copy-to-clipboard'
import { useResizeDetector } from 'react-resize-detector'

import * as style from './InputCopy.module.scss'
import insertMiddleEllipsis from '~utils/insertMiddleEllipsis'

/**
 * InputCopy component
 */
const InputCopy = (props) => {
  const { className, classNameBtn, value, textAlign, ...rest } = props

  const { width, ref: btnRef } = useResizeDetector({ handleHeight: false })
  const integerWidth = Math.floor(width)

  const [isCopyConfirmationVisible, setIsCopyConfirmationVisible] =
    useState(false)

  const handleCopy = (fullValue) => {
    copy(fullValue, { debug: true })

    if (isCopyConfirmationVisible) return

    setIsCopyConfirmationVisible(true)
    if (btnRef.current) btnRef.current.focus()

    setTimeout(() => {
      setIsCopyConfirmationVisible(false)

      if (btnRef.current) btnRef.current.blur()
    }, 1500)
  }

  const textWMiddleEllipsis = useMemo(
    () => insertMiddleEllipsis(value, integerWidth),
    [value, integerWidth]
  )

  return (
    <div {...rest} className={classNames(style.inputWrapper, className)}>
      <Button
        {...rest}
        type="button"
        variant="black"
        secondary
        className={classNames(
          style.inputCopy,
          {
            [style.copied]: isCopyConfirmationVisible,
            [style[textAlign]]: textAlign,
          },
          classNameBtn
        )}
        onClick={() => handleCopy(value)}
        title="Click to copy to clipboard"
        ref={btnRef}
      >
        {textWMiddleEllipsis}
      </Button>
      <div
        className={classNames(style.confirmation, {
          [style.copied]: isCopyConfirmationVisible,
        })}
      >
        copied
      </div>
    </div>
  )
}

InputCopy.defaultProps = {
  className: '',
  classNameBtn: '',
  textAlign: null,
}

InputCopy.propTypes = {
  className: PropTypes.string,
  classNameBtn: PropTypes.string,
  value: PropTypes.any.isRequired,
  textAlign: PropTypes.oneOf(['start']),
}

export default InputCopy
