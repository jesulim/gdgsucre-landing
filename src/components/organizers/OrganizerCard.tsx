export interface Props {
  id: string
  name: string
  photoUrl: string
  socialNetworks: { type: string; url: string }[]
}

export const OrganizerCard = ({ id, name, photoUrl }: Props) => {
  return (
    <div className="w-full max-w-[150px] sm:max-w-xs">
      <div className='relative aspect-[4/5]' key={id}>
      <div className='absolute top-1 sm:top-2 -right-2 sm:-right-4 w-full h-full bg-gradient-to-t from-green via-blue via-50% to-blue rounded-2xl sm:rounded-3xl shadow-sm transform rotate-2 sm:rotate-4 border-2 border-black sm:border-4'></div>
      <div className='absolute top-0.5 sm:top-1 -right-1 sm:-right-2 w-full h-full bg-gradient-to-t from-green via-green via-75% to-blue rounded-2xl sm:rounded-3xl shadow-sm transform rotate-1 sm:rotate-2 border-2 border-black sm:border-4'></div>

        <div className='absolute inset-0 bg-white rounded-2xl sm:rounded-3xl shadow-md overflow-hidden border-2 border-black sm:border-4'>
          <div className='p-2 sm:p-4 lg:p-6 flex flex-col items-center justify-center h-full'>
            <div className='w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden mb-2 sm:mb-4 border border-gray-300 sm:border-2'>
              <img
                src={photoUrl}
                alt={name}
                className='w-full h-full object-cover'
              />
            </div>
            <h2 className='text-sm sm:text-lg lg:text-xl font-bold text-center mb-1'>{name}</h2>
            <p className="text-sm sm:text-lg lg:text-xl font-light text-center mb-1">Organizer</p>
          </div>
        </div>
      </div>
    </div>
  )
}