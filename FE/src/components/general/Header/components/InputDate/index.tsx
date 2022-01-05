import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
// @ts-ignore
import { Calendar } from 'react-date-range'
import { Overlay, Popover } from 'react-bootstrap'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useFormContext } from 'react-hook-form'

import * as style from './InputDate.module.scss'
import './Calendar.scss'
import InputWithLabel from '~components/ui/InputWithLabel'

dayjs.extend(customParseFormat)

type InputDateProps = {
  name: string
  className?: string
  minDate?: Date
  [otherProps: string]: any
}

const InputDate = (props: InputDateProps) => {
  const { className, name, minDate, ...rest } = props

  const { register, unregister, setValue, watch } = useFormContext()

  useEffect(() => {
    register(name)
    return () => unregister(name)
  }, [name, register, unregister])

  const inputRef = useRef()

  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const handleHide = (e?: any) => {
    if (!e || inputRef.current !== e.target) setIsOverlayVisible(false)
  }
  const handleShow = () => setIsOverlayVisible(true)

  const handleCalendarChange = (value: any) => {
    setValue(name, value)
    handleHide()
  }

  const dateValue = watch([name])[0]

  return (
    <div {...rest} className={classNames(style.inputDate, className)}>
      <InputWithLabel
        classNameFormControl={style.formControl}
        label="Date"
        // @ts-ignore
        ref={inputRef}
        onFocus={handleShow}
        value={dayjs(dateValue).format('DD/MM/YYYY')}
        readOnly
      />
      <Overlay
        // @ts-ignore
        target={inputRef.current}
        placement="bottom-end"
        show={isOverlayVisible}
        onHide={handleHide}
        rootClose
        rootCloseEvent="mousedown"
        popperConfig={{
          modifiers: [{ name: 'offset', options: { offset: [0, 12] } }],
        }}
      >
        {({ placement, arrowProps, show: _show, popper, ...overlayProps }) => (
          <Popover
            id="date-popover"
            className={style.popover}
            {...overlayProps}
          >
            <Calendar
              date={dateValue}
              onChange={handleCalendarChange}
              dragSelectionEnabled={false}
              color="#ff4767"
              minDate={minDate}
            />
          </Popover>
        )}
      </Overlay>
    </div>
  )
}

InputDate.defaultProps = {
  className: '',
}

export default InputDate
