import { useEffect } from "react"
import { axios } from "@lib/axios"

import { searchRestaurants } from "../../api"

import { useLoading, useToast } from "@hooks"
import { SearchIcon } from "@ui/icons/icons"

const Search = ({ getSearchResults, searchParams, setSearchParams }) => {
  const setLoading = useLoading()
  const showNotification = useToast()

  useEffect(() => {
    const cancelTokenSourceSource = axios.CancelToken.source()

    if (searchParams?.q?.length >= 2) {
      // setLoading(true)
      searchRestaurants({
        searchParams,
        cancelToken: cancelTokenSourceSource.token,
      })
        .then(({ data }) => {
          getSearchResults(data)
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            // showNotification("Запрос был отменен", "warning")
            getSearchResults({
              error: true,
            })
          } else {
            showNotification(err.toString(), "error")
            getSearchResults({ error: true })
          }
        })
        .finally(() => {
          // setLoading(false)
        })
    } else {
      getSearchResults({
        limit: true,
      })
    }

    return () => {
      cancelTokenSourceSource.cancel()
    }
  }, [searchParams])

  return (
    <div className="flex flex-col w-full max-w-[1200px]">
      <div className="relative w-full h-[90px] font-poppins text-[20px] font-[500] max-xl:h-[60px] max-xl:text-[16px]">
        <input
          placeholder="Введите название ресторана..."
          className="w-full h-full px-[20px] 
					placeholder-[#447AFB]
					border-[5px] rounded-[20px] 
					outline-none
					border-[#6AA7FC] hover:border-[#4277FB]"
          onChange={(e) => {
            setSearchParams((prev) => ({ ...prev, q: e.target.value.trim() }))
          }}
        />
				<SearchIcon className="absolute right-[2%] top-1/2 translate-y-[-50%] text-[150%] pointer-events-none text-[#447AFB]"/>
      </div>
    </div>
  )
}

export default Search
