import useSvgIcons from './useSvgIcons'
import './organizerCard.css'

export interface Props {
  id: string
  name: string
  photoUrl: string
  socialNetworks: { type: string; url: string }[]
  uuid: number
}

const bgShadows = ['card-shadow-yellow', 'card-shadow-green', 'card-shadow-red', 'card-shadow-blue']

const OrganizerCard = ({ photoUrl, name, socialNetworks, uuid }: Props) => {
  const { gitHubSVG, linkedinSVG, instagramSVG, twitterSVG, facebookSVG, devSVG } = useSvgIcons()

  const isSocialNetworksEmpty: boolean = socialNetworks.length === 0

  return (
    <div
      className={`card border-2 border-solid border-black bg-white p-8 text-center shadow-lg dark:border-white dark:bg-black ${bgShadows[uuid % 4]}`}
    >
      <div className='card-details'>
        <img className='text-title mx-auto h-40 w-40 rounded-full' src={photoUrl} alt='profile' />
        <div className='text-body'>
          <div className='flex items-center justify-around'>
            {isSocialNetworksEmpty && (
              <span className='mt-2 inline-flex items-center rounded-full border bg-white px-3 py-1 text-black shadow-md'>
                <span>{devSVG()}</span>
              </span>
            )}
            {socialNetworks.map((socialNetwork, i) => (
              <a href={socialNetwork.url} key={i} target='_blank'>
                <span className='mt-2 inline-flex items-center rounded-full border bg-white px-3 py-1 text-black shadow-md'>
                  <span>
                    {socialNetwork.type === 'linkedin' && linkedinSVG()}
                    {socialNetwork.type === 'twitter' && twitterSVG()}
                    {socialNetwork.type === 'instagram' && instagramSVG()}
                    {socialNetwork.type === 'facebook' && facebookSVG()}
                    {socialNetwork.type === 'github' && gitHubSVG()}
                  </span>
                </span>
              </a>
            ))}
          </div>
          <h2 className='mt-2 text-2xl font-semibold text-black dark:text-white'>{name}</h2>
        </div>
      </div>
    </div>
  )
}

export default OrganizerCard
