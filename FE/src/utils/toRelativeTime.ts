const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
const updateLocale = require('dayjs/plugin/updateLocale')

dayjs.extend(updateLocale)

const thresholds = [
  { l: 's', r: 1 },
  { l: 'ss', r: 59, d: 'second' },
  { l: 'm', r: 1 },
  { l: 'mm', r: 59, d: 'minute' },
  { l: 'h', r: 1 },
  { l: 'hh', r: 23, d: 'hour' },
  { l: 'd', r: 1 },
  { l: 'dd', r: 29, d: 'day' },
  { l: 'M', r: 1 },
  { l: 'MM', r: 11, d: 'month' },
  { l: 'y' },
  { l: 'yy', d: 'year' },
]

dayjs.extend(relativeTime, { thresholds })

dayjs.updateLocale('en', {
  relativeTime: {
    // future: 'in %s',
    future: '%s',
    past: '%s ago',
    s: '%d second',
    ss: '%d seconds',
    m: '%d minute',
    mm: '%d minutes',
    h: '%d hour',
    hh: '%d hours',
    d: '%d day',
    dd: '%d days',
    M: '%d month',
    MM: '%d months',
    y: '%d year',
    yy: '%d years',
  },
})

export const timestampToRelativeTime = (timestamp: number) => {
  const timestampDate = dayjs.unix(timestamp)

  return timestampDate.fromNow()
}

export const dayJsToRelativeTime = (dayJsObj: any) => dayJsObj.fromNow()
