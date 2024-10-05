import { useContext } from "react"
import { Link } from "react-router-dom"
import { UIContext } from "src/shared/context/UIContext"

const ContextMenu = ({ menuActions = [], position }) => {
  const { setOpenedContextMenuIndex } = useContext(UIContext)
  const closeContextMenuFunction = () => {
    setOpenedContextMenuIndex(null)
  }

  return (
    <div
      className={`absolute ${
        position ? position : "top-full right-full"
      }  flex flex-col justify-center items-center gap-[5px] 
			min-w-max p-[10px] z-50 max-md:py-[5px]
			border-2 border-[#ebebeb] rounded-[5px] 
			bg-white 
			 max-md:text-[14px]`}
    >
      {menuActions.map((action) => {
        if (action.hasOwnProperty("to")) {
          return (
            <Link
              key={action.action + `${Math.random() * 99999999}`}
              to={action.to}
              className="hover:text-[#FF0000] w-full h-full "
              onClick={() => closeContextMenuFunction()}
            >
              {action.action}
            </Link>
          )
        }
        if (action.hasOwnProperty("onClick")) {
          return (
            <h4
              key={action.action + `${Math.random() * 99999999}`}
              className="hover:text-[#FF0000] cursor-pointer w-full h-full"
              onClick={() => {
                action.onClick()
                closeContextMenuFunction()
              }}
            >
              {action.action}
            </h4>
          )
        }
      })}
    </div>
  )
}

export default ContextMenu
