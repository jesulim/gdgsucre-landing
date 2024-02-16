import { useTimer } from '@hooks/useTimer'

type TimerProps = {
  targetDate: Date
}

export const Timer = ({ targetDate }: TimerProps) => {
  const { days, hours, minutes, seconds, continueTime } = useTimer(targetDate)

  if (continueTime) {
    return (
      <div className='mb-2 font-bold text-2xl text-green animate-bounce'>
        ¡Empezó el <br /> Devfest Sucre 2023!
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
    <>
      <span className='mb-2 lg:-mb-2 text-2xl'>Faltan:</span>
      <section className='flex justify-center'>
        {time.map(({ label, value }, index) => {
          const isLast = index === time.length - 1

          return (
            <div className='flex-col w-20 sm:w-24 lg:w-36' key={label}>
              <div
                className={`text-blue font-bold font-quantico text-5xl lg:text-7xl relative ${
                  !isLast &&
                  'after:ml-2 after:font-bold after:text-black after:content-[":"] after:absolute lg:after:ml-5'
                }`}
              >
                {value}
              </div>
              {label && (
                <span className='text-black text-sm lg:text-base'>{label}</span>
              )}
            </div>
          )
        })}
      </section>
      <h2 className='text-2xl lg:text-3xl text-black'>Sábado 16 de marzo</h2>
    </>
  )
}
