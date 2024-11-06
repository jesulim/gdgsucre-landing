import Atropos from 'atropos/react'
import 'atropos/css'

export interface Props {
  id: number
  img: string
  name: string
  location: string
  flag: string
}
const colors = ['yellow', 'green', 'red', 'blue']

export const SpeakerCard = ({ id, img, name, location, flag }: Props) => {
  return (
    <Atropos
      className='atropos-banner'
      rotateTouch='scroll-y'
      activeOffset={50}
      rotateXMax={15}
      rotateYMax={5}
      rotateXInvert={true}
      shadowOffset={80}
    >
      <div className='h-full pb-4 pl-4'>
        <div
          key={id}
          className='relative flex h-full w-full flex-col items-center space-y-4 rounded-2xl border-2 bg-white px-2 pb-4 text-center dark:bg-black md:rounded-3xl md:pb-8 md:pt-4'
        >
          <div
            className={`absolute -bottom-2 -left-2 -z-10 h-full w-full rounded-2xl border-2 sm:-bottom-3 sm:-left-3 md:rounded-3xl bg-${colors[id % 4]}`}
            data-atropos-offset='-1'
          ></div>

          <img
            src={img}
            alt={name}
            className='w-11/12 rounded-full md:w-48'
            data-atropos-offset='1'
            decoding='async'
            loading='lazy'
            width='500'
            height='500'
          />

          <span className='font-semibold leading-tight sm:text-2xl'>{name}</span>
          <div className='flex flex-row items-center justify-center' data-atropos-offset='0'>
            <img
              width='30'
              height='15'
              src={flag}
              alt='country flag'
              className='w-7 pr-2 lg:w-8'
              decoding='async'
              loading='lazy'
            />
            <p className='sm:text-md text-xs text-black dark:text-white sm:text-xl'>{location}</p>
          </div>
        </div>
      </div>
    </Atropos>
  )
}
