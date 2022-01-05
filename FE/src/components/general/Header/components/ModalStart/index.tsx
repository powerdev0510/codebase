import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useForm, FormProvider } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import ModalWrapper from '~components/ui/ModalWrapper'
import * as style from './ModalStart.module.scss'
import InputDate from '../InputDate'
import InputTime from '~components/general/Header/components/InputTime'

dayjs.extend(customParseFormat)

type ModalMintProps = {
  className?: string
  isVisible: boolean
  onHide: () => void
  [otherProps: string]: any
}

const ModalStart = (props: ModalMintProps) => {
  const { className, isVisible, onHide, ...rest } = props

  const methods = useForm({
    defaultValues: {
      date: new Date(),
      time: dayjs().format('HH:mm'),
    },
  })
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
    reset,
  } = methods

  const onSubmit = (values: any) => {
    const time = dayjs(values.time, 'HH:mm', true)
    const date = dayjs(values.date)

    if (!time.isValid()) {
      setError('time', {
        type: 'manual',
        message: 'Please, enter the valid time',
      })
      return
    }

    const dateWithTime = date.hour(time.hour()).minute(time.minute())

    const isBefore = dateWithTime.isBefore(dayjs().subtract(1, 'm'))

    if (isBefore) {
      setError('time', {
        type: 'manual',
        message: 'The start time should not be in the past',
      })
      return
    }

    onHide()
  }

  useEffect(() => {
    if (isVisible) {
      reset({
        date: new Date(),
        time: dayjs().format('HH:mm'),
      })
    }
  }, [isVisible, isVisible])

  return (
    <ModalWrapper
      title="Start NFT auction"
      {...rest}
      className={className}
      show={isVisible}
      backdrop="static"
      onHide={onHide}
      enforceFocus={false}
    >
      <FormProvider {...methods}>
        <Modal.Body
          as="form"
          id="form-personal-info"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={style.gridInputs}>
            <InputDate name="date" errors={errors} minDate={new Date()} />
            <InputTime
              name="time"
              errors={errors}
              control={control}
              required
              label="Time"
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
          Start
        </Button>
      </Modal.Footer>
      <DevTool control={control} />
    </ModalWrapper>
  )
}

export default ModalStart
