import './organizerCard.css'
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  WTMIcon
} from '@components/speaker/SocialIcons'

export interface Props {
  id: string
  name: string
  photoUrl: string
  socialNetworks: { type: string; url: string }[]
  uuid: number
}

const bgColors = ['bg-[#CAE6FF]', 'bg-[#D1ECE3]']
const bgColorsDark = ['dark:bg-[#20344B]', 'dark:bg-[#1A3E38]']

const OrganizerCard = ({ photoUrl, name, socialNetworks, uuid }: Props) => {
  const isSocialNetworksEmpty: boolean = socialNetworks.length === 0

  return (
    <div
      className={`cut-corners-r mt-4 h-full rounded-3xl border-[3.5px] border-[#20344B] ${bgColors[uuid % 2]} p-0.5 transition-all dark:border-[#CAE6FF] ${bgColorsDark[uuid % 2]}`}
    >
      <div className='card-details h-full text-center'>
        <img
          className='text-title mx-auto h-48 w-48 rounded-full border-2 object-cover'
          src={photoUrl}
          alt='profile'
          loading='lazy'
        />
        <div className='text-body'>
          <div className='flex items-center justify-center'>
            {isSocialNetworksEmpty && (
              <span className='mt-4 inline-flex items-center px-3 py-1'>
                <span>
                  <WTMIcon className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8' />
                </span>
              </span>
            )}
            {socialNetworks.map((socialNetwork, i) => (
              <a href={socialNetwork.url} key={i} target='_blank'>
                <span className='mt-4 inline-flex items-center px-3 py-1'>
                  <span>
                    {socialNetwork.type === 'linkedin' && (
                      <LinkedInIcon className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8' />
                    )}
                    {socialNetwork.type === 'github' && (
                      <GitHubIcon className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8' />
                    )}
                    {socialNetwork.type === 'instagram' && (
                      <InstagramIcon className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8' />
                    )}
                    {socialNetwork.type === 'facebook' && (
                      <FacebookIcon className='h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8' />
                    )}
                  </span>
                </span>
              </a>
            ))}
          </div>
          <h2 className='mt-2 text-2xl font-semibold text-[#20344B] dark:text-[#CAE6FF]'>{name}</h2>
        </div>
      </div>
    </div>
  )
}

export default OrganizerCard
