import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { ROUTERS } from "@router/Router.config"
import { createByOwnerMenuItemRequest, getMenuTypes } from "../api"

import { useCloudinary, useLoading, useToast } from "@hooks"
import { removeWildcard } from "@helpers"

import FormInputTextWrapper from "@components/FormComponents/FormInputTextWrapper/FormInputTextWrapper"
import FormInputFileWrapper from "@components/FormComponents/FormInputFileWrapper/FormInputFileWrapper"
import FormSelectWrapper from "@components/FormComponents/FormSelectWrapper/FormSelectWrapper"
import Button from "@ui/Button/Button"
import { isObjectEmpty } from "@utils/index"

const CreateRestaurantMenu = ({ restaurantId }) => {
  const { upload } = useCloudinary()
  const navigate = useNavigate()
  const setLoading = useLoading()
  const showNotification = useToast()

  const [dataForCreate, setDataForCreate] = useState({
    name: "",
    type: "",
    description: "",
    price: 0,
    available: true,
    photo: {},
  })

  const isFormValid = () => {
    return (
      !isObjectEmpty(dataForCreate.photo) &&
      dataForCreate.name &&
      dataForCreate.type &&
      dataForCreate.description &&
      dataForCreate?.price > 0
    )
  }

  const uploadImages = async () => {
    if (!isFormValid()) {
      showNotification("Форма невалидна", "warning")
      return
    }

    setLoading(true)

    const transformationSettings = {
      width: 100,
      height: 100,
      crop: "fill",
      gravity: "center",
    }

    try {
      const uploadedIcon = await upload([dataForCreate.photo.file])
      const photo = {
        route: uploadedIcon[0].secure_url,
      }

      const updatedDataForCreate = {
        ...dataForCreate,
        photo,
      }

      const status = (await createMenuFood(updatedDataForCreate)).status
      status === 201 && showNotification("Ресторан успешно создан", "success")
    } catch (err) {
      showNotification(`Ошибка при создании ресторана: ${err}`, "error")
    } finally {
      setLoading(false)
    }
  }

  const createMenuFood = async (data) => {
    createByOwnerMenuItemRequest({ restaurantId, body: data })
      .then(() => {
        showNotification("Успешно создан", "success")
        navigate(
          `${removeWildcard(
            ROUTERS.RestaurantMenu.root.replace(":restaurantId", restaurantId)
          )}${ROUTERS.RestaurantMenu.myRestaurantMenu}`
        )
      })
      .catch((err) => showNotification(err.toString(), "error"))
  }

  const handleChange = (key, value) => {
    setDataForCreate((prevState) => {
      // Обработка иконки
      if (key === "photo") {
        return {
          ...prevState,
          [key]: value[0] || {},
        }
      }

      // Обработка булевых значений
      if (typeof value === "boolean") {
        return {
          ...prevState,
          [key]: value,
        }
      }

      // Обработка всех остальных случаев
      return {
        ...prevState,
        [key]: value,
      }
    })
  }

  return (
    <form className="flex flex-col gap-[30px] w-full px-[20px] py-[40px] border-[3px] border-[#ebebeb] rounded-[20px] ">
      <div className="grid grid-cols-2 gap-[30px] max-lg:grid-cols-1">
        <FormInputTextWrapper
          label="Название меню:"
          placeholder="Чизбургер"
          onChange={(value) => {
            handleChange("name", value)
          }}
        />
        <FormInputFileWrapper
          label="Фотографии:"
          placeholder="Добавить фото"
          getFiles={(files) => {
            handleChange("photo", files)
          }}
        />
      </div>
      <FormSelectWrapper
        label={"Тип меню:"}
        placeholder={"Фаст-фуд"}
        options={getMenuTypes()}
        onChange={(value) => {
          handleChange("type", value)
        }}
      />
      <FormInputTextWrapper
        label="Описание:"
        placeholder="Напишите краткое описание меню...."
        onChange={(value) => {
          handleChange("description", value)
        }}
      />
      <div className="grid grid-cols-2 gap-[20px]">
        <FormInputTextWrapper
          label={"Цена:"}
          placeholder={"1200 тенге"}
          type="number"
          onChange={(value) => {
            handleChange("price", +value)
          }}
        />
        <FormSelectWrapper
          label={"Доступность"}
          placeholder={"Доступен"}
          options={[
            { label: "Доступен", value: true },
            { label: "Не доступен", value: false },
          ]}
          onChange={(value) => {
            handleChange("available", value)
          }}
          defaultValueIndex={0}
        />
      </div>
      <Button
        text="Создать"
        gradient={true}
        spacingClass={"mx-auto px-[120px] py-[20px]"}
        onClick={uploadImages}
      />
    </form>
  )
}

export default CreateRestaurantMenu
