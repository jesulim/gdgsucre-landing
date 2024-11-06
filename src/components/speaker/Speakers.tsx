import Atropos from 'atropos/react';
import 'atropos/css';
import './style.css';
import { useState } from 'react';
import { ModalSpeaker, type SocialNetworksType } from './ModalSpeaker';

export interface Props {
  id: number;
  img: string;
  name: string;
  location: string;
  flag: string;
  descriptions: Array<string>
  socialNetworks: Array<SocialNetworksType>
}


export const Speaker = ({ id, img, name, location, flag, descriptions, socialNetworks }: Props) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Modal */}
      <ModalSpeaker isOpen={isModalOpen} onClose={closeModal} data={{ name, descriptions, socialNetworks }} />

      {/* Cards */}
      <div key={id} className="flex flex-col items-center w-full max-w-xs mx-auto transition-all duration-300">
        <div className="bg-white/10 p-8 rounded-lg transition-transform transform group-hover:scale-[0.85] hover:!scale-100 mix-blend-luminosity w-full group-hover:blur-sm hover:!blur-none">
          <img
            src={img}
            alt={name}
            className="mx-auto w-48"
            data-atropos-offset="4"
            decoding="async"
            loading="lazy"
            width={138}
            height={151}
          />

          <div className="mx-auto text-center" data-atropos-offset="8">
            <span className=" uppercase text-black font-semibold sm:text-xl md:text-xl dark:text-white">
              {name}
            </span>
            <div className="flex flex-row items-center justify-center" data-atropos-offset="0">
              <img
                width="30"
                height="15"
                src={flag}
                alt="country flag"
                className="pr-2 w-7 lg:w-8"
                decoding="async"
                loading="lazy"
              />
              <p className="text-black text-sm sm:text-md md:text-xl dark:text-white">
                {location}
              </p>
            </div>
            <button className="py-2 text-blue" onClick={openModal}>
              Ver biografía
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
