export interface Props {
  id: string
  name: string
  photoUrl: string
  socialNetworks: { type: string; url: string }[]
}

export const OrganizerCard = ({ id, name, photoUrl }: Props) => {
  return (
    <div className="w-full max-w-xs">
      <div className='relative aspect-[4/5]' key={id}>
        <div className='absolute top-2 -right-4 w-full h-full bg-gradient-to-t from-green via-blue via-50% to-blue rounded-3xl shadow-sm border-2 border-black'></div>
        <div className='absolute top-1 -right-2 w-full h-full bg-gradient-to-t from-green via-green via-75% to-blue rounded-3xl shadow-sm border-2 border-black'></div>

        <div className='absolute inset-0 bg-white rounded-3xl shadow-md overflow-hidden border-2 border-black'>
          <div className='p-6 flex flex-col items-center justify-center h-full'>
            <div className='w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden mb-4 border-2 border-gray-300'>
              <img
                src={photoUrl}
                alt={name}
                className='w-full h-full object-cover'
              />
            </div>
            <h2 className='text-lg sm:text-xl lg:text-2xl font-bold text-center mb-1'>{name}</h2>
            <p className="text-sm opacity-50">Organizer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
