import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Overlay, Popover } from 'react-bootstrap'

import * as style from './InputWithSuggestions.module.scss'
import InputWithLabel from '~components/ui/InputWithLabel'
import ItemInputSuggestion from './components/ItemInputSuggestion'

/**
 * InputWithSuggestions component
 */
const InputWithSuggestions = React.forwardRef((props, ref) => {
  const {
    suggestions,
    onSuggestionClick,
    onChange,
    classNameFormControl,
    className,
    ...rest
  } = props

  const containerRef = useRef()
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [isSuggestionApplied, setIsSuggestionApplied] = useState(false)

  return (
    <>
      <div ref={containerRef} className={className}>
        <InputWithLabel
          {...rest}
          onChange={(e) => {
            setIsOverlayVisible(true)
            setIsSuggestionApplied(false)
            onChange(e)
          }}
          ref={ref}
          onClick={() => setIsOverlayVisible(true)}
          classNameFormControl={classNames(
            {
              [style.suggestionApplied]: isSuggestionApplied,
            },
            classNameFormControl
          )}
        />
      </div>
      <Overlay
        target={containerRef.current}
        placement="bottom-start"
        show={isOverlayVisible && !isSuggestionApplied && suggestions.length}
        onHide={() => setIsOverlayVisible(false)}
        rootClose
        trigger="click"
        popperConfig={{
          modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
        }}
      >
        {({ placement, arrowProps, show: _show, popper, ...overlayProps }) => (
          <Popover
            id="recipient-suggestions-popover"
            className={classNames(style.popover)}
            {...overlayProps}
          >
            <ul className={style.listSuggestions}>
              {suggestions.map((suggestion) => (
                <li>
                  <ItemInputSuggestion
                    key={suggestion.walletAddress}
                    comment={`~${suggestion.walletFundsTrail} TRAIL`}
                    onClick={() => {
                      onSuggestionClick(suggestion)
                      setIsOverlayVisible(false)
                      setIsSuggestionApplied(true)
                    }}
                    {...suggestion}
                  />
                </li>
              ))}
            </ul>
          </Popover>
        )}
      </Overlay>
    </>
  )
})

InputWithSuggestions.defaultProps = {
  className: null,
  label: null,
  hint: null,
  style: null,
  errors: {},
  variant: null,
  classNameFormControl: '',
}

InputWithSuggestions.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  classNameFormControl: PropTypes.string,
  id: PropTypes.string.isRequired,
  errors: PropTypes.object,
  name: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['username']),
  suggestions: PropTypes.array.isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default InputWithSuggestions
