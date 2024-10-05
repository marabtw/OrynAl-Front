import { Route, Routes } from "react-router-dom"
import { ROUTERS } from "@router/Router.config"

import CreateTablePage from "./pages/CreateTablePage"
import MyRestaurantTablesPage from "./pages/MyRestaurantTablesPage"
import UpdateTablePage from "./pages/UpdateTablePage"

const RestaurantTable = () => {
  return (
    <Routes>
      <Route
        path={ROUTERS.RestaurantTable.createTable}
        element={<CreateTablePage/>}
      />
      <Route
        path={ROUTERS.RestaurantTable.myRestaurantTables}
        element={<MyRestaurantTablesPage/>}
      />
      <Route
        path={ROUTERS.RestaurantTable.updateTable}
        element={<UpdateTablePage/>}
      />
    </Routes>
  )
}

export default RestaurantTable
