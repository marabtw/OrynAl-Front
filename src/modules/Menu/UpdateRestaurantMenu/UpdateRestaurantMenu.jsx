import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axios } from "@lib/axios"

import { ROUTERS } from "@router/Router.config"
import {
  getByOwnerMenuItemRequest,
  deleteByOwnerMenuItemRequest,
  updateByOwnerMenuItemRequest,
} from "../api"

import { useCloudinary, useLoading, useToast } from "@hooks"
import { removeWildcard } from "@helpers"
import { isObjectEmpty, isObjectEqual } from "@utils/index"

import PreviousDataDisplay from "@components/PreviousDataDisplay/PreviousDataDisplay"
import UpdateFormsContainer from "@components/UpdateFormsContainer/UpdateFormsContainer"
import Form from "./components/Form"
import Button from "@ui/Button/Button"

const UpdateRestaurantMenu = ({ restaurantId }) => {
  const { menuId } = useParams()
  const { upload } = useCloudinary()
  const navigate = useNavigate()
  const setLoading = useLoading()
  const showNotification = useToast()

  const [menuItemData, setMenuItemData] = useState([])
  const [dataForUpdate, setDataForUpdate] = useState({
    name: "",
    type: "",
    description: "",
    price: 0,
    available: true,
    photo: {},
  })

  useEffect(() => {
    setLoading(true)
    const cancelTokenSource = axios.CancelToken.source()

    getByOwnerMenuItemRequest({
      restaurantId,
      foodId: menuId,
      cancelToken: cancelTokenSource.token,
    })
      .then(({ data }) => {
        setMenuItemData(data)
        setDataForUpdate(data)
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
      cancelTokenSource.cancel()
    }
  }, [])

  const handleUpateMenuItem = async () => {
    if (isObjectEqual(dataForUpdate, menuItemData)) {
      showNotification("Данные не изменились", "info")
      return
    }
    if (isObjectEmpty(dataForUpdate.photo)) {
      showNotification("Нету иконки", "warning")
      return
    }

    setLoading(true)

    try {
      let photo = null
      if (!isObjectEqual(dataForUpdate.photo, menuItemData.photo)) {
        const uploadedPhoto = await upload([dataForUpdate.photo])
        photo = {
          route: uploadedPhoto[0].secure_url,
        }
      }

      const status = (
        await updateByOwnerMenuItemRequest({
          restaurantId,
          foodId: menuId,
          body: {
            ...dataForUpdate,
            photo: photo || dataForUpdate.photo,
          },
        })
      ).status

      status === 201 && showNotification("Успешно обновлено", "success")
      navigate(
        `${removeWildcard(
          ROUTERS.RestaurantMenu.root.replace(":restaurantId", restaurantId)
        )}${ROUTERS.RestaurantMenu.myRestaurantMenu}`
      )
    } catch (err) {
      showNotification(err.toString(), "error")
    } finally {
      setLoading(false)
    }
  }

  const deleteTableData = () => {
    setLoading(true)
    deleteByOwnerMenuItemRequest({ restaurantId, foodId: menuId })
      .then(() => {
        showNotification("Успешно удалено", "success")
        navigate(
          `${removeWildcard(
            ROUTERS.RestaurantMenu.root.replace(":restaurantId", restaurantId)
          )}${ROUTERS.RestaurantMenu.myRestaurantMenu}`
        )
      })
      .catch((err) => {
        showNotification(err.toString(), "error")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <UpdateFormsContainer>
      <div className="flex flex-col gap-[30px] w-full max-md:gap-[15px]">
        <h3 className="text-[20px] font-[600] max-md:text-center">
          Изменить меню
        </h3>
        <div className="flex justify-between gap-[20px]">
          <div className="flex flex-col justify-between gap-[10px] w-full">
            <PreviousDataDisplay label={"ID:"} value={menuItemData.id} />
            <PreviousDataDisplay
              label={"Название:"}
              value={menuItemData.name}
            />
            <PreviousDataDisplay
              label={"Тип столика:"}
              value={menuItemData.type}
            />
          </div>
          <div className="max-w-[50%] w-[350px] rounded-[20px] border overflow-hidden">
            {menuItemData?.photo?.route ? (
              <img
                src={menuItemData.photo.route}
                alt=""
                className="w-[100%] h-full object-cover"
              />
            ) : (
              <div className="w-[350px] border rounded-[20px]"></div>
            )}
          </div>
        </div>
        <PreviousDataDisplay
          label={"Описание:"}
          value={menuItemData.description}
        />
        <div className="grid grid-cols-2 gap-[20px] max-md:grid-cols-1 max-md:gap-[15px]">
          <PreviousDataDisplay label={"Цена:"} value={menuItemData.price} />
          <PreviousDataDisplay
            label={"Доступность:"}
            value={menuItemData.available ? "Доступен" : "Не доступен"}
          />
        </div>
        <Button
          text="Удалить"
          backgroundColor="#FF5050"
          spacingClass={"mx-auto px-[110px] py-[20px]"}
          onClick={deleteTableData}
        />
      </div>
      <Form
        handleUpdateButton={handleUpateMenuItem}
        menuItemData={menuItemData}
        setDataForUpdate={setDataForUpdate}
      />
    </UpdateFormsContainer>
  )
}

export default UpdateRestaurantMenu
