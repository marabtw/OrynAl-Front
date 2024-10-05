import { useState } from "react"
import { Link } from "react-router-dom"

import { ROUTERS } from "@router/Router.config"
import { removeWildcard } from "@helpers"

import Logo from "@assets/images/logo.png"
import {
  ProfileMenuIcon,
  MenuIcon,
  OwnersIconForHeader,
  RestaurantsIconForHeader,
  ClientsIconForHeader,
} from "@ui/icons/icons"

import ProfileMenuDropdown from "../components/ProfileMenuDropdown"
import MobileMenuNavigation from "../components/MobileMenuNavigation"

const mobileMenuItems = [
  {
    label: "Рестораны",
    icon: <RestaurantsIconForHeader />,
    to: `${removeWildcard(ROUTERS.Management.root)}${
      ROUTERS.Management.allRestaurants
    }`,
  },
  {
    label: "Владельцы",
    icon: <OwnersIconForHeader />,
    to: `${removeWildcard(ROUTERS.Management.root)}${
      ROUTERS.Management.owners
    }`,
  },
  {
    label: "Клиенты",
    icon: <ClientsIconForHeader />,
    to: `${removeWildcard(ROUTERS.Management.root)}${
      ROUTERS.Management.clients
    }`,
  },
]
const AdminHeader = ({ user }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [selectedNavItem, setSelectedNavItem] = useState("Рестораны")

  return (
    <header
      className={`relative w-full h-full flex justify-between items-center`}
    >
      <MenuIcon
        className="text-[20px] cursor-pointer md:hidden"
        onClick={() => setIsMobileNavOpen(true)}
      />
      <div className="h-[25%] flex gap-[36px] items-center font-[400] text-[20px] leading-[23px]">
        <Link
          to={`${removeWildcard(ROUTERS.Management.root)}${
            ROUTERS.Management.allRestaurants
          }`}
          className="h-full max-md:absolute max-md:left-1/2 max-md:translate-x-[-50%] max-md:h-1/2"
        >
          <img
            src={Logo}
            alt="logo"
            className="bg-slate-500 h-full rounded-full cursor-pointer"
          />
        </Link>
        <Link
          to={`${removeWildcard(ROUTERS.Management.root)}${
            ROUTERS.Management.allRestaurants
          }`}
          onClick={() => setSelectedNavItem("Рестораны")}
          className={`max-md:hidden transition-all duration-200 font-[400] ${
            selectedNavItem === "Рестораны"
              ? "relative font-[600] after:absolute after:w-[28%] after:h-[5px] after:top-full after:left-0 after:bg-customBLue after:rounded-full"
              : ""
          }`}
        >
          Рестораны
        </Link>
        <Link
          to={`${removeWildcard(ROUTERS.Management.root)}${
            ROUTERS.Management.owners
          }`}
          onClick={() => setSelectedNavItem("Владельцы")}
          className={`max-md:hidden transition-all duration-200 ${
            selectedNavItem === "Владельцы"
              ? "relative font-[600] after:absolute after:w-[28%] after:h-[5px] after:top-full after:left-0 after:bg-customBLue after:rounded-full"
              : ""
          }`}
        >
          Владельцы
        </Link>
        <Link
          to={`${removeWildcard(ROUTERS.Management.root)}${
            ROUTERS.Management.clients
          }`}
          onClick={() => setSelectedNavItem("Клиенты")}
          className={`max-md:hidden transition-all duration-200 ${
            selectedNavItem === "Клиенты"
              ? "relative font-[600] after:absolute after:w-[28%] after:h-[5px] after:top-full after:left-0 after:bg-customBLue after:rounded-full"
              : ""
          }`}
        >
          Клиенты
        </Link>
        <Link
          to={`${removeWildcard(ROUTERS.RestaurantServices.root)}${
            ROUTERS.RestaurantServices.services
          }`}
          onClick={() => setSelectedNavItem("Сервисы")}
          className={`max-md:hidden transition-all duration-200 ${
            selectedNavItem === "Сервисы"
              ? "relative font-[600] after:absolute after:w-[28%] after:h-[5px] after:top-full after:left-0 after:bg-customBLue after:rounded-full"
              : ""
          }`}
        >
          Сервисы
        </Link>
      </div>
      {user ? (
        <div className="profile-menu-dropdown relative flex items-center">
          <ProfileMenuIcon
            className="text-[38px] hover:scale-105 transition-all max-md:text-[30px] cursor-pointer"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          />
          {isProfileMenuOpen && (
            <ProfileMenuDropdown close={() => setIsProfileMenuOpen(false)} />
          )}
        </div>
      ) : (
        <Link
          className="relative flex items-center cursor-pointer"
          to={`${removeWildcard(ROUTERS.Authorization.root)}${
            ROUTERS.Authorization.login
          }`}
        >
          <ProfileMenuIcon className="text-[30px]" />
        </Link>
      )}
      {isMobileNavOpen && (
        <MobileMenuNavigation
          items={mobileMenuItems}
          closeMobileNav={() => setIsMobileNavOpen(false)}
        />
      )}
    </header>
  )
}

export default AdminHeader
