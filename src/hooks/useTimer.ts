import { useEffect, useState } from 'react'

const toDatetime = (milliseconds: number) => {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

export const useTimer = (initialTime: number, endTime: Date) => {
  const [remainingMillis, setRemainingMillis] = useState(initialTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingMillis(endTime.getTime() - Date.now())
    }, 1000)

    if (remainingMillis <= 0) {
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [])

  return toDatetime(remainingMillis)
}
