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

export const useTimer = (initialTime: number) => {
  const [remainingMillis, setRemainingMillis] = useState(initialTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingMillis(remainingMillis => remainingMillis - 1000)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return toDatetime(remainingMillis)
}
