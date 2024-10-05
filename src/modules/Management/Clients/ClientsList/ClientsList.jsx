import React, { useEffect, useState } from "react"
import { axios } from "@lib/axios"

import {
  getByAdminAllClientsRequest,
  deleteByAdminClientRequest,
} from "../../api"
import { useLoading, useToast } from "@hooks"
import { isArraysEqualByIdWithSet } from "@utils"

import ListCategories from "@components/ListCategories"
import ListItem from "@components/ListItem/ListItem"
import Pagination from "@components/Pagination/Pagination"

const categories = ["id", "Имя", "Фамилия", "Почта", "Телефон", "Действие"]

const ClientsList = () => {
  const setLoading = useLoading()
  const showNotification = useToast()

  const [clients, setClients] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const [params, setParams] = useState({
    pageIndex: 1,
    limit: 10,
  })

  useEffect(() => {
    setLoading(true)
    const cancelToken = axios.CancelToken.source()

    getByAdminAllClientsRequest({ params, cancelToken })
      .then(({ data }) => {
        updateClientsList(data)
        showNotification("Данные успешно загружены", "success")
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
					setClients([])
          showNotification("Запрос был отменен", "warning")
        } else {
          showNotification(err.toString(), "error")
        }
      })
      .finally(() => setLoading(false))

    return () => {
      cancelToken.cancel()
    }
  }, [params])

  const deleteClientData = async (clientId) => {
    setLoading(true)
    try {
      await deleteByAdminClientRequest(clientId)
      showNotification("deleted", "success")
      const { data } = await getByAdminAllClientsRequest(params)
      updateClientsList(data)
    } catch (err) {
      showNotification(err.toString(), "error")
    } finally {
      setLoading(false)
    }
  }

  const updateClientsList = (data) => {
    if (data.items.length === 0) {
      if (clients?.length > 0) setClients([])
    } else {
      const filteredItems = data.items.map(({ role, ...rest }) => rest)
      if (isArraysEqualByIdWithSet(clients, filteredItems)) return
      setClients(filteredItems)
    }
    const newTotalPage = Math.ceil(data?.totalItems / params.limit) || 0
    if (totalPage !== newTotalPage) setTotalPage(newTotalPage)
  }

  const getMenuActions = (id) => {
    return [
      {
        action: "Удалить",
        onClick: () => deleteClientData(id),
      },
    ]
  }

  return (
    <>
      <ul className="flex flex-col gap-[20px]">
        <ListCategories categories={categories} />
        {clients?.length > 0 ? (
          clients.map((item, index) => (
            <ListItem
              key={item.id}
              elementData={item}
              menuActions={getMenuActions(item.id)}
              index={index}
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
    </>
  )
}

export default React.memo(ClientsList)
