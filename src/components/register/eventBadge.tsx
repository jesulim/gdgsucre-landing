import Atropos from 'atropos/react'
import 'atropos/css'
import Logo from './Logo.tsx'

export default function EventBadge({ userName }) {
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
        <div className="flex justify-center items-center bg-[#FFA500] p-4">
          <div className="w-full max-w-[400px] aspect-[3/4] bg-white p-0 overflow-hidden relative flex flex-col shadow-lg border-2 border-black">

            <div className="grid grid-cols-12 h-1/4">

              <div className="col-span-4 bg-white dark:text-black p-2 flex items-center justify-center">
                <div className="w-36 h-36" >
                  <Logo />
                </div>
              </div>

              <div className="col-span-5 bg-[#FFA500] flex items-center justify-center">
                <div className="grid grid-cols-6 gap-1">
                </div>
              </div>

              <div className="col-span-3 grid grid-rows-2">
                <div className="bg-[#4285F4] flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                </div>
                <div className="bg-[#34A853] flex items-center justify-center">
                </div>
              </div>
            </div>

            <div className="h-2/4 flex flex-col items-center justify-center p-4" data-atropos-offset='8'>
              <div className="relative p-4 mb-8 text-black bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(255,186,0,1)]">
                <h2 className="text-2xl font-bold text-center text-black">{userName}</h2>
              </div>
              <div className="bg-white rounded-2xl border-2 border-black px-10 py-2">
                <span className="text-xl font-bold text-black">Participante</span>
              </div>
            </div>

            <div className="flex-grow relative">
              <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[#34A853] flex items-end justify-start p-4">
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-full">
                <div className="h-1/2 bg-[#4285F4]" />
                <div className="h-1/2 bg-[#EA4335] flex items-center justify-center">
                </div>
              </div>
            </div>
          </div>
        </div>
      </Atropos>
  )
}