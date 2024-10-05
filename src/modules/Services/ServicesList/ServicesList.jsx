import { useState, useEffect } from "react"
import { axios } from "@lib/axios"

import {
  getAllServicesRequest,
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
} from "../api"

import { useLoading, useToast } from "@hooks"
import { isArraysEqualByIdWithSet } from "@utils/index"

import ServiceItem from "./components/ServiceItem"
import Modal from "./components/Modal"
import Button from "@ui/Button/Button"

const ServicesList = () => {
  const setLoading = useLoading()
  const showNotification = useToast()

  const [services, setServices] = useState([])
  const [inputValue, setInputValue] = useState("")

  let cancelTokenSource = null

  useEffect(() => {
    setLoading(true)

    cancelTokenSource = axios.CancelToken.source()

    getAllServicesRequest({ cancelToken: cancelTokenSource.token })
      .then(({ data }) => {
        setServices(data)
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
      cancelTokenSource.cancel()
    }
  }, [])

  const createService = async (value) => {
    if (!value.trim()) {
      showNotification("Форма невалидна", "warning")
      return
    }
    setLoading(true)

    if (cancelTokenSource) {
      cancelTokenSource.cancel("Previous request cancelled")
    }
    cancelTokenSource = axios.CancelToken.source()

    try {
      await createServiceRequest({
        body: { name: value },
      })
      showNotification("Успешно создан", "success")
      const { data } = await getAllServicesRequest({
        cancelToken: cancelTokenSource.token,
      })
      updateServicesList(data)
    } catch (err) {
      showNotification(err.toString(), "error")
    } finally {
      setLoading(false)
    }
  }

  const deleteService = async (serviceId) => {
    setLoading(true)
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Previous request cancelled")
    }
    cancelTokenSource = axios.CancelToken.source()
    try {
      await deleteServiceRequest({ serviceId })
      showNotification("Успешно удален", "success")
      const { data } = await getAllServicesRequest({
        cancelToken: cancelTokenSource.token,
      })
      updateServicesList(data)
    } catch (err) {
      showNotification(err.toString(), "error")
    } finally {
      setLoading(false)
    }
  }

  const updateServicesList = (data) => {
    if (data.length === 0) {
      if (services.length > 0) setServices([])
    } else {
      if (isArraysEqualByIdWithSet(services, data)) return
      setServices(data)
    }
  }

  return (
    <>

      <div className="flex flex-col gap-[20px]">
        <div className="w-1/2 flex gap-[10px] h-[40px] max-lg:w-full">
          <input
            value={inputValue}
            placeholder={"Новый сервис"}
            className="w-full h-full px-[10px] text-[15px] font-[600] border-[3px] border-[#ebebeb] rounded-[10px] outline-none  placeholder-[#C6C6C6] 
				hover:border-[#60aafc] focus:border-[#60aafc]
				max-md:text-[14px]"
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
          />
          <Button
            text="Создать"
            gradient={true}
            onClick={() => {
              createService(inputValue)
              setInputValue("")
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-[20px] gap-y-[10px] justify-between max-lg:grid-cols-1">
          {services?.map((service, index) => (
            <ServiceItem
              service={service}
              deleteService={deleteService}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ServicesList
