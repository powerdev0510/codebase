import React, { useEffect } from 'react'
import Select from 'react-select'

import './InputSelect.scss'
import { FormLabel, FormText } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

type InputSelectProps = {
  className?: string
  options: { value: any; label: string }[]
  placeholder?: string
  label?: string
  id?: string
  name: string
  required?: boolean
  msgRequired?: string
  errors?: {
    [key: string]: any
  }
  [otherProps: string]: any
}

const InputSelect = (props: InputSelectProps) => {
  const {
    className,
    options,
    placeholder,
    label,
    id,
    errors,
    name,
    required = false,
    msgRequired = 'This value is required',
    ...rest
  } = props

  const { register, unregister, setValue, clearErrors, watch } =
    useFormContext()

  useEffect(() => {
    register(name, { required: required ? msgRequired : false })
    return () => unregister(name)
  }, [register, unregister, name, required, msgRequired])

  const handleChange = (newValue: any) => {
    setValue(name, newValue)
    clearErrors(name)
  }

  const values = watch([name])

  return (
    <div {...rest} className={className}>
      {!!label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      {/* @ts-ignore */}
      <Select
        id={id}
        options={options}
        classNamePrefix="input-select"
        className="input-select-container"
        components={{ IndicatorSeparator: null }}
        placeholder={placeholder}
        onChange={(newValue) => handleChange(newValue)}
        value={values?.[0] ?? ''}
      />
      {!!errors?.[name] && (
        <FormText className="form-text--error">{errors[name].message}</FormText>
      )}
    </div>
  )
}

export default InputSelect
