import { Route, Routes } from "react-router-dom"
import { ROUTERS } from "@router/Router.config"

import CreateMenuPage from "./pages/CreateMenuPage"
import MyRestaurantMenuPage from "./pages/MyRestaurantMenuPage"
import UpdateMenuPage from "./pages/UpdateMenuPage"

const RestaurantMenu = () => {
  return (
    <Routes>
      <Route
        path={ROUTERS.RestaurantMenu.myRestaurantMenu}
        element={<MyRestaurantMenuPage/>}
      />
      <Route
        path={ROUTERS.RestaurantMenu.createFood}
        element={<CreateMenuPage/>}
      />
      <Route
        path={ROUTERS.RestaurantMenu.updateFood}
        element={<UpdateMenuPage/>}
      />
    </Routes>
  )
}

export default RestaurantMenu
