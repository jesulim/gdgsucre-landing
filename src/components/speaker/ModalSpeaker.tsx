import SocialIcons from './SocialIcons.tsx'

interface ModalPropsType {
  isOpen: boolean
  onClose: () => void
  data: {
    name: string
    descriptions?: Array<string>
    socialNetworks?: Array<SocialNetworksType>
  }
}

export interface SocialNetworksType {
  name: string
  url: string
}

export const ModalSpeaker = ({ isOpen, onClose, data }: ModalPropsType) => {
  if (!isOpen) return null

  return (
    <div
      className='pointer-events-auto fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/60'
      onClick={onClose}
    >
      <div
        className='max-w-xs bg-black p-0.5 dark:bg-white sm:max-w-xl md:max-w-full'
        style={{
          clipPath:
            'polygon(calc(100% - 1rem) 0%, 100% 1rem, 100% 100%, 1rem 100%, 0 calc(100% - 1rem), 0 0'
        }}
      >
        <div
          className='bg-blue pb-4 pr-4'
          style={{
            clipPath:
              'polygon(calc(100% - 1rem) 0%, 100% 1rem, 100% 100%, 1rem 100%, 0 calc(100% - 1rem), 0 0'
          }}
        >
          <div
            className='flex max-h-screen w-full max-w-2xl flex-col border-b-2 border-r-2 bg-white dark:bg-black'
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className='flex items-center justify-between border-b-2 border-black bg-blue px-1 py-2 text-white dark:border-white md:p-2'>
              <h3 className='ml-2 text-xl font-bold'>{data.name}</h3>
              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center border-2 bg-gray text-black'
                onClick={onClose}
              >
                <svg
                  className='text-red-500 h-8 w-8'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' /> <line x1='18' y1='6' x2='6' y2='18' />{' '}
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className='flex max-h-[70vh] flex-col space-y-4 overflow-scroll p-4'>
              {data.descriptions && (
                <>
                  {data.descriptions.map((description: string, index: number) => (
                    <p
                      key={index}
                      className='sm:text-md text-sm text-black dark:text-white md:text-xl'
                    >
                      {description}
                    </p>
                  ))}
                </>
              )}
              <SocialIcons socialNetworks={data.socialNetworks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
