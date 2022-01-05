import { MouseEvent, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { isNil, round } from 'lodash'
import { MOCK_EXCHANGE_COURSES } from '~utils/mocks'

gsap.registerPlugin(ScrollToPlugin)

export const maskNumberValue = (value: string) =>
  value
    .replace(',', '.') // replace `,` with `.`
    .replace(/^\./gm, '0.') // replace `.` with `0.` at the line start
    .replace(/(.*[.].*)([.])/gm, '$1') // `prevent 2 dots (e.g. `123.45.6`)
    .replace(/[^\d.]/gi, '') // allow digits and dots only

export const convertPixelPrice = (priceStr: string) =>
  parseInt(priceStr, 10) / 10 ** 18

const handleScrollXToItem = (
  e: MouseEvent,
  scrollElRef: RefObject<any>,
  columnGap: number,
  threshold: number = 50
) => {
  if (!scrollElRef?.current) return

  const itemPosition =
    // @ts-ignore
    e.currentTarget.offsetLeft - scrollElRef.current.scrollLeft
  const containerWidth =
    // @ts-ignore
    scrollElRef.current.offsetWidth - e.currentTarget.offsetWidth

  const walletOutOfViewLeft = Math.min(0, itemPosition - threshold)
  const walletOutOfViewRight = Math.max(
    0,
    itemPosition - containerWidth + threshold
  )

  const walletScrollCompensationDelta =
    walletOutOfViewLeft || walletOutOfViewRight

  gsap.to(scrollElRef.current, {
    duration: 0.5,
    scrollTo: {
      x:
        scrollElRef.current.scrollLeft +
        walletScrollCompensationDelta +
        Math.sign(walletScrollCompensationDelta) *
          // @ts-ignore
          (e.currentTarget.offsetWidth / 2 + columnGap - threshold),
    },
  })
}

const objectFieldMatchesSearch = (field: string, str: string) => {
  if (!field || !str) return false
  return field.toLowerCase().includes(str.toLowerCase())
}

const convertCurrencies = (
  amount: string,
  currencyCodeFrom: string,
  currencyCodeTo: string
) => {
  const exchangeCourse =
    MOCK_EXCHANGE_COURSES?.[currencyCodeFrom]?.[currencyCodeTo]

  if (isNil(exchangeCourse) || isNil(amount)) return null
  if (amount === '') return ''

  return round(parseInt(amount, 10) * exchangeCourse, 8)
}

// eslint-disable-next-line import/prefer-default-export
export { handleScrollXToItem, objectFieldMatchesSearch, convertCurrencies }
