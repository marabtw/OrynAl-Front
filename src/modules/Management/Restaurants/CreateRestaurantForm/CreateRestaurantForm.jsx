import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { axios } from "@lib/axios"

import { ROUTERS } from "@router/Router.config"
import {
  getByAdminAllOwnersRequest,
  сreateByAdminRestaurantRequest,
  getAllServicesRequest,
  getTimes,
  getAllCities,
} from "../../api"

import { removeWildcard, isValidPhone } from "@helpers"
import { useLoading, useToast, useCloudinary } from "@hooks"
import { isArraysEqualByIdWithSet, isObjectEmpty } from "@utils"

import FormInputTextWrapper from "@components/FormComponents/FormInputTextWrapper/FormInputTextWrapper"
import FormInputFileWrapper from "@components/FormComponents/FormInputFileWrapper/FormInputFileWrapper"
import FormSelectWrapper from "@components/FormComponents/FormSelectWrapper/FormSelectWrapper"

import Button from "@ui/Button/Button"
import FormSelect from "@ui/Select/FormSelect"
import FormCheckbox from "@ui/Field/FormCheckbox"

const CreateRestaurantForm = () => {
  const navigate = useNavigate()
  const showNotification = useToast()
  const setLoading = useLoading()
  const { upload, remove } = useCloudinary()

  const [dataForCreate, setDataForCreate] = useState({
    name: "",
    address: "",
    description: "",
    city: "",
    ownerId: "",
    modeFrom: "",
    modeTo: "",
    phone: "",
    status: true,
    services: [],
    icon: {},
    photos: [],
  })
  const [owners, setOwners] = useState([])
  const [services, setServices] = useState([])

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
      const uploadedPhotos = await upload(
        dataForCreate.photos.map((photo) => photo.file)
      )
      const photos = uploadedPhotos.map((photo) => ({
        route: photo.secure_url,
      }))

      const uploadedIcon = await upload([dataForCreate.icon.file])
      const icon = {
        route: uploadedIcon[0].secure_url,
      }

      const updatedDataForCreate = {
        ...dataForCreate,
        photos,
        icon,
      }

      const status = (await createRestaurant(updatedDataForCreate)).status
      status === 201 && showNotification("Ресторан успешно создан", "success")
    } catch (error) {
      showNotification("Ошибка при создании ресторана", "error")
      console.error("Error creating restaurant:", error)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    return (
      !isObjectEmpty(dataForCreate.icon) &&
      dataForCreate.photos?.length > 0 &&
      dataForCreate.name &&
      dataForCreate.address &&
      dataForCreate.description &&
      dataForCreate.city &&
      dataForCreate.ownerId &&
      dataForCreate.modeFrom &&
      dataForCreate.modeTo &&
      isValidPhone(dataForCreate.phone)
    )
  }

  useEffect(() => {
    setLoading(true)
    let cancelTokenSource1 = axios.CancelToken.source()
    let cancelTokenSource2 = axios.CancelToken.source()

    getByAdminAllOwnersRequest({ cancelToken: cancelTokenSource1.token })
      .then(({ data }) => {
        if (data.items === 0) {
          if (owners && owners.length > 0) setOwners([])
        } else {
          const filteredItems = data.items?.map(({ id, name, surname }) => ({
            label: `${name} ${surname ? surname : ""}`,
            value: id,
          }))
          if (isArraysEqualByIdWithSet(owners, filteredItems)) return
          setOwners(filteredItems)
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          showNotification("Запрос был отменен", "warning")
        } else {
          showNotification(err, "error")
        }
      })
      .finally(() => {
        setLoading(false)
        cancelTokenSource1.cancel()
      })

    getAllServicesRequest({ cancelToken: cancelTokenSource2.token })
      .then(({ data }) => {
        if (data === 0) {
          if (services?.length > 0) setServices([])
        } else {
          const filteredItems = data
          if (isArraysEqualByIdWithSet(services, filteredItems)) return
          setServices(filteredItems)
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          showNotification("Запрос был отменен", "warning")
        } else {
          showNotification(err, "error")
        }
      })
      .finally(() => {
        setLoading(false)
        cancelTokenSource2.cancel()
      })

    return () => {
      cancelTokenSource1.cancel()
      cancelTokenSource2.cancel()
    }
  }, [])

  const createRestaurant = async (data) => {
    сreateByAdminRestaurantRequest(data)
      .then(() => {
        showNotification("Ресторан успешно создан", "success")
        navigate(
          `${removeWildcard(ROUTERS.Management.root)}${
            ROUTERS.Management.allRestaurants
          }`
        )
      })
      .catch((error) => showNotification(error.toString(), "error"))
  }

  const handleChange = (key, value) => {
    setDataForCreate((prevState) => {
      // Обработка иконки
      if (key === "icon") {
        return {
          ...prevState,
          [key]: value[0] || {},
        }
      }

      // Обработка фотографий
      if (key === "photos") {
        return {
          ...prevState,
          [key]: value?.length > 0 ? value : [],
        }
      }

      // Обработка булевых значений
      if (typeof value === "boolean") {
        return {
          ...prevState,
          [key]: value,
        }
      }

      // Обработка сервисов
      if (key === "services") {
        const existingService = prevState[key]?.some(
          (item) => item.id === value.id
        )
        const updatedServices = existingService
          ? prevState[key].filter((item) => item.id !== value.id)
          : prevState[key]
          ? [...prevState[key], value]
          : [value]

        return {
          ...prevState,
          [key]: updatedServices.length > 0 ? updatedServices : null,
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
    <div className="flex flex-col gap-[30px] w-full">
      <form
        className="flex flex-col gap-[30px] w-full 
				px-[20px] py-[40px] 
				border-[3px] border-[#ebebeb] rounded-[20px] 
				max-md:gap-[15px] max-md:py-[20px] max-sm:px-[10px]"
      >
        <div className="grid grid-cols-2 gap-[30px] max-md:grid-cols-1 max-md:gap-[15px]">
          <FormInputTextWrapper
            placeholder="Sandyq"
            label="Название:"
            onChange={(value) => {
              handleChange("name", value)
            }}
          />
          <FormInputFileWrapper
            placeholder="Добавить логотип"
            label="Логотип:"
            getFiles={(files) => {
              handleChange("icon", files)
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-[30px] max-md:grid-cols-1 max-md:gap-[15px]">
          <FormInputTextWrapper
            placeholder="Абай, 101"
            label="Адрес"
            onChange={(value) => {
              handleChange("address", value)
            }}
          />
          <FormInputFileWrapper
            placeholder="Добавить фото"
            label="Фотографии:"
            multiple={true}
            getFiles={(files) => {
              handleChange("photos", files)
            }}
          />
        </div>
        <FormInputTextWrapper
          placeholder="Напишите краткое описание меню...."
          label="Описание"
          onChange={(value) => {
            handleChange("description", value)
          }}
        />
        <div className="grid grid-cols-2 gap-[30px] max-md:grid-cols-1 max-md:gap-[15px]">
          <div className="flex flex-col gap-[15px] max-md:gap-y-[5px]">
            <h3 className="text-[15px] font-[600] max-md:text-[12px]">
              Режим работы ▼
            </h3>
            <div className="flex items-center gap-[10px]">
              <div className="w-1/2">
                <FormSelect
                  placeholder={"10:00"}
                  placeholderIcon={true}
                  options={getTimes()}
                  onChange={(value) => {
                    handleChange("modeFrom", value)
                  }}
                />
              </div>
              <p className="text-[#C6C6C6] text-[15px]">-</p>
              <div className="w-1/2">
                <FormSelect
                  placeholder={"22:00"}
                  placeholderIcon={true}
                  options={getTimes()}
                  onChange={(value) => {
                    handleChange("modeTo", value)
                  }}
                />
              </div>
            </div>
          </div>
          <FormSelectWrapper
            label={"Город"}
            placeholder={"Алматы"}
            options={getAllCities()}
            onChange={(value) => {
              handleChange("city", value)
            }}
          />
          <FormInputTextWrapper
            placeholder="+0 (000) 000 00 00"
            type={"tel"}
            label="Номер телефона:"
            onChange={(value) => {
              handleChange("phone", value)
            }}
          />
          <FormSelectWrapper
            label={"Владелец"}
            placeholder={"Иван Петров"}
            placeholderIcon={true}
            options={owners}
            onChange={(value) => {
              handleChange("ownerId", value)
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-[10px] max-md:grid-cols-1">
          {services?.map((service) => (
            <FormCheckbox
              key={service.id}
              service={service}
              onChange={(service) => {
                handleChange("services", service)
              }}
            />
          ))}
        </div>
      </form>
      <Button
        text="Создать"
        spacingClass={"mx-auto px-[200px] py-[20px]"}
        gradient={true}
        onClick={uploadImages}
      />
    </div>
  )
}

export default CreateRestaurantForm
