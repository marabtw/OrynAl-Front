import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { axios } from "@lib/axios"

import { useLoading, useToast } from "@hooks"

import { getAllPopularRestaurantsRequest } from "../../api/index"
import { isArraysEqualDeep } from "@utils/index"

import RestaurantItemCard from "./RestaurantItemCard"
import LinearGradientText from "@ui/LinearGradientText/LinearGradienText"

const PopularRestaurants = () => {
  const setLoading = useLoading()
  const showNotification = useToast()

  const [popularRestaurants, setPopularRestaurants] = useState([])

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()

    fetchData(cancelTokenSource.token)

    return () => {
      cancelTokenSource.cancel()
    }
  }, [])

  const fetchData = async (cancelToken) => {
    setLoading(true)
    try {
      const { data } = await getAllPopularRestaurantsRequest({
        cancelToken,
      })

      if (!data.items || data.items.length === 0) {
        setPopularRestaurants([])
        showNotification("Популярные рестораны не найдены", "info")
      } else {
        if (!isArraysEqualDeep(popularRestaurants, data.items)) {
          setPopularRestaurants(data.items)
        }
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        showNotification("Запрос был отменен", "warning")
      } else {
        showNotification(err.toString(), "error")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-[50px] py-[50px] flex flex-col gap-[80px] font-poppins max-md:gap-[20px] max-md:mt-[20px] max-lg:gap-[40px]">
      <div className="flex flex-col text-center gap-[30px] max-md:gap-[10px] max-xl:gap-[20px]">
        <LinearGradientText
          tag={"h2"}
          text={"Популярные заведения"}
          from={"#6AA7FC"}
          to={"#3D6FFB"}
          className="font-[600] text-[50px] leading-[60px] max-lg:text-[35px] max-lg:leading-[40px] max-sm:text-[25px] max-sm:leading-[30px]"
        />
        <p className="text-[20px] leading-[25px] max-lg:text-[18px] max-lg:leading-[22px] max-sm:text-[14px] max-sm:leading-[18px]">
          Посетители сайта часто бронирует здесь
        </p>
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        loop={false}
        pagination={false}
        navigation={false}
        className=""
      >
        {popularRestaurants?.length > 0 ? (
          popularRestaurants.map((restaurant) => (
            <SwiperSlide key={restaurant.id} className="h-full">
              <RestaurantItemCard data={restaurant} />
            </SwiperSlide>
          ))
        ) : (
          <div className="col-span-3 text-center">
            Популярные рестораны не найдены
          </div>
        )}
      </Swiper>
    </div>
  )
}

export default PopularRestaurants
