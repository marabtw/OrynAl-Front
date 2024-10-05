import { useState, useEffect, useCallback } from "react"
import { axios } from "@lib/axios"

import { useLoading, useToast } from "@hooks"

import { getAllRestaurantsRequest } from "../../api/index"
import { isArraysEqualDeep, isObjectEmpty } from "@utils/index"

import RestaurantItemCard from "./RestaurantItemCard"
import Search from "./Search"
import SortByCategoryContainer from "@components/SortByCategoryContainer/SortByCategoryContainer"
import Pagination from "@components/Pagination/Pagination"

const sortList = [
  {
    forShow: "Все рестораны",
    value: "",
  },
  {
    forShow: "Избранные рестораны",
    value: "избранные",
  },
]

const Restaurants = () => {
  const setLoading = useLoading()
  const showNotification = useToast()

  const [isResultBySearch, setIsResultBySearch] = useState(false)
  const [restaurants, setRestaurants] = useState([])

  const [searchTotalPage, setSearchTotalPage] = useState(0)
  const [totalPage, setTotalPage] = useState(0)

  const [params, setParams] = useState({
    pageIndex: 1,
    limit: 6,
  })

  const [searchParams, setSearchParams] = useState({
    pageIndex: 1,
    limit: 6,
    q: "",
  })

  useEffect(() => {
    if (isResultBySearch) return
    const cancelTokenSource = axios.CancelToken.source()
    fetchData(cancelTokenSource.token)
    return () => {
      cancelTokenSource.cancel()
    }
  }, [params, isResultBySearch])

  const fetchData = async (cancelToken) => {
    setLoading(true)
    try {
      const { data } = await getAllRestaurantsRequest({
        params,
        cancelToken,
      })
      if (!data.items || data.items.length === 0) {
        setRestaurants([])
        showNotification("Рестораны не найдены", "info")
      } else {
        const filteredItems = data.items.map(({ role, ...rest }) => rest)
        if (!isArraysEqualDeep(restaurants, filteredItems)) {
          setRestaurants(filteredItems)
        }
      }
      const newTotalPage = Math.ceil(data?.totalItems / params.limit) || 0
      setTotalPage(newTotalPage)
    } catch (err) {
      if (axios.isCancel(err)) {
        showNotification("Запрос был отменен", "warning")
      } else {
        showNotification(err.toString(), "error")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = useCallback((category) => {}, [])

  const handlePageChange = (index) => {
    if (isResultBySearch) {
      setSearchParams((prev) => ({ ...prev, pageIndex: index }))
    } else {
      setParams((prev) => ({ ...prev, pageIndex: index }))
    }
  }

  const getSearchResults = (data) => {
    if (data?.items?.length > 0) {
      setIsResultBySearch(true)
      setRestaurants(data.items)
      setSearchTotalPage(Math.ceil(data.totalItems / params.limit))
    } else if (data?.error) {
      setRestaurants([])
      setSearchTotalPage(0)
      return
    } else {
      setIsResultBySearch(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-[90px] max-lg:gap-[30px]">
        <div className="flex justify-center">
          <Search
            getSearchResults={getSearchResults}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <div className="px-[100px] max-md:px-0">
          <SortByCategoryContainer
            categories={sortList}
            getCategory={handleCategoryChange}
          />
        </div>
        {restaurants?.length > 0 ? (
          <div className="grid grid-cols-3 gap-[24px] max-md:grid-cols-2 ">
            {restaurants.map((restaurant) => (
              <div className="flex justify-center">
                <RestaurantItemCard key={restaurant.id} data={restaurant} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Рестораны не найдены</p>
        )}
        <Pagination
          totalPage={isResultBySearch ? searchTotalPage : totalPage}
          getCurrentPage={handlePageChange}
        />
      </div>
    </>
  )
}

export default Restaurants
