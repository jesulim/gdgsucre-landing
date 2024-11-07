interface ModalPropsType {
  isOpen: boolean
  onClose: () => void;
  data: {
    name: string
    descriptions?: Array<string>
    socialNetworks?: Array<SocialNetworksType>
  }
}

export interface SocialNetworksType {
  href: string
  svg: string
}
export const ModalSpeaker = ({ isOpen, onClose, data }: ModalPropsType) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl rounded-lg shadow dark:bg-gray-700 p-4 bg-white dark:bg-black">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
            {data.name}
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* <!-- Modal body --> */}
        <div className="p-4 md:p-5 space-y-4">
          {data.descriptions && (
            <>
              {data.descriptions.map((description: string, index: number) => (

                <p className='text-black text-sm sm:text-md md:text-xl dark:text-white'>
                  {description}
                </p>

              ))
              }
            </>
          )}

        </div>
        {/* <!-- Modal footer --> */}
        <div className="flex items-center p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600">
          {data.socialNetworks && (
            <>
              {data.socialNetworks.map((icon, index) => (
                <a
                  key={index}
                  href={icon.href}
                  className="mr-2"
                  dangerouslySetInnerHTML={{ __html: icon.svg }}
                ></a>
              ))}
            </>
          )}
        </div>
      </div>
    </div >
  );
};