import { useHeaderHeight } from "@hooks"
import { Swiper, SwiperSlide } from "swiper/react"

const FoodCategoriesSlider = ({ categories, getCategory }) => {
  const headerHeight = useHeaderHeight()
  const getImageByCategory = () => {
    return ""
  }
  return (
    <div className="font-poppins">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={headerHeight > 60 ? 30 : 10}
        loop={false}
        pagination={false}
        navigation={false}
        className="h-[180px] max-lg:h-[150px] max-md:h-[120px] max-sm:h-[80px]"
      >
        <SwiperSlide className="p-[5px] h-full aspect-square border border-[#c4c4c4] rounded-[20px] shadow-[0px_4px_12px_-2px_rgba(0,0,0,.2) hover:border-[#8ab8ff]">
          <div
            className="flex flex-col justify-center items-center gap-[10px] w-full h-full cursor-pointer"
            onClick={() => getCategory("")}
          >
            <div
              className={`flex justify-center items-center w-[50%] aspect-square rounded-full overflow-hidden ${
                !getImageByCategory("Все") && "bg-green-400"
              }`}
            >
              <img
                src={getImageByCategory("Все")}
                alt=""
                className="w-full rounded-full"
              />
            </div>
            <h4 className="text-[16px] font-[800] leading-[24px]">{"Все"}</h4>
          </div>
        </SwiperSlide>
        {categories?.map((category) => (
          <SwiperSlide className="p-[5px] h-full aspect-square border border-[#c4c4c4] rounded-[20px] shadow-[0px_4px_12px_-2px_rgba(0,0,0,.2) hover:border-[#8ab8ff]">
            <div
              key={category}
              className="flex flex-col justify-center items-center gap-[10px] w-full h-full cursor-pointer"
              onClick={() => getCategory(category)}
            >
              <div
                className={`flex justify-center items-center w-[50%] aspect-square rounded-full overflow-hidden ${
                  !getImageByCategory(category) && "bg-green-400"
                }`}
              >
                <img
                  src={getImageByCategory(category)}
                  alt=""
                  className="w-full rounded-full"
                />
              </div>
              <h4 className="text-[16px] font-[800] leading-[24px]">
                {category}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default FoodCategoriesSlider
