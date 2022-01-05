import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button, FormControl } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { gsap } from 'gsap'
import { DevTool } from '@hookform/devtools'

import * as style from './WalletActions.module.scss'
import DropdownSelect from '~components/ui/DropdownSelect'
import { MOCK_WALLETS } from '~utils/mocks'
import Icon from '~components/ui/Icon'
import { convertCurrencies, maskNumberValue } from '~utils'

/**
 * WalletActions component
 */
const BlockWalletConvert = (props) => {
  const { className, onSubmit, ...rest } = props

  const defaultWalletFrom = MOCK_WALLETS[0]
  const defaultWalletTo = MOCK_WALLETS[1]

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      amountFrom: '',
      amountTo: '',
      walletFrom: defaultWalletFrom,
      walletTo: defaultWalletTo,
    },
  })

  const [walletTo, walletFrom, amountTo, amountFrom] = watch([
    'walletTo',
    'walletFrom',
    'amountTo',
    'amountFrom',
  ])

  const maxValueFrom = walletFrom.amountCoins
  const maxValueTo = convertCurrencies(
    maxValueFrom,
    walletFrom.currencyCode,
    walletTo.currencyCode
  )

  const swapIconRef = useRef()

  const onClickSwap = () => {
    setValue('walletTo', walletFrom)
    setValue('walletFrom', walletTo)
    setValue('amountFrom', amountTo)
    setValue('amountTo', amountFrom)

    gsap.fromTo(
      swapIconRef.current,
      { rotation: 0 },
      { rotation: -180, duration: 0.35 }
    )
  }

  /* Mask input "Amount From" and set input "Amount To" */
  const transformAmountFrom = (e) => {
    const valueNumeric = maskNumberValue(e.target.value)

    const valueTo = convertCurrencies(
      valueNumeric,
      walletFrom.currencyCode,
      walletTo.currencyCode
    )

    setValue('amountTo', valueTo)

    return valueNumeric
  }

  /* Mask input "Amount To" and set input "Amount From" */
  const transformAmountTo = (e) => {
    const valueNumeric = maskNumberValue(e.target.value)

    const valueFrom = convertCurrencies(
      valueNumeric,
      walletTo.currencyCode,
      walletFrom.currencyCode
    )

    setValue('amountFrom', valueFrom)

    return valueNumeric
  }

  const handleWalletFromChange = (value) => {
    setValue('walletFrom', value)
    setValue(
      'amountTo',
      convertCurrencies(amountFrom, value.currencyCode, walletTo.currencyCode)
    )
  }

  const handleWalletToChange = (value) => {
    setValue('walletTo', value)
    setValue(
      'amountTo',
      convertCurrencies(amountFrom, walletFrom.currencyCode, value.currencyCode)
    )
  }

  return (
    <form
      {...rest}
      className={classNames(style.blockWalletAction, className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={style.gridWallet}>
        <p className={style.textSup}>From</p>
        <div className={style.gridCurrency}>
          <Controller
            name="amountFrom"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormControl
                {...fieldProps}
                className="form-control--borderless"
                type="text"
                autoComplete="off"
                inputMode="decimal"
                placeholder="0.00"
                max={maxValueFrom}
                onChange={(e) => onChange(transformAmountFrom(e))}
              />
            )}
          />
          <DropdownSelect
            activeValue={walletFrom}
            setActiveValue={handleWalletFromChange}
            values={Object.values(MOCK_WALLETS.slice(0, 5))}
            displayKey="currencyCode"
          />
        </div>
      </div>
      <button
        className={style.btnSeparator}
        type="button"
        onClick={onClickSwap}
      >
        <Icon
          name="icon-transaction-convert"
          size={24}
          className={style.iconSeparator}
          ref={swapIconRef}
        />
      </button>
      <div className={style.gridWallet}>
        <p className={style.textSup}>To</p>
        <div className={style.gridCurrency}>
          <Controller
            name="amountTo"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormControl
                {...fieldProps}
                className="form-control--borderless"
                type="text"
                autoComplete="off"
                inputMode="decimal"
                placeholder="0.00"
                max={maxValueTo}
                onChange={(e) => onChange(transformAmountTo(e))}
              />
            )}
          />
          <DropdownSelect
            activeValue={walletTo}
            setActiveValue={handleWalletToChange}
            values={Object.values(MOCK_WALLETS.slice(0, 3))}
            displayKey="currencyCode"
          />
        </div>
        <p className={style.textSub}>
          1 {walletFrom.currencyCode} ={' '}
          {convertCurrencies(1, walletFrom.currencyCode, walletTo.currencyCode)}{' '}
          {walletTo.currencyCode}
        </p>
      </div>
      <Button
        variant="outline-warning"
        size="lg"
        className={style.btnSubmit}
        disabled={walletFrom.id === walletTo.id || !amountFrom || !amountTo}
        type="submit"
      >
        Convert
      </Button>
      <DevTool control={control} />
    </form>
  )
}

BlockWalletConvert.defaultProps = {
  className: '',
}

BlockWalletConvert.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}

export default BlockWalletConvert
