import { useEffect, useState } from 'preact/hooks'
import { localeDate } from 'src/utils/dates'

const mapValues = (object, iterator) => {
	return Object.keys(object).reduce((acc, key) => {
		acc[key] = iterator(object[key])
		return acc
	}, {})
}

const alwaysPositive = (value) => Math.max(0, value)

const getRemainingTime = (targetDate) => {
	const currentDate = localeDate()
	const diff = targetDate.getTime() - currentDate.getTime()
	const days = alwaysPositive(Math.floor(diff / (1000 * 60 * 60 * 24)))
	const hours = alwaysPositive(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
	const minutes = alwaysPositive(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
	const seconds = alwaysPositive(Math.floor((diff % (1000 * 60)) / 1000))
	return { days, hours, minutes, seconds }
}

const fillZeros = (remainingDate) => {
	return mapValues(remainingDate, (value) => `${value}`.padStart(2, '0'))
}

export const useRemainingTime = (targetDate) => {
	const [remainingDate, setRemainingDate] = useState(getRemainingTime(targetDate))

	const { seconds, minutes, hours, days } = remainingDate
	const continueCountdown = days === 0 && hours === 0 && minutes === 0 && seconds === 0

	useEffect(() => {
		const timer =
			!continueCountdown &&
			setInterval(() => {
				setRemainingDate(getRemainingTime(targetDate))
			}, 1000)

		if (continueCountdown) clearInterval(timer)

		return () => clearInterval(timer)
	}, [continueCountdown])

	return { ...fillZeros(remainingDate), countdownEnded: continueCountdown }
}