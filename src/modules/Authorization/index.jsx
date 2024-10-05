import { Route, Routes } from "react-router-dom"
import AuthorizationPage from "./pages/AuthorizationPage"
import { ROUTERS } from "@router/Router.config"

const Auth = () => {
  return (
    <Routes>
      <Route path={ROUTERS.Authorization.login} element={<AuthorizationPage />} />
    </Routes>
  )
}

export default Auth
