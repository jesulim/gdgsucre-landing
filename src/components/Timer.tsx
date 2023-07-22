import { useTimer } from '@hooks/useTimer'

type TimerProps = {
  targetDate: Date
}

export const Timer = ({ targetDate }: TimerProps) => {
  const { days, hours, minutes, seconds, continueTime } = useTimer(targetDate)
  const time = [
    { label: 'Días', value: days },
    { label: 'Horas', value: hours },
    { label: 'Minutos', value: minutes },
    { label: 'Segundos', value: seconds }
  ]

  return (
    <>
      {continueTime && (
        <div class='mb-2 font-bold'>Empezo Google I/O Sucre 2023</div>
      )}

      <section class='flex justify-center'>
        {time.map(({ label, value }, index) => {
          const isLast = index === time.length - 1

          return (
            <div class='flex-col w-24 lg:w-36'>
              <div
                class={`text-yellow font-bold text-5xl lg:text-7xl relative ${
                  !isLast &&
                  'after:ml-2 after:font-bold after:text-yellow after:content-[":"] after:absolute lg:after:ml-5'
                }`}
              >
                {value}
              </div>
              {label && (
                <span class='text-white text-xs lg:text-base'>{label}</span>
              )}
            </div>
          )
        })}
      </section>
    </>
  )
}
