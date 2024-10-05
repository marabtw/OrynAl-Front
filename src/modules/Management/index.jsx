import { Route, Routes } from "react-router-dom"
import OwnersPage from "./pages/OwnersPage"
import CreateOwnerPage from "./pages/CreateOwnerPage"
import ClientsPage from "./pages/ClientsPage"
import CreateRestaurantPage from "./pages/CreateRestaurantPage"
import RestaurantsPage from "./pages/RestaurantsPage"
import { ROUTERS } from "@router/Router.config"

const Management = () => {
  return (
    <Routes>
      <Route path={ROUTERS.Management.owners} element={<OwnersPage />} />
      <Route
        path={ROUTERS.Management.createOwner}
        element={<CreateOwnerPage />}
      />
      <Route
        path={ROUTERS.Management.allRestaurants}
        element={<RestaurantsPage />}
      />
      <Route
        path={ROUTERS.Management.createRestaurant}
        element={<CreateRestaurantPage />}
      />
      <Route path={ROUTERS.Management.clients} element={<ClientsPage />} />
    </Routes>
  )
}

export default Management
