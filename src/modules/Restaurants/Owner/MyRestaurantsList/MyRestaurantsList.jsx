import { useEffect, useState } from "react"
import { axios } from "@lib/axios"

import { getAllRestaurantsRequest } from "../../api"

import { useToast, useLoading } from "@hooks"
import { isArraysEqualByIdWithSet } from "@utils/index"

import Pagination from "@components/Pagination/Pagination"
import RestaurantCard from "./components/MyRestaurantCard"
import { Grid1x2Icon, Grid2x2Icon } from "@ui/icons/icons"

const MyRestaurantsList = () => {
  const setLoading = useLoading()
  const showNotification = useToast()

  const [displayType, setDisplayType] = useState("grid")
  const [myRestaurants, setMyRestaurants] = useState([])

  const [totalPage, setTotalPage] = useState(0)
  const [params, setParams] = useState({
    pageIndex: 1,
    limit: 10,
  })

  useEffect(() => {
    setLoading(true)
    const cancelTokenSource = axios.CancelToken.source()

    getAllRestaurantsRequest({ params, cancelToken: cancelTokenSource.token })
      .then(({ data }) => {
        if (data.items.length === 0) {
          if (myRestaurants?.length > 0) setMyRestaurants([])
        } else {
          const filteredItems = data.items.map(({ status, ...rest }) => ({
            ...rest,
            restaurantStatus: status,
          }))
          if (isArraysEqualByIdWithSet(filteredItems, myRestaurants)) return
          setMyRestaurants(filteredItems)
        }
        const newTotalPage = Math.ceil(data?.totalItems / params.limit) || 0
        if (totalPage !== newTotalPage) setTotalPage(newTotalPage)
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          showNotification("Запрос был отменен", "warning")
        } else {
					setMyRestaurants([])
          showNotification(err.toString(), "error")
        }
      })
      .finally(() => setLoading(false))

    return () => {
      cancelTokenSource.cancel()
    }
  }, [params])

  return (
    <>
      <div className="flex flex-col gap-[30px] max-lg:gap-[10px]">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[700] leading-[24px]">
            Текущие рестораны
          </h3>
          <div className="flex text-[31px] gap-[5px]">
            <Grid1x2Icon
              className={`cursor-pointer hover:text-[#6AA7FC] ${
                displayType === "flex" && "text-[#6aa7fc]"
              }`}
              onClick={() => {
                if (displayType !== "flex") {
                  setDisplayType("flex")
                }
              }}
            />
            <Grid2x2Icon
              className={`cursor-pointer hover:text-[#6AA7FC] ${
                displayType === "grid" && "text-[#6aa7fc]"
              }`}
              onClick={() => {
                if (displayType !== "grid") {
                  setDisplayType("grid")
                }
              }}
            />
          </div>
        </div>
        <div
          className={`${
            displayType === "grid"
              ? "grid grid-cols-4 gap-[30px] max-2xl:grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1"
              : "flex flex-col gap-[30px]"
          }`}
        >
          {myRestaurants?.length > 0 &&
            myRestaurants.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                data={restaurant}
                displayType={displayType}
                index={index}
              />
            ))}
        </div>
        {myRestaurants?.length === 0 && (
          <p className="flex justify-center items-center text-[#b0b0b0]">
            No items
          </p>
        )}
        <Pagination
          totalPage={totalPage}
          getCurrentPage={(index) => {
            if (params.pageIndex === index) return
            setParams((prev) => {
              return { ...prev, pageIndex: index }
            })
          }}
        />
      </div>
    </>
  )
}

export default MyRestaurantsList
