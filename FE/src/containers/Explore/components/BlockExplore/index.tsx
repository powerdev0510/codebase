import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useInfiniteQuery, useQuery } from 'react-query'
import { Spinner } from 'react-bootstrap'
import { useInView } from 'react-intersection-observer'

import * as style from '../../ExplorePage.module.scss'
import FiltersBar from '~components/ui/FiltersBar'
import { Gradients, Status } from '~utils/enums'
import CardAuction from '~components/ui/CardAuction'
import SectionHeading from '~containers/Explore/components/SectionHeading'
import DropdownSortBy from '../DropdownSortBy'
import NoDataPlaceholder from '~components/ui/NoDataPlaceholder'
import { MENU_SORT_BY, SORT_BY_PARAMS } from './constants'
import LoaderPlaceholder from '~components/ui/LoaderPlaceholder'
import { ApiKey, getAuctionsByCategory, getCategoriesList } from '~utils/api'

type BlockExploreProps = {
  className?: string
  [otherProps: string]: any
}

const BlockExplore = (props: BlockExploreProps) => {
  const { className, ...rest } = props

  const [activeSortByFilter, setActiveSortByFilter] = useState(MENU_SORT_BY[0])

  const handleMenuSelect = (option: string | null) =>
    option && setActiveSortByFilter(option)

  const defaultCategories = [
    { title: 'All', value: 'all', gradient: Gradients.SUCCESS },
  ]

  const { data: auctionCategories } = useQuery(
    [ApiKey.CATEGORY_LIST, 'BlockExplore'],
    () =>
      getCategoriesList().then((categoriesData) => {
        if (!categoriesData) {
          return defaultCategories
        }

        const categoriesDataComplete = [
          { label: 'All', value: 'all' },
          ...categoriesData,
        ]

        const gradientsLoop = [
          Gradients.SUCCESS,
          Gradients.DANGER,
          Gradients.WARNING,
          Gradients.PRIMARY,
        ]

        return categoriesDataComplete.map((category, index) => ({
          ...category,
          title: category.label,
          // cycle through gradients
          gradient: gradientsLoop[index % gradientsLoop.length],
        }))
      }),
    {
      initialData: defaultCategories,
      staleTime: 0,
    }
  )

  const defaultFilter = auctionCategories?.[0].value
  const [activeFilter, setActiveFilter] = useState(defaultFilter)

  const {
    isLoading: isLoadingAuctions,
    data: auctionsData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [ApiKey.AUCTION_LIST, activeFilter, activeSortByFilter],
    ({ pageParam = 0 }) =>
      getAuctionsByCategory(
        activeFilter,
        SORT_BY_PARAMS[activeSortByFilter].sortBy,
        SORT_BY_PARAMS[activeSortByFilter].sortOrder,
        15,
        pageParam
      ),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < 15) return undefined
        return allPages.length * 15
      },
    }
  )

  const [spinnerRef, isSpinnerInView] = useInView({ threshold: 1 })

  useEffect(() => {
    if (isSpinnerInView) fetchNextPage()
  }, [isSpinnerInView])

  return (
    <section {...rest} className={classNames(style.sectionExplore, className)}>
      <SectionHeading
        text="Explore"
        extraComponent={
          <DropdownSortBy
            activeFilter={activeSortByFilter}
            onSelect={handleMenuSelect}
            togglerClassName={classNames(style.btnSortBy, style.xs)}
            menuOptions={MENU_SORT_BY}
          />
        }
      />
      <div className={style.gridFiltersBarWrapper}>
        <FiltersBar
          filters={auctionCategories ?? defaultCategories}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          hasExpandButton
        />
        <DropdownSortBy
          activeFilter={activeSortByFilter}
          onSelect={handleMenuSelect}
          togglerClassName={style.btnSortBy}
          menuOptions={MENU_SORT_BY}
        />
      </div>
      <LoaderPlaceholder isLoading={isLoadingAuctions}>
        <NoDataPlaceholder
          hasData={!!auctionsData?.pages?.[0]?.length}
          message="No items found"
        >
          <div className={style.gridExploreMultiline}>
            {auctionsData?.pages.map((group, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={i}>
                {group?.map((auction: any) => (
                  <CardAuction
                    key={auction.itemId}
                    id={auction.itemId}
                    currency="PIXEL"
                    imgSrc={auction.mediaPath}
                    countdownTimestamp={
                      auction.status === Status.LIVE ? auction.end : 0
                    }
                    className={style.cardScroll}
                    variant="liveAuction"
                    {...auction}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className={style.extraControls}>
            {hasNextPage ? (
              <Spinner
                animation="border"
                role="status"
                className={style.spinner}
                ref={spinnerRef}
              />
            ) : (
              <div>That&apos;s all for now!</div>
            )}
          </div>
        </NoDataPlaceholder>
      </LoaderPlaceholder>
    </section>
  )
}

BlockExplore.defaultProps = {
  className: '',
}

export default BlockExplore
