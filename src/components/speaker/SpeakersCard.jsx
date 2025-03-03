import React from 'react';
import { GitHubIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from './SocialIcons';
import { Border } from './Border';

export default function SpeakerCard({ image, area, name, location, social, flag }) {
  return (
    <div className="relative flex items-center h-fit w-[350px] lg:w-[440px]">
      <div className="relative z-10 flex-shrink-0 h-[170px] lg:h-[200px]">
        <img
          src={image}
          alt={`Foto del Speaker ${name}`}
          className="h-full w-auto"
        />
        <Border className="absolute inset-0 h-full w-auto" />
      </div>
      
      <div className="
        ml-[-40px]        
        bg-[#CAE6FF] dark:bg-[#20344B]   
        border-[3.5px]
        border-[#20344B] dark:border-[#CAE6FF]
        rounded-r-3xl
        py-4 pl-14 pr-4
        dark:text-white
        flex flex-col justify-between 
        w-full
        h-[168.5px] lg:h-[200px]
      ">
        <h3 className="text-2xl lg:text-3xl font-bold">{name}</h3>
        <p className="text-[#165185] dark:text-[#00B698] lg:text-xl">{area}</p>
        {/* Redes sociales */}
        <div className="flex justify-center align-middle space-x-4">
          {social?.github && (
            <a href={social.github}>
              <GitHubIcon className="w-6 h-6 md:w-7 md:h-7 lg:h-8 lg:w-8"/>
            </a>
          )}
          {social?.twitter && (
            <a href={social.twitter}>
              <TwitterIcon className="w-6 h-6 md:w-7 md:h-7 lg:h-8 lg:w-8"/>
            </a>
          )}
          {social?.instagram && (
            <a href={social.instagram}>
              <InstagramIcon className="w-6 h-6 md:w-7 md:h-7 lg:h-8 lg:w-8"/>
            </a>
          )}
          {social?.linkedin && (
            <a href={social.linkedin}>
              <LinkedInIcon className="w-6 h-6 md:w-7 md:h-7 lg:h-8 lg:w-8"/>
            </a>
          )}
        </div>
        <div className="mt-2 flex items-center justify-end space-x-2">
          <img src={flag} alt="Bandera de" className="w-4 h-4 lg:w-6" />
          <p className="text-xs md:text-base">{location}</p>
        </div>
      </div>
    </div>
  );
}
