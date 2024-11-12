import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'

import organizersData from '../../data/organizers.json'
import OrganizerCard from './OrganizerCard'

const Organizer = () => {
  return (
    <div className='circuit-background mx-auto max-w-screen-lg'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        pagination={true}
        modules={[EffectCoverflow]}
        className='mySwiper'
      >
        {organizersData
          .sort((a, b) => b.type - a.type)
          .map((organizerProps, i) => (
            <SwiperSlide key={i}>
              <OrganizerCard key={i} id={i} {...organizerProps} uuid={i + 1} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default Organizer
