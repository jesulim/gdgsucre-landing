import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

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
        modules={[EffectCoverflow, Pagination]}
        className='mySwiper'
        style={{ height: '100%', paddingBottom: '90px', paddingTop: '30px' }}
      >
        {organizersData
          .sort((a, b) => b.type - a.type)
          .map((organizerProps, i) => (
            <SwiperSlide key={i} style={{ backgroundPosition: 'center', backgroundSize: 'cover', width: '300px', height: '360px' }}>
              <OrganizerCard key={i} id={i} {...organizerProps} uuid={i + 1} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default Organizer
