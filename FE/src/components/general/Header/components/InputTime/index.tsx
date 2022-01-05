import React from 'react'
import InputMask from 'react-input-mask'
import { Controller } from 'react-hook-form'

import InputWithLabel from '~components/ui/InputWithLabel'

type InputTimeProps = {
  className?: string
  name: string
  label?: string
  control: any
  errors?: any
  required?: boolean
  [otherProps: string]: any
}

const InputTime = (props: InputTimeProps) => {
  const {
    className,
    control,
    name,
    errors,
    label,
    required = false,
    ...rest
  } = props

  return (
    <Controller
      {...rest}
      name={name}
      control={control}
      rules={{
        required: required ? 'Please, specify the start time' : undefined,
      }}
      render={({ field }: { field: any }) => (
        <InputMask
          mask={field.value?.[0] === '2' ? '23:59' : '29:59'}
          formatChars={{
            '2': '[0-2]',
            '3': '[0-3]',
            '5': '[0-5]',
            '9': '[0-9]',
          }}
          {...field}
        >
          {(inputProps: any) => (
            <InputWithLabel {...inputProps} errors={errors} label={label} />
          )}
        </InputMask>
      )}
    />
  )
}

InputTime.defaultProps = {
  className: '',
}

export default InputTime
