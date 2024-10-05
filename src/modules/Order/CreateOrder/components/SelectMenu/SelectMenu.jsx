import React, { useState, useEffect } from "react"

import { axios } from "@lib/axios"

import {
  getRestaurantMenuRequest,
  getByOwnerMenuCategoriesRequest,
} from "../../../api"

import FoodCategoriesSlider from "./components/FoodCategoriesSlider"
import FoodCard from "./components/FoodCard"
import { useToast } from "@hooks"

const SelectMenu = ({ restaurantId, getFoodForCart, selectedFoodsId }) => {
  const showNotification = useToast()
  const [menu, setMenu] = useState([])
  const [categories, setCategories] = useState([])

  const [params, setParams] = useState({
    pageIndex: 0,
    limit: 8,
    q: "",
  })

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()
    getByOwnerMenuCategoriesRequest({
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

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()
    getRestaurantMenuRequest({
      restaurantId,
      params,
      cancelToken: cancelTokenSource.token,
    })
      .then(({ data }) => {
        setMenu(data.items)
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
  }, [params])

  return (
    <div className="flex flex-col gap-[100px] max-md:gap-[60px]">
      <FoodCategoriesSlider
        categories={categories}
        getCategory={(type) => {
          setParams((prev) => ({ ...prev, q: type }))
        }}
      />
      <div className="grid grid-cols-3 gap-y-[100px] gap-x-[20px] max-xl:grid-cols-3 max-md:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-y-[20px]">
        {menu?.map((food) => (
          <FoodCard
            key={food.id}
            foodData={food}
            getFoodForCart={getFoodForCart}
            selectedFoodsId={selectedFoodsId}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(SelectMenu)
