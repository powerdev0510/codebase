import React, { useState } from 'react'
import classNames from 'classnames'
import { countBy } from 'lodash'

// @ts-ignore
import * as style from './SectionAuctions.module.scss'
import FiltersBar from '~components/ui/FiltersBar'
import CardAuction from '~components/ui/CardAuction'
import { Category } from '~interfaces'

type SectionAuctionsProps = {
  className?: string
  auctions: any[]
  displayCounts?: boolean
  categories?: Category[]
  filterField?: string
  [otherProps: string]: any
}

const SectionAuctions = (props: SectionAuctionsProps) => {
  const {
    className,
    auctions,
    displayCounts = false,
    categories,
    filterField = '',
    ...rest
  } = props

  const [activeAuctionState, setActiveAuctionState] = useState('onSale')

  const handleNavSelection = (navSelection: string) =>
    setActiveAuctionState(navSelection)

  const getCategoriesWithQty = (
    cats: Category[],
    auctionArr: any[],
    field: string
  ) => {
    const auctionCounts = countBy(auctionArr, (auction) => auction[field])

    return cats.map((cat: Category) => ({
      ...cat,
      quantity: auctionCounts[cat.value] ?? 0,
    }))
  }

  return (
    <section {...rest} className={classNames(style.sectionAuction, className)}>
      {categories && (
        <FiltersBar
          filters={
            displayCounts && filterField
              ? getCategoriesWithQty(categories, auctions, filterField)
              : categories
          }
          activeFilter={activeAuctionState}
          setActiveFilter={handleNavSelection}
        />
      )}
      <div className={style.gridAuction}>
        {auctions
          .filter((auction) => auction[filterField] === activeAuctionState)
          .map((auction) => (
            <CardAuction key={auction.id} {...auction} />
          ))}
      </div>
    </section>
  )
}

export default SectionAuctions
