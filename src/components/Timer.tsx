import { motion } from 'framer-motion'

import { useTimer } from '@hooks/useTimer'
import { useEffect, useState, useRef } from 'react'

type TimerProps = {
  targetDate: Date
}

const zeroPad = value => {
  return `${value}`.padStart(2, '0')
}

const usePrevious = (value: number) => {
  const ref = useRef(0)
  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const ValueCol = ({ value }) => {
  const previousValue = usePrevious(value)

  const [position, setPosition] = useState(0)

  useEffect(() => {
    setPosition(-60)
  }, [previousValue])

  if (previousValue !== value) {
    return (
      <motion.div
        animate={{ y: position }}
        onAnimationComplete={() => setPosition(0)}
        transition={{ duration: 0.3 }}
        className='overflow-y-hidden'
      >
        <div>{zeroPad(value + 1)}</div>
        <div>{zeroPad(value)}</div>
      </motion.div>
    )
  }

  return <>{zeroPad(value)}</>
}

export const Timer = ({ targetDate }: TimerProps) => {
  const { days, hours, minutes, seconds, continueTime } = useTimer(targetDate)

  if (continueTime) {
    return (
      <div className='mt-8 font-bold text-4xl text-blue animate-bounce'>
        ¡Empezó el <br /> IWD Sucre 2023!
      </div>
    )
  }

  const time = [
    { label: 'Días', value: days },
    { label: 'Horas', value: hours },
    { label: 'Minutos', value: minutes },
    { label: 'Segundos', value: seconds }
  ]

  return (
    <section className='flex justify-center'>
      {time.map(({ label, value }) => (
        <div className='flex-col w-24 sm:w-24 lg:w-36' key={label}>
          <div className='h-16 overflow-y-hidden text-blue bg-clip-text font-black font-sofia text-6xl lg:text-7xl'>
            <ValueCol value={value} />
          </div>

          <span className='font-google text-sm lg:text-base'>{label}</span>
        </div>
      ))}
    </section>
  )
}
