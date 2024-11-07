import { useState } from 'react'
import { ModalSpeaker, type SocialNetworksType } from './ModalSpeaker'
import './style.css'

const bgColors = ['bg-yellow', 'bg-green', 'bg-red', 'bg-blue']

export interface Props {
  id: number
  img: string
  name: string
  location: string
  flag: string
  descriptions: Array<string>
  socialNetworks: Array<SocialNetworksType>
}

export const Speaker = ({ id, img, name, location, flag, descriptions, socialNetworks }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      {/* Modal */}
      <ModalSpeaker
        isOpen={isModalOpen}
        onClose={closeModal}
        data={{ name, descriptions, socialNetworks }}
      />

      {/* Cards */}
      <div
        key={id}
        className='transition-duration-300 h-full pb-4 pl-4 mix-blend-luminosity transition-all hover:!scale-100 md:group-hover:scale-[0.90] md:group-hover:blur-[1px] hover:!blur-none'
      >
        <div className='relative flex h-full w-full flex-col items-center space-y-2 rounded-2xl border-2 bg-white px-2 pb-4 text-center dark:bg-black md:rounded-3xl md:pb-8 md:pt-4'>
          <div
            className={`absolute -bottom-2 -left-2 -z-10 h-full w-full rounded-2xl border-2 sm:-bottom-3 sm:-left-3 md:rounded-3xl ${bgColors[id % 4]}`}
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
            <p className='text-xs sm:text-xl'>{location}</p>
          </div>
          <button className='text-blue' onClick={openModal}>
            Ver biografía
          </button>
        </div>
      </div>
    </>
  )
}
