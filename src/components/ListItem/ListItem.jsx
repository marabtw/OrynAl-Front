import { useEffect } from "react"

import { useContextMenu } from "@hooks"

import ContextMenu from "../ContextMenu/ContextMenu"
import { MoreVerticalIcon } from "@ui/icons/icons"

const ListItem = ({ elementData, menuActions, index }) => {
  const {
    openedContextMenuIndex,
    handleContextMenu,
    closeContextMenuFunction,
  } = useContextMenu(index)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openedContextMenuIndex === index &&
        !event.target.closest(".context-menu-wrapper")
      ) {
        closeContextMenuFunction()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openedContextMenuIndex])

  const renderValue = (key, value) => {
    if (key === "photo") {
      return value ? (
        <div
          className={`w-[38px] aspect-square rounded-full overflow-hidden border-none`}
        >
          <img alt="" src={value.route} className="h-full aspect-square rounded-full object-cover object-center"/>
        </div>
      ) : (
        <div className="w-[38px] aspect-square rounded-full overflow-hidden bg-slate-400"></div>
      )
    } else if (key === "restaurantStatus") {
      return statusMap[value]
    } else if (key === "foodStatus") {
      return foodStatusMap[value]
    } else {
      return <h4 className="flex">{value}</h4>
    }
  }

  // const renderMobileVersion = (key, value) => {
  //   if (key === "id") {
  //     return (
  //       <div key={key} className="flex justify-between items-center">
  //         <h4 className="flex text-[#6aa7fc] font-semibold">{value}</h4>
  //         {renderContextMenu()}
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div key={key} className="flex justify-between gap-1 items-center">
  //         <h4>{rename(key)}</h4>
  //         {key === "image" ? (
  //           <div
  //             className={`w-[38px] aspect-square rounded-full overflow-hidden ${
  //               value ? "border-none" : "border"
  //             }`}
  //           >
  //             {value && <img src={value} />}
  //           </div>
  //         ) : (
  //           <h4 className="flex">{value}</h4>
  //         )}
  //       </div>
  //     )
  //   }
  // }

  const renderContextMenu = () => {
    return (
      <div className="relative context-menu-wrapper max-md:text-[16px]">
        <MoreVerticalIcon
          className="cursor-pointer"
          onClick={handleContextMenu}
        />
        {openedContextMenuIndex === index && (
          <ContextMenu menuActions={menuActions} />
        )}
      </div>
    )
  }

  return (
    <>
      <li
        className={`grid px-[20px] py-[15px] rounded-[10px] bg-white max-md:hidden`}
        style={{
          gridTemplateColumns: `.5fr repeat(${
            Object.keys(elementData).length - 1
          }, 1fr) .4fr`,
        }}
      >
        {Object.keys(elementData)?.map((key) => (
          <div
            key={key}
            className={`flex ${
              key.toLowerCase() !== "id" ? "justify-center" : ""
            } items-center`}
          >
            {renderValue(key, elementData[key])}
          </div>
        ))}
        <div className="flex justify-center items-center">
          {renderContextMenu()}
        </div>
      </li>
      {/* <li
        className="relative flex flex-col gap-1 px-[20px] py-[10px] rounded-[10px] bg-white overflow-hidden 
			md:hidden max-md:text-[14px]"
      >
        {Object.keys(elementData)?.map((key) =>
          renderMobileVersion(key, elementData[key])
        )}
      </li> */}
    </>
  )
}

const rename = (key) => translations[key] || key

const translations = {
  name: "Имя",
  surname: "Фамилия",
  callNumber: "Телефон",
  email: "Почта",
  address: "Адрес",
  city: "Город",
  owner: "Владелец",
  status: "Статус",
  image: "Фото",
  type: "Тип",
  capacity: "Вместимость",
  description: "Описание",
  price: "Цена",
  available: "В наличии",
}

const statusMap = {
  true: "Активный",
  false: "Неактивный",
}

const foodStatusMap = {
  true: "Да",
  false: "Нет",
}


export default ListItem
