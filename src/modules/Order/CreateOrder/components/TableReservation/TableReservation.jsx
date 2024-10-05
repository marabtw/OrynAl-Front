import { useState, useEffect } from "react"
import { axios } from "@lib/axios"

import TableCard from "./components/TableCard"
import SortByCategoryContainer from "@components/SortByCategoryContainer/SortByCategoryContainer"
import ChooseTime from "./components/ChooseTime"

import Pagination from "@components/Pagination/Pagination"

import { getAllTablesRequest, getTableCategoriesRequest } from "../../../api"
import { useLoading, useToast } from "@hooks"

const TableReservation = ({
  restaurantId,
  getTableId,
  setDateAndTimeToCart,
}) => {
  const setLoading = useLoading()
  const showNotification = useToast()
  const [tables, setTables] = useState([])
  const [selectedTableId, setSelectedTableId] = useState("")
  const [categories, setCategories] = useState([])

  const [totalItems, setTotalItems] = useState(0)

  const [filter, setFilter] = useState({
    date: "",
    time: "",
  })

  const [params, setParams] = useState({
    pageIndex: 1,
    limit: 8,
    q: "",
    date: "",
  })

  useEffect(() => {
    if (!filter.date || !filter.time) return

    const combinedDateTime = `${filter.date}T${filter.time}:00`
    const dateObj = new Date(combinedDateTime)
    const correctIsoDate = dateObj.toISOString()
    dateObj.setHours(dateObj.getHours() - 5)
    const modifiedIsoDate = new Date(
      dateObj.getTime() - dateObj.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 19)

    setParams((prev) => ({
      ...prev,
      date: modifiedIsoDate,
    }))

    setDateAndTimeToCart(correctIsoDate)
  }, [filter])

  useEffect(() => {
    setLoading(true)
    const cancelTokenSource = axios.CancelToken.source()

    getTableCategoriesRequest({
      restaurantId,
      cancelToken: cancelTokenSource.token,
    })
      .then(({ data }) => {
        if (!data || !data?.length) setCategories([])
        else {
          setCategories([
            {
              forShow: "Все",
              value: "",
            },
            ...data.map((item) => ({
              forShow: item,
              value: item,
            })),
          ])
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          showNotification(`Запрос был отменен: ${err}`, "warning")
        } else {
          setCategories([])
          showNotification(`Не удалось загрузить категории: ${err}`, "error")
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      cancelTokenSource.cancel()
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    const cancelTokenSource = axios.CancelToken.source()

    getAllTablesRequest({
      restaurantId,
      params,
      cancelToken: cancelTokenSource.token,
    })
      .then(({ data }) => {
        if (!data || !data?.items?.length) setTables([])
        else {
          setTables(data.items)
          setTotalItems(data.totalItems)
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          showNotification(`Запрос был отменен: ${err}`, "warning")
        } else {
          setTables([])
          showNotification(`Не удалось загрузить столы: ${err}`, "error")
        }
      })
      .finally(setLoading(false))

    return () => {
      cancelTokenSource.cancel()
    }
  }, [params])

  return (
    <>
      <ChooseTime getFilter={setFilter} />
      {params.date ? (
        <div className="px-[180px] max-2xl:px-[80px] max-lg:px-[20px]">
          <SortByCategoryContainer
            categories={categories}
            className={"mt-[50px] px-0 max-lg:mt-[20px]"}
            getCategory={(value) => {
              setParams((prev) => ({ ...prev, q: value }))
            }}
          />
          <div
            className="grid grid-cols-4 gap-[30px] max-xl:grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2
				justify-between 
				mt-[50px] max-lg:mt-[20px]"
          >
            {tables?.length &&
              tables.map((table) => (
                <div className="flex justify-center items-center">
                  <TableCard
                    key={table.id}
                    tableData={table}
                    getTableId={(id) => {
                      setSelectedTableId(id)
                      getTableId(id)
                    }}
                    selectedTableId={selectedTableId}
                  />
                </div>
              ))}
          </div>
          <Pagination
            totalPage={Math.ceil(totalItems / params.limit)}
            getCurrentPage={(index) => {
              setParams((prev) => {
                return { ...prev, pageIndex: index }
              })
            }}
          />
        </div>
      ) : (
        <p className="text-center my-[30px]">
          Выберите дату и время для выбора стола
        </p>
      )}
    </>
  )
}

export default TableReservation
