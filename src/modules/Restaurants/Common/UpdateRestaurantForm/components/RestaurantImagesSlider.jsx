import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import "@styles/swiperSlider.css"

const RestaurantImagesSlider = ({ images }) => {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        loop={false}
        pagination={false}
        navigation={false}
        className=""
      >
        {images?.length > 0
          ? images.map((image, index) => (
              <SwiperSlide key={image.route}>
                <div className="h-[180px] w-[180px] rounded-xl overflow-hidden">
                  <img src={image.route} alt="" className="" />
                </div>
              </SwiperSlide>
            ))
          : [1, 2, 3].map((i) => (
              <SwiperSlide key={i}>
                <div className="h-[180px] w-[180px] border bg-slate-200 rounded-xl"></div>
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  )
}

export default RestaurantImagesSlider
