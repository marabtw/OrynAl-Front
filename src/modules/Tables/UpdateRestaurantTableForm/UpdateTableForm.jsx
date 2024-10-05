import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axios } from "@lib/axios"

import { ROUTERS } from "@router/Router.config"
import {
  getByOwnerTableRequest,
  updateByOwnerTableRequest,
  deleteByOwnerTableRequest,
} from "../api"

import { useCloudinary, useLoading, useToast } from "@hooks"
import { isObjectEmpty, isObjectEqual } from "@utils/index"
import { removeWildcard } from "@helpers"

import PreviousDataDisplay from "@components/PreviousDataDisplay/PreviousDataDisplay"
import UpdateFormsContainer from "@components/UpdateFormsContainer/UpdateFormsContainer"
import Form from "./components/Form"
import Button from "@ui/Button/Button"

const UpdateTableForm = ({ restaurantId }) => {
  const { tableId } = useParams()
  const { upload } = useCloudinary()
  const navigate = useNavigate()
  const setLoading = useLoading()
  const showNotification = useToast()

  const [tableData, setTableData] = useState([])
  const [dataForUpdate, setDataForUpdate] = useState({
    name: "",
    type: "",
    description: "",
    capacity: 0,
    photo: {},
  })

  useEffect(() => {
    setLoading(true)
    const cancelTokenSource = axios.CancelToken.source()

    getByOwnerTableRequest({ restaurantId, tableId, cancelToken: cancelTokenSource.token })
      .then(({ data }) => {
        setTableData(data)
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

  const handleUpdateTable = async () => {
    if (isObjectEqual(dataForUpdate, tableData)) {
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
      if (!isObjectEqual(dataForUpdate.photo, tableData.photo)) {
        const uploadedPhoto = await upload([dataForUpdate.photo])
        photo = {
          route: uploadedPhoto[0].secure_url,
        }
      }

      const status = (
        await updateByOwnerTableRequest({
          restaurantId,
          tableId,
          body: {
            ...dataForUpdate,
            photo: photo || dataForUpdate.photo,
          },
        })
      ).status

      status === 201 && showNotification("Успешно обновлено", "success")
      navigate(
        `${removeWildcard(
          ROUTERS.RestaurantTable.root.replace(":restaurantId", restaurantId)
        )}${ROUTERS.RestaurantTable.myRestaurantTables}`
      )
    } catch (err) {
      showNotification(err.toString(), "error")
    } finally {
      setLoading(false)
    }
  }

  const deleteTableData = () => {
    setLoading(true)
    deleteByOwnerTableRequest({ restaurantId, tableId })
      .then(() => {
        showNotification("Успешно удалено", "success")
        navigate(
          `${removeWildcard(
            ROUTERS.RestaurantTable.root.replace(":restaurantId", restaurantId)
          )}${ROUTERS.RestaurantTable.myRestaurantTables}`
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
          Изменить столик
        </h3>
        <div className="flex justify-between gap-[20px]">
          <div className="flex flex-col justify-between gap-[10px] w-full">
            <PreviousDataDisplay label={"ID:"} value={tableData.id} />
            <PreviousDataDisplay label={"Название:"} value={tableData.name} />
            <PreviousDataDisplay
              label={"Тип столика:"}
              value={tableData.type}
            />
          </div>
          <div className="max-w-[50%] w-[350px] rounded-[20px] border overflow-hidden">
            {tableData?.photo?.route ? (
              <img
                src={tableData.photo.route}
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
          value={tableData.description}
        />
        <PreviousDataDisplay
          label={"Вместимость:"}
          value={`${tableData.capacity} человек`}
        />
        <Button
          text="Удалить"
          backgroundColor={"#FF5050"}
          spacingClass={"mx-auto px-[110px] py-[20px]"}
          onClick={deleteTableData}
        />
      </div>
      <Form
        handleUpdateButton={handleUpdateTable}
        tableData={tableData}
        setDataForUpdate={setDataForUpdate}
      />
    </UpdateFormsContainer>
  )
}

export default UpdateTableForm
