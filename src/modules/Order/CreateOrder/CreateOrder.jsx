import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { ROUTERS } from "@router/Router.config"
import { createByUserOrder } from "../api"

import { removeWildcard } from "@helpers"
import { useLoading, useToast } from "@hooks"

import TableReservation from "./components/TableReservation/TableReservation"
import SelectMenu from "./components/SelectMenu/SelectMenu"
import Cart from "./components/Cart/Cart"
import { CartIcon } from "@ui/icons/icons"
import { isObjectEmpty } from "@utils/index"

const CreateOrder = ({ restaurantId }) => {
  const navigate = useNavigate()
  const setLoading = useLoading()
  const showNotification = useToast()

  const [isCartVisible, setIsCartVisible] = useState(false)
  const [dataForCreateOrder, setDataForCreateOrder] = useState({
    tableId: -1,
    foods: [],
    totalSum: 0,
    restaurantId: +restaurantId,
    status: "reserved",
    date: "",
  })

  useEffect(() => {
    const totalSum = dataForCreateOrder.foods.reduce(
      (acc, item) => acc + item?.itemTotalPrice,
      0
    )
    setDataForCreateOrder((prev) => ({
      ...prev,
      totalSum,
    }))
  }, [dataForCreateOrder.foods])

  const setDateAndTimeToCart = (date) => {
    if (!date) return
    setDataForCreateOrder((prev) => {
      return { ...prev, date }
    })
  }

  const getTableId = (id) => {
    setDataForCreateOrder((prev) => {
      return { ...prev, tableId: id }
    })
  }

  const getFoodForCart = (food) => {
    if (!food || isObjectEmpty(food)) {
      showNotification("Такой еды нету в меню", "warning")
      return
    }
    const isFoodInCart = dataForCreateOrder.foods.some(
      (item) => item.id === food.id
    )
    if (!isFoodInCart) {
      setDataForCreateOrder((prev) => {
        return { ...prev, foods: [...prev.foods, food] }
      })
    } else {
      setDataForCreateOrder((prev) => {
        return {
          ...prev,
          foods: [...prev.foods.filter((order) => order.id !== food.id)],
        }
      })
    }
  }

  const createOrder = () => {
    if (!isOrderValid()) {
      showNotification("Вы не выбрали", "warning")
      return
    }

    setLoading(true)

    const formattedDataForCreate = {
      ...dataForCreateOrder,
      foods: dataForCreateOrder.foods.map((food) => food.id),
    }

    createByUserOrder(formattedDataForCreate)
      .then(() => {
        showNotification("Успешно создан", "success")
        navigate(`${removeWildcard(ROUTERS.Home)}`)
      })
      .catch((err) => {
        showNotification(err.toString(), "error")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const isOrderValid = () => {
    return (
      dataForCreateOrder?.restaurantId >= 0 &&
      dataForCreateOrder?.tableId >= 0 &&
      dataForCreateOrder?.foods.length > 0 &&
      dataForCreateOrder.date
    )
  }

  return (
    <div className="py-[100px] max-xl:py-[25px]">
      <TableReservation
        restaurantId={restaurantId}
        getTableId={getTableId}
        setDateAndTimeToCart={setDateAndTimeToCart}
      />
      <div className="relative grid grid-cols-[2fr,auto] max-2xl:grid-cols-1 mx-[100px] mt-[200px] max-2xl:mx-[60px] max-lg:mx-[20px] max-lg:mt-[100px]">
        <SelectMenu
          restaurantId={restaurantId}
          getFoodForCart={getFoodForCart}
          selectedFoodsId={
            dataForCreateOrder?.foods?.length > 0
              ? dataForCreateOrder.foods.map((food) => food?.id)
              : []
          }
        />
        <Cart
          show={isCartVisible}
          foodsInCart={
            dataForCreateOrder?.foods?.length > 0
              ? dataForCreateOrder.foods
              : []
          }
          updateCart={setDataForCreateOrder}
          toggleCreateButton={createOrder}
          closeCart={() => setIsCartVisible(false)}
        />
      </div>
      <div
        className="fixed z-[55] max-md:z-[99] 2xl:hidden
				w-[70px] h-[70px] 
				bottom-[1%] right-[5%] 
				p-[15px] 
				border border-transparent rounded-full 
				cursor-pointer bg-gray-800"
        onClick={() => setIsCartVisible(!isCartVisible)}
      >
        <CartIcon className="w-full h-full text-white" />
      </div>
    </div>
  )
}

export default CreateOrder
