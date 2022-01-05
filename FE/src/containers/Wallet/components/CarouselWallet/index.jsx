import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useInView } from 'react-intersection-observer'
import * as style from './CarouselWallet.module.scss'
import { MOCK_WALLETS } from '~utils/mocks'
import CardWallet from '../CardWallet'
import { handleScrollXToItem, objectFieldMatchesSearch } from '~utils'
import InputSearch from '~components/ui/InputSearch'

/**
 * CarouselWallet component
 */
const CarouselWallet = (props) => {
  const { activeWallet, setActiveWallet, headingText, className } = props

  const scrollContainerRef = useRef()

  const colGap = 20

  const handleWalletClick = (e, wallet) => {
    setActiveWallet(wallet)
    handleScrollXToItem(e, scrollContainerRef, colGap)
  }

  const [firstWalletRef, firstWalletInView] = useInView({ threshold: 1 })
  const [lastWalletRef, lastWalletInView] = useInView({ threshold: 1 })

  const [tokenSearchText, setTokenSearchText] = useState('')

  const filterWallets = (wallet) => {
    const nameMatch = objectFieldMatchesSearch(wallet.name, tokenSearchText)
    const codeMatch = objectFieldMatchesSearch(
      wallet.currencyCode,
      tokenSearchText
    )

    return tokenSearchText === '' || nameMatch || codeMatch
  }

  return (
    <div className={classNames(style.carouselWallet, className)}>
      <div className={style.rowPageHeading}>
        <h3>{headingText}</h3>
        <div className={style.inpSearchWrapper}>
          <InputSearch
            behavior="none"
            placeholder="Search Tokens"
            className={style.inpSearch}
            value={tokenSearchText}
            onChange={(e) => setTokenSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className={style.blockWallets}>
        <div
          className={classNames(style.blendShadowRight, {
            [style.hidden]: lastWalletInView,
          })}
        />
        <div
          className={classNames(style.blendShadowLeft, {
            [style.hidden]: firstWalletInView,
          })}
        />
        <div className={style.gridWallets} ref={scrollContainerRef}>
          <div className={style.gridWalletsInner}>
            {MOCK_WALLETS.filter(filterWallets).map((wallet, index) => (
              <CardWallet
                key={wallet.id}
                activeWallet={activeWallet}
                onClick={(e) => handleWalletClick(e, wallet)}
                ref={
                  // eslint-disable-next-line no-nested-ternary
                  index === 0
                    ? firstWalletRef
                    : index === MOCK_WALLETS.length - 1
                    ? lastWalletRef
                    : null
                }
                {...wallet}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

CarouselWallet.defaultProps = {
  className: '',
}

CarouselWallet.propTypes = {
  className: PropTypes.string,
  headingText: PropTypes.string.isRequired,
  activeWallet: PropTypes.object.isRequired,
  setActiveWallet: PropTypes.func.isRequired,
}

export default CarouselWallet
