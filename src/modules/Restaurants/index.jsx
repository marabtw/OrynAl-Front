import { Route, Routes } from "react-router-dom"
import { ROUTERS } from "@router/Router.config"

import MyRestaurantsPage from "./pages/MyRestaurantsPage"
import UpdateRestaurantPage from "./pages/UpdateRestaurantPage"

const Restaurants = () => {
  return (
    <Routes>
      <Route
        path={ROUTERS.Restaurant.myRestaurants}
        element={<MyRestaurantsPage/>}
      />
      <Route
        path={ROUTERS.Restaurant.updateRestaurant}
        element={<UpdateRestaurantPage/>}
      />
    </Routes>
  )
}

export default Restaurants
