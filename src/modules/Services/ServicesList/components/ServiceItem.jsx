import React from "react"
import ContextMenu from "@components/ContextMenu/ContextMenu"
import { MoreVerticalIcon } from "@ui/icons/icons"
import { useContextMenu } from "@hooks"

const ServiceItem = ({ service, deleteService, index }) => {
  const { openedContextMenuIndex, handleContextMenu } = useContextMenu(index)

  const getContextMenuItems = (id) => {
    return [
      {
        action: "Удалить",
        onClick: () => deleteService(id),
      },
    ]
  }

  return (
    <div className="relative flex justify-between items-center w-full px-[20px] py-[10px] rounded-lg bg-white">
      <p>{service.name}</p>
      <div className="relative context-menu-wrapper max-md:text-[16px]">
        <MoreVerticalIcon
          className="cursor-pointer"
          onClick={handleContextMenu}
        />
        {openedContextMenuIndex === index && (
          <ContextMenu menuActions={getContextMenuItems(service.id)} />
        )}
      </div>
    </div>
  )
}

export default ServiceItem
