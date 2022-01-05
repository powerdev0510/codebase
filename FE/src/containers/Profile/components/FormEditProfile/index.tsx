import React from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

// @ts-ignore
import * as style from './FormEditProfile.module.scss'
import InputWithLabel from '~components/ui/InputWithLabel'

type FormEditProfileProps = {
  className?: string
  defaultValues: any
  onSubmit: () => void
  [otherProps: string]: any
}

const FormEditProfile = (props: FormEditProfileProps) => {
  const { className, defaultValues, onSubmit, ...rest } = props

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({ defaultValues })

  return (
    <form
      {...rest}
      className={classNames(style.gridEditProfile, className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputWithLabel
        id="inp-name"
        label="Name"
        variant="dark"
        classNameFormControl={style.formControlResponsive}
        {...register('name', {
          required: 'Please, specify your full name',
          pattern: {
            value: /^[A-Za-z][A-Za-z.\-\s]{0,30}$/,
            message:
              'The name may only contain latin letters, "-" and "." characters and spaces. The name should only start with a letter',
          },
        })}
        errors={errors}
      />
      <InputWithLabel
        id="inp-username"
        label="Username"
        prefixAddon="username"
        variant="dark"
        classNameFormControl={style.formControlResponsive}
        {...register('username', {
          required: 'Please, specify your username',
          pattern: {
            value: /^[A-Za-z]\w{5,29}$/,
            message:
              'The username should be from 6 to 30 characters long, start with a latin letter and contain only latin letters, numbers and underscores',
          },
        })}
        errors={errors}
      />
      <InputWithLabel
        id="inp-email"
        label="Email for notifications"
        type="email"
        variant="dark"
        className={style.inpEmail}
        classNameFormControl={style.formControlResponsive}
        {...register('email', {
          required: 'Please, specify your email',
          pattern: {
            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Please, enter a valid email address',
          },
        })}
        errors={errors}
      />
      <Button
        variant="outline-primary"
        size="lg"
        className={style.btnSaveChanges}
        type="submit"
      >
        Save Changes
      </Button>
      <DevTool control={control} />
    </form>
  )
}

export default FormEditProfile
