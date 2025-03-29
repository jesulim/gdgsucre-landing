import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import './swiperStyles.css'

import organizersData from '../../data/organizersWTM.json'
import OrganizerCard from './OrganizerCard'

const Organizer = () => {
  return (
    <div className='circuit-background mx-auto max-w-screen-xl'>
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
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        loop={true}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className='mySwiper'
        style={{ height: '100%', paddingBottom: '90px' }}
      >
        {organizersData
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((organizerProps, i) => (
            <SwiperSlide
              key={i}
              style={{
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                width: '300px',
                height: '360px'
              }}
            >
              <OrganizerCard key={i} id={i} {...organizerProps} uuid={i + 1} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default Organizer
