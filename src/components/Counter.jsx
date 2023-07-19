import React, { useState, useEffect } from 'react'

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date()
    const timeDifference = new Date(targetDate) - now

    if (timeDifference < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer) // Limpieza al desmontar el componente
  }, [])

  return (
    <div class='text-center text-yellow text-5xl font-bold'>
      <span>{timeLeft.days} días, </span>
      <span>{timeLeft.hours} horas, </span>
      <span>{timeLeft.minutes} minutos y </span>
      <span>{timeLeft.seconds} segundos</span>
    </div>
  )
}

export default Countdown
