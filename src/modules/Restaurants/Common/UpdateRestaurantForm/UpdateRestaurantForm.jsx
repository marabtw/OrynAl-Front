import { useEffect, useState, useContext, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axios } from "@lib/axios"

import { AuthContext } from "@context/AuthContext"
import { ROUTERS } from "@router/Router.config"
import {
  getByAdminRestaurantRequest,
  updateByAdminRestaurantRequest,
  updateByOwnerRestaurantRequest,
  deleteByAdminRestaurantRequest,
  getRestaurantRequest,
  getAllServicesRequest,
} from "../../api"

import { useCloudinary, useLoading, useToast } from "@hooks"
import { removeWildcard } from "@helpers"
import {
  isObjectEqual,
  formatTimeString,
  isArraysEqualByIdWithSet,
  isObjectEmpty,
} from "@utils"

import PreviousDataDisplay from "@components/PreviousDataDisplay/PreviousDataDisplay"
import UpdateFormsContainer from "@components/UpdateFormsContainer/UpdateFormsContainer"
import Form from "./components/Form"
import RestaurantImagesSlider from "./components/RestaurantImagesSlider"
import Button from "@ui/Button/Button"

const UpdateRestaurantForm = () => {
  const { upload } = useCloudinary()
  const { restaurantId } = useParams()
  const navigate = useNavigate()
  const setLoading = useLoading()
  const showNotification = useToast()

  const { user } = useContext(AuthContext)
  const [restaurantData, setRestaurantData] = useState([])
  const [services, setServices] = useState([])

  const [dataForUpdate, setDataForUpdate] = useState({
    name: "",
    address: "",
    description: "",
    city: "",
    modeFrom: "",
    modeTo: "",
    phone: "",
    services: [],
    status: true,
    icon: {},
    photos: [],
  })

  useEffect(() => {
    const cancelTokenSource1 = axios.CancelToken.source()
    const cancelTokenSource2 = axios.CancelToken.source()

    const fetchServices = async () => {
      try {
        const { data } = await getAllServicesRequest({
          cancelToken: cancelTokenSource1.token,
        })
        if (data.length === 0) {
          if (services.length > 0) setServices([])
        } else {
          if (!isArraysEqualByIdWithSet(services, data)) {
            setServices(data)
          }
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          showNotification("Запрос был отменен", "warning")
        } else {
          showNotification(err.toString(), "error")
        }
      }
    }

    const fetchRestaurantData = async () => {
      try {
        const getData =
          user.role === "admin"
            ? getByAdminRestaurantRequest
            : getRestaurantRequest
        const { data } = await getData({
          restaurantId,
          cancelToken: cancelTokenSource2.token,
        })
        if (!isObjectEqual(restaurantData, data)) {
          setRestaurantData(data)
          setDataForUpdate(data)
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          showNotification("Запрос был отменен", "warning")
        } else {
          showNotification(err.toString(), "error")
        }
      }
    }

    const fetchData = async () => {
      setLoading(true)
      await Promise.all([fetchServices(), fetchRestaurantData()])
      showNotification("Данные успешно загрузились", "success")
      setLoading(false)
    }

    fetchData()

    return () => {
      cancelTokenSource1.cancel()
      cancelTokenSource2.cancel()
    }
  }, [restaurantId])

  const handleUpdateRestaurantData = async () => {
    if (isObjectEqual(dataForUpdate, restaurantData)) {
      showNotification("Данные не изменились", "info")
      return
    }
    if (isObjectEmpty(dataForUpdate.icon)) {
      showNotification("Нету иконки", "warning")
      return
    }
    if (dataForUpdate?.photos?.length < 1) {
      showNotification("Нету фотографий", "warning")
      return
    }

    setLoading(true)

    const updateRequest =
      user.role === "admin"
        ? updateByAdminRestaurantRequest
        : updateByOwnerRestaurantRequest

    const navigateAfter =
      user.role === "admin"
        ? `${removeWildcard(ROUTERS.Management.root)}${
            ROUTERS.Management.allRestaurants
          }`
        : `${removeWildcard(ROUTERS.Restaurant.root)}${
            ROUTERS.Restaurant.myRestaurants
          }`

    try {
      const photosForUpload = dataForUpdate?.photos?.filter(
        (photo) => photo.file
      )

      let photos = null
      if (photosForUpload.length > 0) {
        const uploadedPhotos = await upload(photosForUpload)
        photos = uploadedPhotos.map((photo) => ({
          route: photo.secure_url,
        }))
      }

      let icon = null
      if (!isObjectEqual(dataForUpdate.icon, restaurantData.icon)) {
        const uploadedIcon = await upload([dataForUpdate.icon])
        icon = {
          route: uploadedIcon[0].secure_url,
        }
      }

      const status = (
        await updateRequest(restaurantId, {
          ...dataForUpdate,
          photos: photos || dataForUpdate.photos,
          icon: icon || dataForUpdate.icon,
        })
      ).status

      status === 201 && showNotification("Успешно обновлено", "success")
      navigate(navigateAfter)
    } catch (err) {
      showNotification(err.toString(), "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRestaurantData = useCallback(() => {
    setLoading(true)

    deleteByAdminRestaurantRequest(restaurantId)
      .then(() => {
        showNotification("deleted", "success")
        navigate(
          `${removeWildcard(ROUTERS.Management.root)}${
            ROUTERS.Management.allRestaurants
          }`
        )
      })
      .catch((err) => {
        showNotification(err.toString(), "error")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <UpdateFormsContainer>
      <div className="flex flex-col justify-between gap-[30px] w-full max-lg:gap-[10px]">
        <h3 className="text-[20px] font-[600] max-md:text-center max-md:text-[16px]">
          Изменить ресторан
        </h3>
        <div
          className="flex justify-between gap-[20px]
					max-md:gap-[15px]"
        >
          <div className="flex flex-col justify-between gap-[10px] w-full ">
            <PreviousDataDisplay label={"ID:"} value={restaurantData?.id} />
            <PreviousDataDisplay
              label={"Название:"}
              value={restaurantData?.name}
            />
            <PreviousDataDisplay
              label={"Адрес:"}
              value={restaurantData?.address}
            />
          </div>
          <div className="max-w-[50%] w-[350px] rounded-[20px] border overflow-hidden">
            {restaurantData.icon && (
              <img
                src={restaurantData?.icon.route}
                alt=""
                className="w-[100%] h-full object-cover"
              />
            )}
          </div>
        </div>
        <RestaurantImagesSlider images={restaurantData?.photos} />
        <PreviousDataDisplay
          label={"Описание:"}
          value={restaurantData.description}
        />
        <div className="flex justify-between gap-[20px] max-sm:flex-col max-sm:gap-[15px]">
          <PreviousDataDisplay
            label={"Режим работы:"}
            value={`${formatTimeString(
              restaurantData.modeFrom
            )}-${formatTimeString(restaurantData.modeTo)}`}
          />
          <PreviousDataDisplay label={"Город:"} value={restaurantData.city} />
        </div>
        <PreviousDataDisplay
          label={"Номер телефона:"}
          value={restaurantData.phone}
        />
        <PreviousDataDisplay
          label={"Сервис:"}
          value={
            restaurantData?.services?.length > 0
              ? restaurantData.services
              : "no service"
          }
        />
      </div>
      <Form
        services={services}
        restaurantData={restaurantData}
        setDataForUpdate={setDataForUpdate}
      />
      {user.role === "admin" ? (
        <Button
          text="Удалить"
          spacingClass={"mx-auto px-[120px] py-[20px]"}
          backgroundColor={"#FF5050"}
          onClick={handleDeleteRestaurantData}
        />
      ) : (
        <div></div>
      )}
      <Button
        gradient={true}
        text="Изменить"
        spacingClass={"mx-auto px-[120px] py-[20px]"}
        onClick={handleUpdateRestaurantData}
      />
    </UpdateFormsContainer>
  )
}

export default UpdateRestaurantForm
