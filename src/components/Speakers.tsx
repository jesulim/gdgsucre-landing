import Atropos from 'atropos/react'
import 'atropos/css'

export interface Props {
  id: number
  img: string
  name: string
  location: string
  flag: string
}

export const Speaker = ({ id, img, name, location, flag }: Props) => {
  return (
    <Atropos className='atropos-banner'
      rotateTouch='scroll-y'
      activeOffset={50}
      rotateXMax={15}
      rotateYMax={5}
      rotateXInvert={true}
      shadowOffset={80}
    >
      <div
        key={id}
        className='p-4 h-[15rem] md:h-[22rem] lg:h-80 border-2 border-black bg-white rounded-3xl flex flex-col space-y-4 dark:border-white dark:bg-black'
      >
        <img
          src={img}
          alt={name}
          className='mx-auto w-48'
          data-atropos-offset='4'
          decoding='async'
          loading='lazy'
          width={138}
          height={151}
        />

        <div className='mx-auto text-center' data-atropos-offset='8'>
          <span className='text-black font-semibold text-base sm:text-lg md:text-2xl  dark:text-white'>
            {name}
          </span>
          <div className='flex flex-row items-center justify-center' data-atropos-offset='0'>
            <img src={flag} className='pr-2 w-7 lg:w-8' decoding='async' loading='lazy'/>
            <p
              className='text-black text-sm sm:text-md md:text-xl dark:text-white'
            >
              {location}
            </p>
          </div>
        </div>
      </div>
    </Atropos>
  )
}
