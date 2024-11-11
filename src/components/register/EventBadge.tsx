import Atropos from 'atropos/react'
import 'atropos/css'
import Logo from './Logo.tsx'
import Diplodocus from './Diplodocus.tsx'
import Parasaurolophus from './Parasaurolophus.tsx'

export default function EventBadge({ userName, email, role, picture }) {
  return (
    <Atropos
      className='atropos-banner'
      rotateTouch='scroll-y'
      activeOffset={50}
      rotateXMax={15}
      rotateYMax={5}
      rotateXInvert={true}
      shadowOffset={80}
    >
      <div className='flex items-center justify-center bg-[#FFA500] p-4'>
        <div className='relative flex aspect-[3/4] w-full max-w-[310px] flex-col overflow-hidden border-2 border-black bg-white p-0 shadow-lg sm:max-w-[380px]'>
          <div className='grid h-1/4 grid-cols-12'>
            <div
              className='col-span-5 flex items-center justify-center bg-white p-2 dark:text-black'
              data-atropos-offset='4'
            >
              <div className='h-36 w-36'>
                <Logo />
              </div>
            </div>

            <div className='col-span-4 items-center justify-center bg-[url("/textures/arroba.png")] bg-repeat'>
              <div className='grid grid-cols-6 gap-1'></div>
            </div>

            <div className='col-span-3 grid grid-rows-2'>
              <div className='flex items-center justify-center bg-[#4285F4]'>
                <svg
                  className='h-12 w-12 text-white'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  data-atropos-offset='4'
                >
                  <path d='M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z' />
                </svg>
              </div>
              <div className='flex items-center justify-center bg-[#34A853]'></div>
            </div>
          </div>

          <div className='flex h-2/4 flex-col content-between justify-center p-4'>
            <div className='flex gap-4'>
              <img
                src={`https://unavatar.io/${email}?fallback=${picture}`}
                alt={userName}
                className='h-14 w-14 rounded-full'
                data-atropos-offset='8'
              />
              <div
                className='relative mb-8 border-2 border-black bg-white p-4 text-black shadow-[8px_8px_0px_0px_rgba(255,186,0,1)]'
                data-atropos-offset='8'
              >
                <h2 className='text-center text-2xl font-bold capitalize text-black'>{userName}</h2>
              </div>
            </div>
            <div className='flex h-12 items-center gap-4' data-atropos-offset='6'>
              {role == 'Organizador' ? (
                <Parasaurolophus className='w-28' />
              ) : (
                <Diplodocus className='w-24' />
              )}
              <div className='rounded-2xl border-2 border-black bg-white px-10 py-2'>
                <span className='text-xl font-bold text-black'>{role || 'Participante'}</span>
              </div>
            </div>
          </div>

          <div className='relative flex-grow'>
            <div className='absolute bottom-0 left-0 flex h-full w-1/3 items-end justify-start bg-[#34A853]'></div>
            <div className='absolute bottom-0 right-0 h-full w-2/3'>
              <div className='h-1/2 bg-[#4285F4]' />
              <div className='flex h-1/2 items-center justify-center bg-[url("/textures/hearts.png")] bg-repeat'>
                <img src='' alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Atropos>
  )
}
