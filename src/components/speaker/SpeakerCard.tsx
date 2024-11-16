import { useState } from 'react'
import { ModalSpeaker, type SocialNetworksType } from './ModalSpeaker'

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

export const SpeakerCard = ({
  id,
  img,
  name,
  location,
  flag,
  descriptions,
  socialNetworks
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }
  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <div key={id}>
      <ModalSpeaker
        isOpen={isModalOpen}
        onClose={closeModal}
        data={{ name, descriptions, socialNetworks }}
      />

      {/* Card */}
      <div className='transition-duration-300 cut-corners-l pointer-events-auto h-full bg-black p-0.5 mix-blend-luminosity transition-all dark:bg-white md:hover:!scale-100 md:hover:!blur-none md:group-hover:scale-[0.90] md:group-hover:blur-[1px]'>
        <div className={`cut-corners-l h-full pb-2 pl-2 ${bgColors[id % 4]}`}>
          <div className='flex h-full flex-col items-center border-b-2 border-l-2 bg-white px-2 pb-2 pt-4 text-center dark:bg-black sm:py-4 md:py-6'>
            <img
              src={img}
              alt={name}
              className='w-11/12 rounded-full border-2 sm:w-48'
              decoding='async'
              loading='lazy'
              width='500'
              height='500'
            />

            <span className='py-2 font-semibold leading-tight sm:text-2xl'>{name}</span>
            <div className='mb-auto flex items-center pb-4'>
              <img
                width='30'
                height='15'
                src={flag}
                alt='country flag'
                className='pr-2 lg:w-8'
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
      </div>
    </div>
  )
}
