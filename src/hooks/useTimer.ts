import { useEffect, useState } from 'react'

type RemainingDate<T> = {
  days: T
  hours: T
  minutes: T
  seconds: T
}

const mapValues = (
  object: { [key: string]: unknown },
  iterator: (key: unknown) => void
) => {
  return Object.keys(object).reduce((acc, key) => {
    acc[key] = iterator(object[key])
    return acc
  }, {})
}

const alwaysPositive = (value: number) => Math.max(0, value)

const getRemainingTime = (targetDate: Date) => {
  const currentDate = new Date()

  const difference = targetDate.getTime() - currentDate.getTime()
  const days = alwaysPositive(Math.floor(difference / (1000 * 60 * 60 * 24)))
  const hours = alwaysPositive(
    Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  )
  const minutes = alwaysPositive(
    Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  )
  const seconds = alwaysPositive(Math.floor((difference % (1000 * 60)) / 1000))
  return { days, hours, minutes, seconds }
}

const fillZeros = (remainingDate: RemainingDate<number>) => {
  return mapValues(remainingDate, value =>
    `${value}`.padStart(2, '0')
  ) as RemainingDate<string>
}

export const useTimer = (targetDate: Date) => {
  const [remainingDate, setRemainingDate] = useState({
    days: 1,
    hours: 2,
    minutes: 3,
    seconds: 4
  })

  const { seconds, minutes, hours, days } = remainingDate
  const continueTime =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0

  useEffect(() => {
    const timer =
      !continueTime &&
      setInterval(() => {
        setRemainingDate(getRemainingTime(targetDate))
      }, 1000)

    if (continueTime) clearInterval(timer)

    return () => clearInterval(timer)
  }, [continueTime])

  return { ...fillZeros(remainingDate), continueTime }
}
