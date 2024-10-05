import { Route, Routes } from "react-router-dom"
import { ROUTERS } from "@router/Router.config"
import MyProfilePage from "./pages/MyProfilePage"

const Profile = () => {
  return (
    <Routes>
      <Route path={ROUTERS.Profile.myProfile} element={<MyProfilePage/>} />
    </Routes>
  )
}

export default Profile
