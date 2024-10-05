import { useEffect, useState } from "react"
import { axios } from "@lib/axios"

import {
  getByAdminAllOwnersRequest,
  deleteByAdminOwnerRequest,
} from "../../api"
import { useLoading, useToast } from "@hooks"
import { isArraysEqualByIdWithSet } from "@utils"

import ListCategories from "@components/ListCategories"
import ListItem from "@components/ListItem/ListItem"
import Pagination from "@components/Pagination/Pagination"

const categories = ["id", "Имя", "Фамилия", "Почта", "Телефон", "Действие"]

const OwnersList = () => {
  const setLoading = useLoading()
  const showNotification = useToast()

  const [owners, setOwners] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const [params, setParams] = useState({
    pageIndex: 1,
    limit: 10,
  })

  let cancelTokenSource = null

  useEffect(() => {
    setLoading(true)
    const cancelToken = axios.CancelToken.source()
    getByAdminAllOwnersRequest({ params, cancelToken })
      .then(({ data }) => {
        updateOwnersList(data)
        showNotification("Данные успешно загружены", "success")
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
					setOwners([])
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

  const deleteOwnerData = async (ownerId) => {
    setLoading(true)
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Previous request cancelled")
    }
    cancelTokenSource = axios.CancelToken.source()
    try {
      await deleteByAdminOwnerRequest(ownerId)
      showNotification("deleted", "success")
      const { data } = await getByAdminAllOwnersRequest({
        params,
        cancelTokenSource,
      })
      updateOwnersList(data)
    } catch (err) {
      showNotification(err.toString(), "error")
    } finally {
      setLoading(false)
    }
  }

  const updateOwnersList = (data) => {
    if (data.items.length === 0) {
      if (owners.length > 0) setOwners([])
    } else {
      const filteredItems = data.items.map(({ role, ...rest }) => rest)
      if (isArraysEqualByIdWithSet(owners, filteredItems)) return
      setOwners(filteredItems)
    }
    const newTotalPage = Math.ceil(data?.totalItems / params.limit) || 0
    if (totalPage !== newTotalPage) setTotalPage(newTotalPage)
  }

  const getMenuActions = (ownerId) => {
    return [
      {
        action: "Удалить",
        onClick: () => deleteOwnerData(ownerId),
      },
    ]
  }

  return (
    <>
      <ul className="flex flex-col gap-[20px] max-md:px-[20px] max-sm:px-0">
        <ListCategories categories={categories} />
        {owners?.length > 0 ? (
          owners.map((owner, index) => (
            <ListItem
              key={owner.id}
              elementData={owner}
              menuActions={getMenuActions(owner.id)}
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
            setParams((prev) => ({ ...prev, pageIndex: index }))
          }}
        />
      </ul>
    </>
  )
}

export default OwnersList
