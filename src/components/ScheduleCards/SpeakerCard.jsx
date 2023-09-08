import { useState } from 'react'

import Twitter from '../icons/social/Twitter.svg?url'
import Instagram from '../icons/social/Instagram.svg?url'
import Linkedin from '../icons/social/Linkedin.svg?url'
import Github from '../icons/social/Github.svg?url'
import Web from '../icons/social/Web.svg?url'

const techTypeStyles = {
  Cloud: 'bg-red',
  Web: 'bg-blue',
  IA: 'bg-yellow px-4',
  Mobile: 'bg-green'
}

const socialIcons = {
  GITHUB: Github,
  LINKEDIN: Linkedin,
  TWITTER: Twitter,
  INSTAGRAM: Instagram,
  BLOG: Web
}

export const SpeakerCard = ({
  schedule,
  title,
  photoUrl,
  name,
  aboutMe,
  description,
  SocialNetwork,
  type,
  technologyType
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className='cursor-pointer py-2 px-4 sm:p-8' onClick={toggleDetails}>
      <div className='flex items-start space-x-4'>
        <div className='flex flex-col items-center space-y-3'>
          <h3 className='text-xl sm:text-2xl font-semibold'>{schedule}</h3>
          <img
            className='w-12 h-12 rounded-full border border-black'
            src={photoUrl}
            alt={name}
          />
        </div>

        <div className='flex-1 text-lg md:text-xl'>
          <div className='flex'>
            <p className='mr-auto text-xl sm:text-2xl font-bold line-clamp-3 text-yellow'>
              {title}
            </p>
            <svg
              className={
                'mt-2 ml-2 w-3 h-3 shrink-0 ' +
                (!showDetails ? 'rotate-180' : '')
              }
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 10 6'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5 5 1 1 5'
              />
            </svg>
          </div>
          <p className='text-base sm:text-lg font-medium opacity-80'>{name}</p>
          <p
            className={
              'text-base sm:text-lg ' + (!showDetails ? 'line-clamp-3' : '')
            }
            onClick={e => e.stopPropagation()}
          >
            {description}
          </p>
          {showDetails && (
            <div onClick={e => e.stopPropagation()}>
              <h5 className='font-bold mt-4'>Sobre mí:</h5>
              <p className='font-normal text-base'>{aboutMe}</p>

              <div className='flex items-center space-x-2 -mx-2 mt-1'>
                {SocialNetwork.map(({ type, link }) => (
                  <a
                    key={link}
                    href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='p-2'
                  >
                    <img
                      className='w-6 h-6'
                      src={socialIcons[type] || Web}
                      alt={type}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex space-x-1 items-center mt-4 text-black text-sm md:text-lg'>
        <span className='bg-white px-2 border-2 border-black ml-auto rounded-lg'>
          {type}
        </span>

        <span
          className={
            'px-2 border-2 border-black rounded-full ' +
            techTypeStyles[technologyType]
          }
        >
          {technologyType}
        </span>
      </div>
    </div>
  )
}
