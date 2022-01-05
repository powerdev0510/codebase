import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import * as style from './CardWalletActions.module.scss'
import FiltersBar from '~components/ui/FiltersBar'
import { WalletActionTabs } from './utils'
import BlockWalletConvert from '~containers/Wallet/components/WalletActions/BlockWalletConvert'
import BlockWalletSend from '~containers/Wallet/components/WalletActions/BlockWalletSend'
import OverlayContext from '~contexts/OverlayContext'

/**
 * CardWalletActions component
 */
const CardWalletActions = (props) => {
  const { className, ...rest } = props

  const { addToastToStack } = useContext(OverlayContext)

  const [activeTab, setActiveTab] = useState('convert')
  return (
    <div {...rest} className={classNames(style.cardWalletActions, className)}>
      <FiltersBar
        filters={WalletActionTabs}
        activeFilter={activeTab}
        setActiveFilter={setActiveTab}
        classNameFiltersContainer={style.filtersContainer}
      />
      {activeTab === 'convert' && (
        <BlockWalletConvert
          onSubmit={() => addToastToStack({ type: 'transactionSuccess' })}
        />
      )}
      {activeTab === 'send' && (
        <BlockWalletSend
          onSubmit={() => addToastToStack({ type: 'transactionSuccess' })}
        />
      )}
    </div>
  )
}

CardWalletActions.defaultProps = {
  className: '',
}

CardWalletActions.propTypes = {
  className: PropTypes.string,
}

export default CardWalletActions
