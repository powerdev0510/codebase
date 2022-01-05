import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useForm, FormProvider } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import InputImage from '~components/ui/InputImage'
import InputWithLabel from '~components/ui/InputWithLabel'
import useAuth from '~hooks/useAuth'
import ModalWrapper from '~components/ui/ModalWrapper'
import * as style from './ModalRegister.module.scss'
import OverlayContext from '~contexts/OverlayContext'

type FormValues = {
  name: string
  profileImg: File[]
  coverImg: File[]
}

type ModalRegisterProps = {
  className?: string
  isVisible: boolean
  onHide: () => void
  [otherProps: string]: any
}

const ModalRegister = (props: ModalRegisterProps) => {
  const { className, isVisible, onHide, ...rest } = props
  const { user, register: registerUser, isLoading } = useAuth()

  const { addToastToStack } = useContext(OverlayContext)

  const methods = useForm<FormValues>()
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = methods

  const handleRegisterSuccess = () => {
    addToastToStack({ type: 'registerSuccess' })
    onHide()
  }

  const handleRegisterError = () => {
    addToastToStack({ type: 'registerError' })
    onHide()
  }

  const onSubmit = (data: FormValues) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('profileImg', data.profileImg[0])
    formData.append('coverImg', data.coverImg[0])
    if (user) formData.append('address', user.address)

    registerUser(formData)
      .then(handleRegisterSuccess)
      .catch(handleRegisterError)
  }

  return (
    <ModalWrapper
      title="Register profile"
      {...rest}
      className={className}
      show={isVisible}
      backdrop="static"
      onHide={onHide}
      isLoading={isLoading}
      loadingText="Registering"
    >
      <FormProvider {...methods}>
        <Modal.Body
          as="form"
          id="form-personal-info"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>
            It’s your first time connecting this wallet, please register first.
          </p>
          <br />
          <p>
            Disconnect your wallet manually if you don’t wish to register for
            now.
          </p>
          <div className={style.gridInputs}>
            <InputWithLabel
              id="inp-registering-address"
              name="registeringAddress"
              label="Registering address"
              value={user?.address}
              readOnly
            />
            <InputWithLabel
              id="inp-full-name"
              label="Full name"
              placeholder="Enter your full name"
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
            {/* Username is not present but would be nice to have */}
            {/* <InputWithLabel */}
            {/*  id="inp-username" */}
            {/*  label="Username" */}
            {/*  variant="username" */}
            {/*  {...register('username', { */}
            {/*    required: 'Please, specify your username', */}
            {/*    pattern: { */}
            {/*      value: /^[A-Za-z]\w{5,29}$/, */}
            {/*      message: */}
            {/*        'The username should be from 6 to 30 characters long, start with a latin letter and contain only latin letters, numbers and underscores', */}
            {/*    }, */}
            {/*  })} */}
            {/*  errors={errors} */}
            {/* /> */}
            <InputImage
              label="Profile picture"
              id="inp-img-profile"
              name="profileImg"
              required="Please, upload your profile picture"
              text="Drag & drop an image here, or click to browse"
              hint="1024x1024px. JPG or PNG. 5MB max size."
              dropzoneOptions={{
                accept: 'image/jpeg, image/png',
                maxSize: 5 * 1000 * 1000, // 5MB
                maxFiles: 1,
                multiple: false,
              }}
              msgFileType="Please, submit a jpg or png file"
              errors={errors}
            />
            {/* Cover image is present, but is really unimportant */}
            <InputImage
              label="Cover picture"
              id="inp-img-cover"
              name="coverImg"
              required="Please, upload your cover picture"
              text="Drag & drop an image here, or click to browse"
              hint="2048x1024px. JPG or PNG. 5MB max size."
              dropzoneOptions={{
                accept: 'image/jpeg, image/png',
                maxSize: 5 * 1000 * 1000, // 5MB
                maxFiles: 1,
                multiple: false,
              }}
              msgFileType="Please, submit a jpg or png file"
              errors={errors}
            />
          </div>
        </Modal.Body>
      </FormProvider>
      <Modal.Footer>
        <Button
          form="form-personal-info"
          type="submit"
          variant="outline-success"
          className={style.btnRegister}
          size="lg"
        >
          Register
        </Button>
      </Modal.Footer>
      <DevTool control={control} />
    </ModalWrapper>
  )
}

export default ModalRegister
