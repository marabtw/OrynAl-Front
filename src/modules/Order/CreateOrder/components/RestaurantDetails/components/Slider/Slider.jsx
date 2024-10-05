import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { Navigation } from "swiper/modules"
import { useHeaderHeight } from "@hooks"

const Slider = ({ images = [] }) => {
	const headerHeight = useHeaderHeight()
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={headerHeight > 60 ? 30 : 10}
        loop={false}
        pagination={false}
        navigation={false}
        modules={[Navigation]}
        className="h-[300px] max-lg:h-[200px] max-md:h-[150px]"
      >
        {images.length > 0
          ? images.map((image) => (
              <SwiperSlide className="h-full aspect-square max-w-max">
                <img
                  src={image.route}
                  alt={image.route}
                  className="w-full rounded-xl object-cover"
                />
              </SwiperSlide>
            ))
          : [1, 2, 3].map(() => (
              <SwiperSlide className="h-full max-w-max aspect-square border rounded-xl bg-slate-100"></SwiperSlide>
            ))}
      </Swiper>
    </>
  )
}

export default Slider
