import Atropos from 'atropos/react'
import 'atropos/css'

import Facebook from './icons/social/Facebook.svg?url'
import Twitter from './icons/social/Twitter.svg?url'
import Instagram from './icons/social/Instagram.svg?url'
import Linkedin from './icons/social/Linkedin.svg?url'
import Github from './icons/social/Github.svg?url'

const socialNetworksIcons = {
  facebook: { icon: Facebook, alt: 'Facebook' },
  twitter: { icon: Twitter, alt: 'Twitter' },
  instagram: { icon: Instagram, alt: 'Instagram' },
  linkedin: { icon: Linkedin, alt: 'LinkedIn' },
  github: { icon: Github, alt: 'GitHub' }
}

export interface Props {
  id: string
  name: string
  photoUrl: string
  socialNetworks: { type: string; url: string }[]
}

export const Organizer = ({ id, name, photoUrl, socialNetworks }: Props) => {
  return (
    <div>
      <Atropos className='atropos-banner' rotateTouch='scroll-y' shadow={false}>
        <div className='relative m-4' key={id}>
          <img src={photoUrl} alt={name} className='w-full h-full' />
          <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
            <div className='px-2 bg-black relative inline-block w-max'>
              <span
                data-atropos-offset='2'
                className='relative inline-block text-white text-md md:text-xl'
              >
                {name}
              </span>
            </div>
          </div>
        </div>
      </Atropos>

      <div className='flex space-x-4 justify-center'>
        {socialNetworks &&
          socialNetworks.map(({ type, url }) => (
            <a
              key={type}
              href={url}
              className='opacity-80 lg:opacity-70 hover:opacity-95'
              target='_blank'
            >
              <img
                src={socialNetworksIcons[type].icon}
                alt={socialNetworksIcons[type].alt}
                className='w-5 h-5'
              />
            </a>
          ))}
      </div>
    </div>
  )
}
