import React, { useContext } from "react"
import { AuthContext } from "@context/AuthContext"
import UserHeader from "./User/UserHeader"
import OwnerHeader from "./Owner/OwnerHeader"
import AdminHeader from "./Admin/AdminHeader"

import { useHeaderHeight } from "@hooks"

const Header = () => {
  const { user } = useContext(AuthContext)
  const headerHeight = useHeaderHeight()

  const checkUserRole = () => {
    switch (user.role) {
      case "user":
        return <UserHeader user={user} />
      case "owner":
        return <OwnerHeader user={user} />
      case "admin":
        return <AdminHeader user={user} />
      default:
        return <UserHeader user={user} />
    }
  }

  return (
    <div
      className={`sticky top-0 w-full z-[55]
			px-[50px]
			${
        user.role === "guest" || user.role === "user"
          ? "rounded-bl-[50px] rounded-br-[50px]  shadow-[0px_4px_10px_rgba(0,0,0,.25)] "
          : ""
      }
			bg-white 
			transition-all duration-300
			max-md:px-[4%] max-lg:rounded-bl-[25px] max-lg:rounded-br-[25px]`}
      style={{
        height: `${headerHeight}px`,
      }}
    >
      {checkUserRole()}
    </div>
  )
}

export default React.memo(Header)
