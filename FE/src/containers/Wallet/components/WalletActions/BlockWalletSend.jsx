import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button, FormControl } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import * as style from './WalletActions.module.scss'
import DropdownSelect from '~components/ui/DropdownSelect'
import { MOCK_RECIPIENTS, MOCK_WALLETS } from '~utils/mocks'
import {
  convertCurrencies,
  maskNumberValue,
  objectFieldMatchesSearch,
} from '~utils'

import InputWithSuggestions from '~components/ui/InputWithSuggestions'

/**
 * BlockWalletSend component
 */
const BlockWalletSend = (props) => {
  const { className, onSubmit, ...rest } = props

  const defaultWalletFrom = MOCK_WALLETS[1]

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    register,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      amountFrom: '',
      walletFrom: defaultWalletFrom,
      recipientText: '',
      recipient: null,
    },
  })

  const [walletFrom, amountFrom, recipientText] = watch([
    'walletFrom',
    'amountFrom',
    'recipientText',
  ])
  const maxValueFrom = walletFrom.amountCoins

  const transformAmountFrom = (e) => maskNumberValue(e.target.value)

  const handleSuggestionClick = (suggestion) => {
    setValue('recipient', suggestion)
    setValue('recipientText', `@${suggestion.name}`)
  }

  const filterSuggestions = (suggestion) => {
    const recipientTextFiltered = recipientText?.replace('@', '')

    return !recipientTextFiltered
      ? true
      : objectFieldMatchesSearch(suggestion.name, recipientTextFiltered) ||
          objectFieldMatchesSearch(
            suggestion.walletAddress,
            recipientTextFiltered
          )
  }

  return (
    <form
      {...rest}
      className={classNames(style.blockWalletAction, className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={style.gridWallet}>
        <p className={style.textSup}>Amount</p>
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
            setActiveValue={(value) => setValue('walletFrom', value)}
            values={Object.values(MOCK_WALLETS).slice(0, 3)}
            variant="withImage"
            displayKey="currencyCode"
          />
        </div>
        <p className={classNames(style.textSub, style.textSubSend)}>
          {amountFrom || 0} {walletFrom.currencyCode}{' '}
          {walletFrom.currencyCode !== 'TRAIL'
            ? `= ${convertCurrencies(
                amountFrom || 0,
                walletFrom.currencyCode,
                'TRAIL'
              )} TRAIL`
            : ''}
        </p>
      </div>
      <InputWithSuggestions
        id="inp-send-recipient-text"
        name="recipientText"
        label="Recipient"
        className={style.inputRecipientWrapper}
        suggestions={MOCK_RECIPIENTS.filter(filterSuggestions).slice(0, 3)}
        onSuggestionClick={handleSuggestionClick}
        autoComplete="off"
        placeholder="Name or Public Key"
        {...register('recipientText')}
      />
      <Button
        variant="outline-warning"
        size="lg"
        type="submit"
        className={style.btnSubmit}
        disabled={!recipientText || !amountFrom}
      >
        Send
      </Button>
      <DevTool control={control} />
    </form>
  )
}

BlockWalletSend.defaultProps = {
  className: '',
}

BlockWalletSend.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}

export default BlockWalletSend
