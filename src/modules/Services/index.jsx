import { Route, Routes } from "react-router-dom"
import ServicesPage from "./pages/ServicesPage"

import { ROUTERS } from "@router/Router.config"

const Services = () => {
  return (
    <Routes>
      <Route
        path={ROUTERS.RestaurantServices.services}
        element={<ServicesPage />}
      />
    </Routes>
  )
}

export default Services
