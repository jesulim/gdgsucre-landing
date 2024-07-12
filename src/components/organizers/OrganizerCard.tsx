export interface Props {
  id: string
  name: string
  photoUrl: string
  socialNetworks: { type: string; url: string }[]
}

export const OrganizerCard = ({ id, name, photoUrl }: Props) => {
  return (
    <div className='w-full max-w-[150px] sm:max-w-xs'>
      <div className='relative aspect-[4/6]' key={id}>
        <div className='absolute top-1 sm:top-2 -right-2 sm:-right-4 w-full h-full bg-gradient-to-t from-green via-blue via-50% to-blue rounded-2xl sm:rounded-3xl shadow-sm transform rotate-2 sm:rotate-4 border-2 border-black dark:border-white sm:border-2'></div>
        <div className='absolute top-0.5 sm:top-1 -right-1 sm:-right-2 w-full h-full bg-gradient-to-t from-green via-green via-75% to-blue rounded-2xl sm:rounded-3xl shadow-sm transform rotate-1 sm:rotate-2 border-2 border-black dark:border-white sm:border-2'></div>

        <div className='absolute inset-0 bg-white dark:bg-dark-background rounded-2xl sm:rounded-3xl shadow-md overflow-hidden border-2 border-black dark:border-white sm:border-2'>
          <div className='p-2 sm:p-4 lg:p-6 flex flex-col items-center justify-center h-full'>
            <div className='p-4 md:p-8'>
              <img
                className='aspect-square object-cover rounded-full border-2 border-black dark:border-white'
                width='300'
                height='300'
                src={photoUrl}
                alt={name}
                loading='lazy'
                decoding='async'
              />
            </div>
            <h2 className='text-sm sm:text-lg lg:text-xl font-bold text-center mb-1 dark:text-dark-text'>
              {name}
            </h2>
            <p className='text-sm sm:text-lg lg:text-xl font-light text-center mb-1 dark:text-dark-text'>
              Organizer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
