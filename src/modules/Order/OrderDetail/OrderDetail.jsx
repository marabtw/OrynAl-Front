import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { axios } from "@lib/axios"

import { getOrder } from "../api"

import RestaurantBriefInfo from "@components/RestaurantBriefInfo/RestaurantBriefInfo"
import OrderReceipt from "./components/OrderReceipt"
import OrderMenu from "./components/OrderMenu"
import Location from "./components/Location"
import CreateReview from "./components/CreateReview"
import { AuthContext } from "@context/AuthContext"
import { useLoading, useToast } from "@hooks"

const OrderDetail = () => {
  const setLoading = useLoading()
  const showNotification = useToast()
  const { user } = useContext(AuthContext)
  const { orderId } = useParams()
  const [details, setDetails] = useState({})

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()
    setLoading(true)

    getOrder({ orderId, cancelToken: cancelTokenSource.token })
      .then(({ data }) => {
        if (!data) setDetails({})
        else setDetails(data)
      })
      .catch((err) => {
        if (axios.isCancel(err))
          showNotification(`Запрос был отменен`, "warning")
        else {
          showNotification(`Не удалось получить данные: ${err}`, "error")
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      cancelTokenSource.cancel()
    }
  }, [])

  return (
    <div className="font-poppins max-md:pt-[20px]">
      <h1
        className="text-[32px] font-[700] leading-[48px] mb-[10px] 
				max-lg:text-[25px] max-lg:leading-[30px] max-md:text-[20px] max-md:leading-[24px] max-md:text-center"
      >
        Информация о заказе
      </h1>
      <div className="flex gap-[90px] max-xl:flex-col max-xl:gap-[20px]">
        <div className="flex flex-col w-[50%] max-xl:w-full gap-[40px] max-xl:gap-[20px]">
          <div className="w-[80%] h-[3px] mb-[30px] bg-black rounded-full max-lg:mb-0 max-md:mx-auto"></div>
          <div className="p-[20px] bg-white rounded-md">
            <RestaurantBriefInfo data={details.restaurant} />
          </div>
          <Location text="Алматы, ​проспект Абылай хана, 55" />
          <div className="max-xl:hidden">
            <OrderReceipt table={details.table} date={details.date} />
          </div>
        </div>
        <div className="max-xl:flex max-xl:justify-between gap-[15px] max-lg:flex-col ">
          <div className="xl:hidden">
            <OrderReceipt table={details.table} date={details.date} />
          </div>
          <OrderMenu foods={details.foods} totalPrice={details.totalSum} />
        </div>
      </div>
      {user.role === "user" && details.status === "completed" && (
        <CreateReview restaurantId={details.restaurantId} />
      )}
    </div>
  )
}

export default OrderDetail
