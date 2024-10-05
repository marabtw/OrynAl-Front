import { useState } from "react"
import { Link } from "react-router-dom"
import { ROUTERS } from "@router/Router.config"
import { removeWildcard } from "@helpers"

import ProfileMenuDropdown from "../components/ProfileMenuDropdown"
import MobileMenuNavigation from "../components/MobileMenuNavigation"
import Logo from "@assets/images/logo.png"
import {
  MenuIcon,
  ProfileMenuIcon,
  HistoryIconForHeader,
  HomeIcon,
} from "@ui/icons/icons"

const mobileMenuItems = [
  {
    label: "Home",
    icon: <HomeIcon />,
    to: ROUTERS.Home,
  },
  {
    label: "История заказов",
    icon: <HistoryIconForHeader />,
    to: `${ROUTERS.Orders.root.replace("/*", "")}${
      ROUTERS.Orders.ordersHistory
    }`,
  },
]

const UserHeader = ({ user }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <header
      className={`relative w-full h-full flex justify-between items-center 
			font-poppins text-[20px] leading-[30px] 
			max-lg:text-[16px] max-lg:leading-[20px]`}
    >
      <MenuIcon
        className="text-[25px] cursor-pointer hover:scale-105 md:hidden"
        onClick={() => setIsMobileNavOpen(true)}
      />
      <div className="flex items-center gap-[36px] max-xl:gap-[25px]">
        <Link to={ROUTERS.Home} className="h-full max-md:hidden">
          <img
            src={Logo}
            alt="logo"
            className="bg-[#4476fb] h-[42px] rounded-full cursor-pointer"
          />
        </Link>
        <h2 className="font-semibold  max-sm:hidden">
          OrynBar - Сервис онлайн-заказов
        </h2>
      </div>
      <ul className="flex items-center gap-[36px] min-w-min font-[600] font-poppins">
        <li className="cursor-pointer max-md:hidden">
          <Link
            to={`${removeWildcard(ROUTERS.Orders.root)}${
              ROUTERS.Orders.ordersHistory
            }`}
          >
            Мои заказы
          </Link>
        </li>
        {user?.role === "guest" ? (
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
              <ProfileMenuDropdown
                opened={isProfileMenuOpen}
                close={() => setIsProfileMenuOpen(false)}
              />
            )}
          </div>
        )}
      </ul>
      {isMobileNavOpen && (
        <MobileMenuNavigation
          items={mobileMenuItems}
          closeMobileNav={() => setIsMobileNavOpen(false)}
        />
      )}
    </header>
  )
}

export default UserHeader
