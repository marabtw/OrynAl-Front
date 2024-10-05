import { useState } from "react"
import { Link } from "react-router-dom"
import { ROUTERS } from "@router/Router.config"
import { removeWildcard } from "@helpers"

import {
  MenuIcon,
  ProfileMenuIcon,
  RestaurantsIconForHeader,
} from "@ui/icons/icons"
import Logo from "@assets/images/logo.png"

import ProfileMenuDropdown from "../components/ProfileMenuDropdown"
import MobileMenuNavigation from "../components/MobileMenuNavigation"
import SearchRestaurant from "./components/SearchRestaurant"

const mobileMenuItems = [
  {
    label: "Мои рестораны",
    icon: <RestaurantsIconForHeader />,
    to: `${removeWildcard(ROUTERS.Restaurant.root)}${
      ROUTERS.Restaurant.myRestaurants
    }`,
  },
]

const OwnerHeader = ({ user }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [selectedNavItem, setSelectedNavItem] = useState("Мои рестораны")

  return (
    <header
      className={`relative w-full h-full flex justify-between items-center 
			font-ttcommon text-[18px] leading-[23px] font-[400]
			max-lg:text-[16px] max-lg:leading-[20px]`}
    >
      <MenuIcon
        className="text-[25px] cursor-pointer hover:scale-105 md:hidden"
        onClick={() => setIsMobileNavOpen(true)}
      />
      <div className="flex items-center gap-[36px] max-xl:gap-[25px]">
        <Link
          to={`${removeWildcard(ROUTERS.Restaurant.root)}${
            ROUTERS.Restaurant.myRestaurants
          }`}
          className="h-full max-md:hidden"
        >
          <img
            src={Logo}
            alt="logo"
            className="bg-[#4476fb] h-[42px] rounded-full cursor-pointer"
          />
        </Link>
        <Link
          to={`${removeWildcard(ROUTERS.Restaurant.root)}${
            ROUTERS.Restaurant.myRestaurants
          }`}
          className={`max-md:hidden ${
            selectedNavItem === "Мои рестораны"
              ? "relative font-[600] after:absolute after:w-[28%] after:h-[5px] after:top-full after:left-0 after:bg-[#6AA7FC] after:rounded-full"
              : ""
          }`}
          onClick={() => setSelectedNavItem("Мои рестораны")}
        >
          Мои рестораны
        </Link>
      </div>
      <div className="flex items-center gap-[50px] max-md:gap-[25px] max-sm:gap-[15px]">
        <SearchRestaurant />
        {user?.role === "guest" || !user?.role ? (
          <Link
            className="relative flex items-center cursor-pointer"
            to={`${removeWildcard(ROUTERS.Authorization.root)}${
              ROUTERS.Authorization.login
            }`}
          >
            Войти
          </Link>
        ) : (
          <div className="profile-menu-dropdown relative flex items-center">
            <ProfileMenuIcon
              className="text-[38px] hover:scale-105 transition-all max-md:text-[30px] cursor-pointer"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            />
            {isProfileMenuOpen && (
              <ProfileMenuDropdown close={() => setIsProfileMenuOpen(false)} />
            )}
          </div>
        )}
      </div>
      {isMobileNavOpen && (
        <MobileMenuNavigation
          items={mobileMenuItems}
          closeMobileNav={() => setIsMobileNavOpen(false)}
        />
      )}
    </header>
  )
}

export default OwnerHeader
