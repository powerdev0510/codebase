import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import duration, { Duration } from 'dayjs/plugin/duration'

dayjs.extend(duration)

const useCountdown = (timestamp: number) => {
  const [countdownDiff, setCountdownDiff] = useState<Duration>()

  const calcCountdownDiff = (endsDay: dayjs.Dayjs, interval?: any) => {
    const nowDay = dayjs()

    const diff = endsDay.diff(nowDay)
    const diffDuration = dayjs.duration(diff)
    setCountdownDiff(diffDuration)

    if (interval && diffDuration.asSeconds() < 1) clearInterval(interval)
  }

  useEffect(() => {
    if (!timestamp) return

    const endsDay = dayjs.unix(timestamp)
    calcCountdownDiff(endsDay)

    const interval = setInterval(() => {
      calcCountdownDiff(endsDay, interval)
    }, 1000)

    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval)
  }, [timestamp])

  return [countdownDiff, setCountdownDiff]
}

export default useCountdown
