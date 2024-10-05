import { useState, useEffect } from "react"
import { axios } from "@lib/axios"

import { ROUTERS } from "@router/Router.config"
import { getRestaurantMenuRequest, deleteByOwnerMenuItemRequest } from "../api"

import { useLoading, useToast } from "@hooks"
import { removeWildcard } from "@helpers"

import ListItem from "@components/ListItem/ListItem"
import ListCategories from "@components/ListCategories"
import MenuCategoriesSlider from "./components/MenuCategoriesSlider"
import Pagination from "@components/Pagination/Pagination"

const categories = [
  "ID",
  "Фото",
  "Название",
  "Тип блюда",
  "Описание",
  "Цена",
  "В наличии",
  "Действие",
]

const MyRestaurantMenuList = ({ restaurantId }) => {
  const setLoading = useLoading()
  const showNotification = useToast()

  const [menu, setMenu] = useState([])

  const [totalPage, setTotalPage] = useState(0)
  const [params, setParams] = useState({
    pageIndex: 1,
    limit: 10,
    q: "",
  })

  useEffect(() => {
    setLoading(true)
    const cancelToken = axios.CancelToken.source()

    getRestaurantMenuRequest({ restaurantId, params, cancelToken })
      .then(({ data }) => {
        setMenu(
          data?.items.map(
            ({ id, photo, name, type, description, price, available }) => ({
              id,
              photo,
              name,
              type,
              description,
              price,
              foodStatus: available,
            })
          )
        )
        const newTotalPage = Math.ceil(data?.totalItems / params.limit) || 0
        if (totalPage !== newTotalPage) setTotalPage(newTotalPage)
        showNotification("Данные успешно загружены", "success")
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          showNotification("Запрос был отменен", "warning")
        } else {
          showNotification(err.toString(), "error")
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      cancelToken.cancel()
    }
  }, [params])

  const deleteFoodById = async (foodId) => {
    setLoading(true)
    try {
      await deleteByOwnerMenuItemRequest(restaurantId, foodId)
      const { data } = await getRestaurantMenuRequest(restaurantId)
      setMenu(data)
      showNotification("deleted", "success")
    } catch (err) {
      showNotification(err.toString(), "error")
    } finally {
      setLoading(false)
    }
  }

  const getContextMenuItems = (id) => {
    return [
      {
        action: "Изменить",
        to: `${removeWildcard(
          ROUTERS.RestaurantMenu.root.replace(":restaurantId", restaurantId)
        )}${ROUTERS.RestaurantMenu.updateFood.replace(":menuId", id)}`,
      },
      {
        action: "Удалить",
        onClick: () => deleteFoodById(restaurantId, id),
      },
    ]
  }

  return (
    <ul className="flex flex-col gap-[20px]">
      <ListCategories categories={categories} />
      <MenuCategoriesSlider
        restaurantId={restaurantId}
        getCategory={(type) => {
          setParams((prev) => ({ ...prev, q: type }))
        }}
      />
      {menu?.length > 0 ? (
        menu.map((food, index) => (
          <ListItem
            key={food.id}
            elementData={food}
            index={index}
            menuActions={getContextMenuItems(food.id)}
          />
        ))
      ) : (
        <p className="flex justify-center items-center text-[#b0b0b0]">
          No menu items
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
    </ul>
  )
}

export default MyRestaurantMenuList
