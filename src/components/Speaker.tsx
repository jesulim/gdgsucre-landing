import Atropos from 'atropos/react'
import 'atropos/css'

export interface Props {
  id: number
  img: string
  name: string
}

export const Speaker = ({ id, img, name }: Props) => {
  return (
    <Atropos className='atropos-banner' rotateTouch='scroll-y'>
      <div className='relative' key={id}>
        <img
          src='/speaker-bg.webp'
          className='w-full h-full'
          data-atropos-offset='0'
        />
        <img
          src={img}
          alt={name}
          className='absolute inset-0 mx-auto h-full object-cover'
          data-atropos-offset='-4.5'
        />
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
          <div
            data-atropos-offset='-2'
            className='px-2 bg-black relative inline-block w-max'
          >
            <span
              data-atropos-offset='5'
              className='font-emoji relative inline-block text-white text-md md:text-xl'
            >
              {name}
            </span>
          </div>
        </div>
      </div>
    </Atropos>
  )
}
