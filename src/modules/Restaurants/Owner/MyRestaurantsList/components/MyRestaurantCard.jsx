import { Link } from "react-router-dom"

import { ROUTERS } from "@router/Router.config"

import { useContextMenu } from "@hooks"
import { removeWildcard } from "@helpers"

import ContextMenu from "@components/ContextMenu/ContextMenu"
import { MoreHorizontalIcon } from "@ui/icons/icons"

const getContextMenuItems = (id) => {
  return [
    {
      action: "Удалить",
      onClick: () => {},
    },
    {
      action: "Изменить",
      to: `${removeWildcard(
        ROUTERS.Restaurant.root
      )}${ROUTERS.Restaurant.updateRestaurant.replace(":restaurantId", id)}`,
    },
    {
      action: "История заказов",
      to: `${removeWildcard(
        ROUTERS.Orders.root
      )}${ROUTERS.Orders.restaurantOrdersHistory.replace(":restaurantId", id)}`,
    },
  ]
}

const MyRestaurantCard = ({ data = [], displayType, index }) => {
  const { openedContextMenuIndex, handleContextMenu } = useContextMenu(index)

  return (
    <div
      className={`relative flex flex-col w-full p-[20px] font-poppins shadow-[0px_4px_4px_rgba(0,0,0,.25)] rounded-[20px] bg-white ${
        displayType === "grid" ? "min-h-[300px] " : ""
      }`}
    >
      <div className="context-menu-wrapper absolute top-[30px] right-[20px] text-center">
        <MoreHorizontalIcon
          className="text-[26px] text-[#C4C4C4] cursor-pointer"
          onClick={() => handleContextMenu()}
        />
        {openedContextMenuIndex === index && (
          <ContextMenu
            menuActions={getContextMenuItems(data.id)}
            position={"top-full right-1/2"}
          />
        )}
      </div>
      <div className="flex gap-[20px]">
        <div className="w-[100px] h-[100px] border rounded-[20px] overflow-hidden">
          {data?.icon && (
            <img src={data.icon.route} alt="" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="mt-[10px]">
          <h3 className="text-[24px] font-[700] leading-[36px]">{data.name}</h3>
          <div className="flex gap-[10px] mt-[5px] text-[13px] leading-[19.5px] font-[700]">
            <Link
              to={`${removeWildcard(
                ROUTERS.RestaurantTable.root.replace(":restaurantId", data.id)
              )}${ROUTERS.RestaurantTable.myRestaurantTables}`}
              className="w-[80px] h-[20px]  text-center rounded-[5px] text-[#6AA7FC] bg-[#f2f1fa]"
            >
              Столик
            </Link>
            <Link
              to={`${removeWildcard(
                ROUTERS.RestaurantMenu.root.replace(":restaurantId", data.id)
              )}${ROUTERS.RestaurantMenu.myRestaurantMenu}`}
              className="w-[80px] h-[20px]  text-center rounded-[5px] text-[#FF007A] bg-[#f2f1fa]"
            >
              Меню
            </Link>
          </div>
        </div>
      </div>
      <p className="font-[700] text-[13px] text-[#c4c4c4] leading-[19.5px] my-[10px]">
        {data.description}
      </p>
      <div className="flex justify-between mt-auto px-[20px] pt-[20px] border-t-2 border-black border-dashed">
        <div className="font-[700] text-[13px] leading-[19.5px]">
          <h4>{data.rate ? data.rate : 0} / 10</h4>
          <h4 className="text-[#A5A5A5]">Рейтинг</h4>
        </div>
        <div className="font-[700] text-[13px] leading-[19.5px]">
          <h4>{Math.floor(Math.random() * 101) + 200} / день</h4>
          <h4 className="text-[#A5A5A5]">Посещаемость</h4>
        </div>
      </div>
    </div>
  )
}

export default MyRestaurantCard
