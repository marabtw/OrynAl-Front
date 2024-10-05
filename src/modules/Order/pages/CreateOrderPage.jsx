import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { axios } from "@lib/axios"

import { getRestaurantRequest } from "../api"
import { useHeaderHeight, useLoading, useToast } from "@hooks"

import CreateOrder from "../CreateOrder/CreateOrder"
import RestaurantDetails from "../CreateOrder/components/RestaurantDetails/RestaurantDetails"
import LocationInfo from "@components/LocationInfo/LocationInfo"

const CreateOrderPage = () => {
  const { restaurantId } = useParams()
  const setLoading = useLoading()
  const showNotification = useToast()
  const headerHeight = useHeaderHeight()

  const [restaurant, setRestaurant] = useState({})

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()
    setLoading(true)

    getRestaurantRequest({ restaurantId, cancelToken: cancelTokenSource.token })
      .then(({ data }) => {
        if (!data) setRestaurant({})
        else setRestaurant(data)
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          showNotification(`Запрос был отменен: ${err}`, "warning")
        } else {
          showNotification(
            `Не удалось загрузить данные ресторана: ${err}`,
            "error"
          )
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      cancelTokenSource.cancel()
    }
  }, [restaurantId])

  return (
    <>
      <div className="mx-[64px] bg-white max-lg:mx-[10px]">
        <div
          className="relative"
          style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
        >
          <LocationInfo
            text={restaurant.address}
            top="85%"
            left={"-65px"}
            mobileSpacingStyle={
              "max-xl:fixed max-xl:ml-[60px] max-lg:pl-[20px]"
            }
          />
          <RestaurantDetails restaurantData={restaurant} />
        </div>
        <CreateOrder restaurantId={restaurantId} />
      </div>
    </>
  )
}

export default CreateOrderPage
