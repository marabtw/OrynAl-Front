import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { axios } from "@lib/axios"

import { getByOwnerTableCategoriesRequest } from "@modules/Tables/api"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import "@styles/swiperSlider.css"
import { useToast } from "@hooks"

const TableCategoriesSlider = ({ restaurantId, getCategory = () => {} }) => {
  const showNotification = useToast()
  const [activeIndex, setActiveIndex] = useState(0)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()
    getByOwnerTableCategoriesRequest({
      restaurantId,
      cancelToken: cancelTokenSource,
    })
      .then(({ data }) => {
        setCategories(data)
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          showNotification("Запрос был отменен", "warning")
        } else {
          showNotification(err.toString(), "error")
        }
      })

    return () => {
      cancelTokenSource.cancel()
    }
  }, [])

  return (
    <>
      {categories?.length > 0 && (
        <Swiper
          slidesPerView={5}
          centeredSlides={false}
          spaceBetween={30}
          pagination={false}
          navigation={false}
          loop={false}
          className="h-[40px]"
        >
          <SwiperSlide
            onClick={() => {
              setActiveIndex(0)
              getCategory("")
            }}
          >
            <div
              className={`flex justify-center items-center w-full h-full px-[20px] text-center text-[16px] font-semibold rounded-xl ${
                0 === activeIndex ? "bg-[#6aa7fc] text-white" : ""
              }`}
            >
              {"Все"}
            </div>
          </SwiperSlide>
          {categories.map((category, index) => (
            <SwiperSlide
              key={category}
              onClick={() => {
                setActiveIndex(index + 1)
                getCategory(category)
              }}
            >
              <div
                className={`flex justify-center items-center w-full h-full px-[20px] text-center text-[16px] font-semibold rounded-xl ${
                  index + 1 === activeIndex ? "bg-[#6aa7fc] text-white" : ""
                }`}
              >
                {category}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}

export default TableCategoriesSlider
