import { useEffect, useState } from "react"
import { axios } from "@lib/axios"

import { getAllTablesRequest, deleteByOwnerTableRequest } from "../api"
import { ROUTERS } from "@router/Router.config"

import { useLoading, useToast } from "@hooks"
import { isArraysEqualByIdWithSet } from "@utils/index"
import { removeWildcard } from "@helpers"

import ListCategories from "@components/ListCategories"
import ListItem from "@components/ListItem/ListItem"
import Pagination from "@components/Pagination/Pagination"
import TableCategoriesSlider from "./components/TableCategoriesSlider"

const categories = [
  "ID",
  "Фото",
  "Название",
  "Тип столика",
  "Вместимость",
  "Действие",
]

const MyRestaurantTablesList = ({ restaurantId }) => {
  const setLoading = useLoading()
  const showNotification = useToast()

  const [tables, setTables] = useState([])

  const [totalPage, setTotalPage] = useState(0)
  const [params, setParams] = useState({
    pageIndex: 1,
    limit: 10,
    q: "",
  })

  useEffect(() => {
    setLoading(true)
    const cancelTokenSource = axios.CancelToken.source()
    getAllTablesRequest({
      restaurantId,
      params,
      cancelToken: cancelTokenSource,
    })
      .then(({ data }) => {
        updateTablesList(data)
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
  }, [params])

  const deleteTableById = async (tableId) => {
    setLoading(true)
    try {
      await deleteByOwnerTableRequest(restaurantId, tableId)
      showNotification("deleted", "success")
      const { data } = await getAllTablesRequest({ restaurantId, params })
      updateTablesList(data)
    } catch (err) {
      showNotification(err.toString(), "error")
    } finally {
      setLoading(false)
    }
  }

  const updateTablesList = (data) => {
    if (data.items.length === 0) {
      if (tables?.length > 0) setTables([])
    } else {
      const filteredItems = data.items.map(
        ({ id, photo, name, type, capacity }) => ({
          id,
          photo,
          name,
          type,
          capacity,
        })
      )
      if (isArraysEqualByIdWithSet(filteredItems, tables)) return
      setTables(filteredItems)
    }
    const newTotalPage = Math.ceil(data?.totalItems / params.limit) || 0
    if (totalPage !== newTotalPage) setTotalPage(newTotalPage)
  }

  const getContextMenuItems = (id) => {
    return [
      {
        action: "Изменить",
        to: `${removeWildcard(
          ROUTERS.RestaurantTable.root.replace(":restaurantId", restaurantId)
        )}${ROUTERS.RestaurantTable.updateTable.replace(":tableId", id)}`,
      },
      {
        action: "Удалить",
        onClick: () => deleteTableById(id),
      },
    ]
  }

  return (
    <ul className="flex flex-col gap-[20px]">
      <ListCategories categories={categories} />
      <TableCategoriesSlider
        restaurantId={restaurantId}
        getCategory={(type) => {
					if(type === params.q) return
          setParams((prev) => ({ ...prev, q: type }))
        }}
      />
      {tables?.length > 0 ? (
        tables.map((table, index) => (
          <ListItem
            key={table.id}
            elementData={table}
            index={index}
            menuActions={getContextMenuItems(table.id)}
          />
        ))
      ) : (
        <p className="flex justify-center items-center text-[#b0b0b0]">
          No items
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

export default MyRestaurantTablesList
