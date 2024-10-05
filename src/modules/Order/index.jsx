import { Route, Routes } from "react-router-dom"
import { ROUTERS } from "@router/Router.config"

import CreateOrderPage from "./pages/CreateOrderPage"
import OrderDetailPage from "./pages/OrderDetailPage"
import OrdersHistoryPage from "./pages/OrdersHistoryPage"

const Order = () => {
  return (
    <Routes>
      <Route path={ROUTERS.Orders.createOrder} element={<CreateOrderPage/>} />
      <Route path={ROUTERS.Orders.orderDetail} element={<OrderDetailPage/>} />
      <Route path={ROUTERS.Orders.ordersHistory} element={<OrdersHistoryPage/>} />
      <Route path={ROUTERS.Orders.restaurantOrdersHistory} element={<OrdersHistoryPage/>} />
    </Routes>
  )
}

export default Order