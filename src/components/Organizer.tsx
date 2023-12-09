import Atropos from 'atropos/react'
import 'atropos/css'

export interface Props {
  id: string
  type: number
  name: string
  photoUrl: string
  link: string
}

const accentColorByType = {
  4: 'red',
  3: 'yellow',
  2: 'green',
  1: 'blue'
}

export const Organizer = ({ id, type, name, photoUrl, link }: Props) => {
  const accentColor = accentColorByType[type]
  return (
    <Atropos className='atropos-banner' rotateTouch='scroll-y'>
      <div className='relative m-4' key={id}>
        <a
          {...(link && { href: link })}
          target='_blank'
        >
          <img
            src={photoUrl}
            alt={name}
            className='w-full h-full'
          />
          <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
            <div
              className='px-2 bg-black relative inline-block w-max'
            >
              <span
                className={`font-emoji relative inline-block text-white text-md md:text-xl hover:text-${accentColor}`}
              >
                {name}
              </span>
            </div>
          </div>
        </a>
      </div>
    </Atropos>
  )
}
