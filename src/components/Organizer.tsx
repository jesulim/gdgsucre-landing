export interface Props {
  id: string
  name: string
  photoUrl: string
  socialNetworks: { type: string; url: string }[]
}

export const Organizer = ({ id, name, photoUrl }: Props) => {
  return (
    <div>
      <div className='relative m-2' key={id}>
        <img src={photoUrl} alt={name} className='sm:h-48 sm:w-48 h-36 w-36 object-cover mx-auto rounded-full border-black border-2 border-r-[6px] ring-cyan-400 hover:ring-2' />
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
    </div>
  )
}
