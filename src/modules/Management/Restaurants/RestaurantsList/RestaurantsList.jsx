import { useEffect, useState } from "react"
import { ROUTERS } from "@router/Router.config"
import { axios } from "@lib/axios"

import {
  getByAdminAllRestaurantsRequest,
  deleteByAdminRestaurantRequest,
} from "../../api"

import { useLoading, useToast, useCloudinary } from "@hooks"
import { removeWildcard } from "@helpers"
import { isArraysEqualByIdWithSet } from "@utils"

import ListCategories from "@components/ListCategories"
import ListItem from "@components/ListItem/ListItem"
import Pagination from "@components/Pagination/Pagination"

const categories = [
  "id",
  "Название",
  "Адрес",
  "Город",
  "Владелец",
  "Статус",
  "Действие",
]

const RestaurantsList = () => {
  const setLoading = useLoading()
  const showNotification = useToast()
  const { remove } = useCloudinary()

  const [restaurants, setRestaurants] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const [params, setParams] = useState({
    pageIndex: 1,
    limit: 10,
  })

  useEffect(() => {
    setLoading(true)
    const cancelToken = axios.CancelToken.source()
    getByAdminAllRestaurantsRequest({ params, cancelToken })
      .then(({ data }) => {
        updateRestaurantsList(data)
        showNotification("Данные успешно загружены", "success")
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          showNotification("Запрос был отменен", "warning")
        } else {
          showNotification(err.toString(), "error")
        }
      })
      .finally(setLoading(false))
    return () => {
      cancelToken.cancel()
    }
  }, [params])

  const deleteRestaurant = async (restaurantId, icon, photos) => {
    setLoading(true)
    try {
      await deleteByAdminRestaurantRequest(restaurantId)
      // await remove("we9yxx3ehnvvx4mgpufa")
      showNotification("deleted", "success")
      const { data } = await getByAdminAllRestaurantsRequest(params)
      updateRestaurantsList(data)
    } catch (error) {
			setRestaurants([])
      showNotification(error.toString(), "error")
    } finally {
      setLoading(false)
    }
  }

  const updateRestaurantsList = (data) => {
    if (!data) {
      if (restaurants && restaurants.length > 0) setRestaurants([])
    } else {
      const filteredItems = data.items.map(
        ({ id, name, address, city, owner, status }) => ({
          id,
          name,
          address,
          city,
          ownerName: `${owner.name} ${owner?.surname}`.trim(),
          restaurantStatus: status,
        })
      )
      if (isArraysEqualByIdWithSet(restaurants, filteredItems)) return
      setRestaurants(filteredItems)
    }
    const newTotalPage = Math.ceil(data?.totalItems / params.limit) || 0
    if (totalPage !== newTotalPage) setTotalPage(newTotalPage)
  }

  const getMenuActions = (restaurantId, icon, photos) => {
    return [
      {
        action: "Удалить",
        onClick: () => deleteRestaurant(restaurantId, icon, photos),
      },
      {
        action: "Посмотреть",
        to: `${removeWildcard(
          ROUTERS.Restaurant.root
        )}${ROUTERS.Restaurant.updateRestaurant.replace(
          ":restaurantId",
          restaurantId
        )}`,
      },
    ]
  }

  return (
    <>
      <ul className="flex flex-col gap-[20px]">
        <ListCategories categories={categories} />
        {restaurants?.length > 0 ? (
          restaurants.map((restaurant, index) => (
            <ListItem
              key={restaurant.id}
              elementData={restaurant}
              index={index}
              menuActions={getMenuActions(
                restaurant.id,
                restaurant.icon,
                restaurant.photos
              )}
            />
          ))
        ) : (
          <p className="flex justify-center items-center text-[#b0b0b0]">
            No items
          </p>
        )}
        <Pagination
          totalPage={Math.ceil(totalPage / params.limit)}
          getCurrentPage={(index) => {
            if (params.pageIndex === index) return
            setParams((prev) => {
              return { ...prev, pageIndex: index }
            })
          }}
        />
      </ul>
    </>
  )
}

export default RestaurantsList
