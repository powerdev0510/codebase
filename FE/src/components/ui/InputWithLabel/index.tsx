/* eslint-disable react/prop-types */

import React from 'react'
import { FormLabel, FormText, FormControl, InputGroup } from 'react-bootstrap'
import classNames from 'classnames'

type InputWithLabelProps = React.ComponentPropsWithoutRef<'input'> & {
  id: string
  name: string
  label?: string
  hint?: string
  errors?: {
    [key: string]: any
  }
  variant?: string
  prefixAddon?: string
  classNameFormControl?: string
  size?: 'sm' | 'lg'
  value?: string | number | string[] | undefined
  [otherProps: string]: any
}

/**
 * InputWithLabel component
 */
const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  (props, ref) => {
    const {
      id,
      className,
      style,
      label,
      hint,
      errors,
      name,
      variant,
      prefixAddon,
      classNameFormControl,
      ...rest
    } = props

    return (
      <div className={className} style={style}>
        {!!label && (
          <FormLabel
            htmlFor={id}
            className={classNames({
              [`form-label--${variant}`]: variant,
            })}
          >
            {label}
          </FormLabel>
        )}
        <InputGroup
          className={classNames({
            [`input-group--${prefixAddon}`]: prefixAddon,
            [`input-group--${variant}`]: variant,
          })}
        >
          <FormControl
            {...rest}
            id={id}
            ref={ref}
            name={name}
            className={classNames(
              {
                [`form-control--${variant}`]: variant,
              },
              classNameFormControl
            )}
          />
        </InputGroup>
        {!!errors?.[name] && (
          <FormText className="form-text--error">
            {errors[name].message}
          </FormText>
        )}
        {!!hint && <FormText>{hint}</FormText>}
      </div>
    )
  }
)

export default InputWithLabel
