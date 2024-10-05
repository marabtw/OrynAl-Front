import { useContext, useState, useEffect } from "react"
import ContextMenu from "@components/ContextMenu/ContextMenu"
import { MoreVerticalIcon } from "@ui/icons/icons"
import { removeWildcard } from "@helpers/index"
import { ROUTERS } from "@router/Router.config"
import { AuthContext } from "@context/AuthContext"
import { useContextMenu } from "@hooks"
import { formatTimeString } from "@utils/index"

const OrdersHistoryList = ({ order, index, handleUpdateOrder }) => {
  const [mappedOrder, setMappedOrdeer] = useState({})

  useEffect(() => {
    const { id, restaurant, date, status } = order
    setMappedOrdeer({
      id,
      restaurant: { name: restaurant.name, icon: restaurant.icon },
      address: restaurant.address,
      date: formatTimeString(date),
      status,
    })
  }, [order])

  const {
    openedContextMenuIndex,
    handleContextMenu,
    closeContextMenuFunction,
  } = useContextMenu(index)
  const { user } = useContext(AuthContext)

  const getContextMenuActions = (id) => [
    {
      action: "Посмотреть",
      to: `${removeWildcard(
        ROUTERS.Orders.root
      )}${ROUTERS.Orders.orderDetail.replace(":orderId", id)}`,
    },
    mappedOrder.status === "reserved" && {
      action: "Отменить",
      onClick: () => handleUpdateOrder(order, "canceled"),
    },
    user.role === "owner" &&
      mappedOrder.status !== "completed" &&
      mappedOrder.status !== "canceled" && {
        action: "Завершить",
        onClick: () => handleUpdateOrder(order, "completed"),
      },
  ]

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

  const renderContextMenu = (id) => {
    return (
      <div className="relative context-menu-wrapper max-md:text-[16px]">
        <MoreVerticalIcon
          className="cursor-pointer"
          onClick={handleContextMenu}
        />
        {openedContextMenuIndex === index && (
          <ContextMenu menuActions={getContextMenuActions(id)} />
        )}
      </div>
    )
  }

  return (
    <div>
      <li className="grid grid-cols-[.5fr_repeat(4,1fr)_.4fr] items-center w-full px-[20px] py-[15px] font-poppins bg-white rounded-[10px] max-md:hidden">
        <h5 className="">{mappedOrder?.id}</h5>
        <div className="flex justify-center items-center gap-[10px]">
          <img
            src={mappedOrder?.restaurant?.icon?.route}
            alt=""
            className="w-[50px]"
          />
          <h5>{mappedOrder?.restaurant?.name}</h5>
        </div>
        <h5 className="text-center">{mappedOrder?.address}</h5>
        <h5 className="text-center">{mappedOrder?.date}</h5>
        <div className="flex items-center justify-center">
          {getStatus(mappedOrder?.status)}
        </div>
        <div className="relative flex justify-center">
          <div className="relative">{renderContextMenu(mappedOrder?.id)}</div>
        </div>
      </li>
      <li className="md:hidden relative flex flex-col gap-2 p-[10px] py-[20px] rounded-[10px] bg-white overflow-hidden max-sm:text-[14px]">
        <div className="flex">
          <h4 className="flex">{mappedOrder?.id}</h4>
          <div className="absolute right-[10px] top-[20px]">
            {renderContextMenu(mappedOrder?.id)}
          </div>
        </div>
        <div className="grid grid-cols-[.5fr_1fr] gap-1">
          <h4>Фото</h4>
          {mappedOrder?.icon?.route && (
            <img
              src={mappedOrder.icon.route}
              className="w-[38px] aspect-square rounded-full"
            />
          )}
        </div>
        <div className="grid grid-cols-[.5fr_1fr] gap-1">
          <h4>Название</h4>
          <h4 className="flex">{mappedOrder?.name}</h4>
        </div>
        <div className="grid grid-cols-[.5fr_1fr] gap-1">
          <h4>Адрес</h4>
          <h4 className="flex  ">{mappedOrder?.address}</h4>
        </div>
        <div className="grid grid-cols-[.5fr_1fr] gap-1">
          <h4>Дата</h4>
          <h4 className="flex">{mappedOrder?.date}</h4>
        </div>
        <div className="grid grid-cols-[.5fr_1fr] gap-1">
          <h4>Статус</h4>
          <h4 className="flex">{getStatus(mappedOrder?.status)}</h4>
        </div>
        <div className="grid grid-cols-[.5fr_1fr] gap-1">
          <h4>В наличии</h4>
          <h4 className="flex">{mappedOrder?.available ? "Да" : "Нет"}</h4>
        </div>
      </li>
    </div>
  )
}

export default OrdersHistoryList

const getStatus = (status) => (
  <div className="flex items-center gap-[10px] w-[50%] min-w-max">
    {(() => {
      switch (status) {
        case "reserved":
          return (
            <>
              <div className="w-[12px] h-[12px] bg-[#31A24C] rounded-full"></div>
              <h5>Забронирован</h5>
            </>
          )
        case "canceled":
          return (
            <>
              <div className="w-[12px] h-[12px] bg-[#FF0000] rounded-full"></div>
              <h5>Отменен</h5>
            </>
          )
        case "completed":
          return (
            <>
              <div className="w-[12px] h-[12px] bg-[#070707] rounded-full"></div>
              <h5>Завершен</h5>
            </>
          )
        default:
          return null
      }
    })()}
  </div>
)
