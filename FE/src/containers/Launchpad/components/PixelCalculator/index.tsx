/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'

// @ts-ignore
import * as style from './PixelCalculator.module.scss'
import InputWithLabel from '~components/ui/InputWithLabel'
import Icon from '~components/ui/Icon'

type PixelCalculatorProps = {
  className?: string
  [otherProps: string]: any
}

const PixelCalculator = (props: PixelCalculatorProps) => {
  const { className, ...rest } = props

  return (
    <div {...rest} className={classNames(style.pixelCalculator, className)}>
      <h3 className={style.textHeading}>PIXEL Calculator</h3>
      <p>
        Calculate your PIXEL depending on the amount of staked tokens and your
        lock time.
      </p>
      <div className={style.gridInputs}>
        <label htmlFor="inp-pixel" className={style.textLabel}>
          PIXEL
        </label>
        <InputWithLabel
          id="inp-pixel"
          variant="calculator"
          placeholder="0.00"
        />
        <p className={style.textMuted}>and / or</p>
        <label htmlFor="inp-pixel-lp" className={style.textLabel}>
          PIXEL-LP
        </label>
        <InputWithLabel
          id="inp-pixel-lp"
          variant="calculator"
          placeholder="0.00"
        />
      </div>
      <div className={style.gridLock}>
        <Icon name="icon-calculator-plus-sign" size={20} />
        <div className={style.gridInpDays}>
          <span>Lock tokens for</span>
          <InputWithLabel
            id="inp-days"
            defaultValue={365}
            className={style.inpDaysWrapper}
            classNameFormControl={style.inpDays}
          />
          <span>days</span>
        </div>
        <Icon name="icon-calculator-arrow-down" size={20} />
        <div className={style.gridPixelAmount}>
          <h1 className={style.textPixelAmount}>75,000.00</h1>
          <span className={style.textPixel}>PIXEL</span>
        </div>
      </div>
      <p className={style.textLockDate}>Locked until 24.12.2022</p>
      <Button variant="outline-warning" className={style.btnConnect} size="lg">
        Connect wallet
      </Button>
    </div>
  )
}

export default PixelCalculator
