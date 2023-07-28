import Atropos from 'atropos/react'
import 'atropos/css'

export interface Props {
  id: number
  img: string
  speaker: string
}

export const Speaker = ({ id, img, speaker }: Props) => {
  return (
    <Atropos className='atropos-banner'>
      <div className='relative' key={id}>
        <img
          src={img}
          alt={speaker}
          className='w-auto'
          data-atropos-offset='-4.5'
        />
        <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2'>
          <div
            data-atropos-offset='-2'
            className='p-0 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow relative inline-block w-max'
          >
            <span
              data-atropos-offset='4.5'
              className='relative inline-block text-dark-gray text-xl md:text-2xl'
            >
              {speaker}
            </span>
          </div>
        </div>
      </div>
    </Atropos>
  )
}
