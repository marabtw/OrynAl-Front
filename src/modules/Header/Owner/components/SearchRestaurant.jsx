import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { axios } from "@lib/axios"

import { ROUTERS } from "@router/Router.config"
import { searchByOwnerRestaurants } from "../../api"

import { useToast } from "@hooks"
import { removeWildcard } from "@helpers"

import { SearchIcon } from "@ui/icons/icons"

const SearchRestaurant = () => {
  const navigate = useNavigate()
  const showNotification = useToast()

  const [searchQuery, setSearchQuery] = useState("")
  const [options, setOptions] = useState([])

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()

    if (searchQuery?.length >= 2) {
      searchByOwnerRestaurants({
        searchQuery,
        cancelToken: cancelTokenSource.token,
      })
        .then(({ data }) => {
          setOptions(
            data.items?.map((restaurant) => ({
              label: restaurant.name,
              value: restaurant.id,
            }))
          )
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            // showNotification(err.toString(), "error")
          }
          if (options?.length > 0) setOptions([])
        })
    } else {
      setOptions([])
    }

    return () => {
      cancelTokenSource.cancel()
    }
  }, [searchQuery])

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "100%",
    }),
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      border: "2px solid #c4c4c4",
      borderRadius: "20px",
      padding: "3px 5px 3px 30px",
      cursor: "text",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#4277FB",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4277FB" : "transparent",
      color: state.isSelected ? "#fff" : "#333",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#4277FB",
        color: "#fff",
      },
    }),
    indicatorSeparator: (provided, state) => ({ display: "none" }),
    dropdownIndicator: (provided, state) => ({ display: "none" }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#c4c4c4",
    }),
  }

  return (
    <div className="relative w-[323px] h-full font-ttcommon font-[500] text-[15px] leading-[17.5px] max-md:w-[250px] max-sm:w-[180px]">
      <SearchIcon className="absolute top-[50%] left-[18px] text-[14px] text-[#c4c4c4] translate-y-[-50%] z-30 pointer-events-none" />
      <Select
        options={options}
        styles={customStyles}
        placeholder={`${"Поиск ресторана"}`}
        value={null}
        onChange={(e) => {
          navigate(
            `${removeWildcard(
              ROUTERS.Restaurant.root
            )}${ROUTERS.Restaurant.updateRestaurant.replace(
              ":restaurantId",
              e.value
            )}`
          )
          setSearchQuery("")
          // setOptions([])
        }}
        onInputChange={(e) => {
          setSearchQuery(e)
        }}
      />
    </div>
  )
}

export default SearchRestaurant
