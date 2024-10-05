import { useContext, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"

import { AuthContext } from "@context/AuthContext"
import { ROUTERS } from "./Router.config"

import { removeWildcard } from "@helpers"

import Home from "@modules/Home"
import Profile from "@modules/Profile"
import Authorization from "@modules/Authorization"
import Management from "@modules/Management"
import Restaurants from "@modules/Restaurants"
import RestaurantTable from "@modules/Tables"
import RestaurantMenu from "@modules/Menu"
import Order from "@modules/Order"
import Services from "@modules/Services"

const Router = () => {
  const { user, isAuthed } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const isFirstVisit = sessionStorage.getItem("isNotFirstVisit") === "true"
    if (!isFirstVisit && user.role && user.role !== "guest") {
      sessionStorage.setItem("isNotFirstVisit", "true")
      navigate(getInitialRoute(user.role))
    }
  }, [user.role])

  const getInitialRoute = (role) => {
    if (role === "admin") {
      return `${removeWildcard(ROUTERS.Management.root)}${
        ROUTERS.Management.allRestaurants
      }`
    } else if (role === "owner") {
      return `${removeWildcard(ROUTERS.Restaurant.root)}${
        ROUTERS.Restaurant.myRestaurants
      }`
    } else {
      return ROUTERS.Home
    }
  }

  return (
    <Routes>
      <Route path={ROUTERS.Home} element={<Home />} />
      <Route path={ROUTERS.Profile.root} element={<Profile />} />
      <Route path={ROUTERS.Authorization.root} element={<Authorization />} />
      <Route path={ROUTERS.Management.root} element={<Management />} />
      <Route path={ROUTERS.RestaurantServices.root} element={<Services />} />
      <Route path={ROUTERS.Restaurant.root} element={<Restaurants />} />
      <Route
        path={ROUTERS.RestaurantTable.root}
        element={<RestaurantTable />}
      />
      <Route path={ROUTERS.RestaurantMenu.root} element={<RestaurantMenu />} />
      <Route path={ROUTERS.Orders.root} element={<Order />} />
      <Route
        path="*"
        element={
          <h2 className="flex justify-center items-center">Ресурс не найден</h2>
        }
      />
    </Routes>
  )
}

export default Router
