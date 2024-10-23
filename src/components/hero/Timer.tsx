import { useTimer } from '@hooks/useTimer'
import { motion } from 'framer-motion'

import { useEffect, useState, useRef } from 'react'

const zeroPad = (value: number) => `${value}`.padStart(2, '0')

const usePrevious = (value: number) => {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const AnimatedValue = ({ value }) => {
  const previousValue = usePrevious(value)

  const [position, setPosition] = useState(0)

  useEffect(() => {
    setPosition(-64) // 4rem = 64px
  }, [previousValue])

  if (previousValue !== value) {
    return (
      <motion.div
        animate={{ y: position }}
        onAnimationComplete={() => setPosition(0)}
        transition={{ duration: 0.3 }}
      >
        <div>{zeroPad(value + 1)}</div>
        <div>{zeroPad(value)}</div>
      </motion.div>
    )
  }

  return <>{zeroPad(value)}</>
}

export const Timer = ({ initialTime, targetDate }) => {
  const { days, hours, minutes, seconds } = useTimer(initialTime, targetDate)

  if (initialTime <= 0 || seconds < 0) {
    return (
      <div className='mt-8 font-bold text-4xl text-blue animate-bounce'>
        ¡Empezó el <br /> I/O Extended Sucre 2024!
      </div>
    )
  }

  const timeUnits = [
    { label: 'Días', value: days },
    { label: 'Horas', value: hours },
    { label: 'Minutos', value: minutes },
    { label: 'Segundos', value: seconds }
  ]

  return (
    <div className='flex text-center'>
      {timeUnits.map(({ label, value }) => (
        <div className='w-24 md:w-32 lg:w-36' key={label}>
          <div className='h-16 overflow-y-hidden bg-transparent font-sofia font-black leading-[4rem] text-6xl lg:text-7xl'>
            <AnimatedValue value={value} />
          </div>

          <span className='font-google text-base lg:text-lg'>{label}</span>
        </div>
      ))}
    </div>
  )
}
