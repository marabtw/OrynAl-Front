import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

import { ROUTERS } from "@router/Router.config"
import { signinRequest, signupRequest } from "@modules/Authorization/api"
import { refreshTokenRequest } from "@modules/Authorization/api"
import { getProfileRequest } from "@modules/Profile/api"

import { removeWildcard } from "@helpers/index"
import { useToast } from "@hooks"

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const showNotification = useToast()
  const [user, setUser] = useState({})
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get("accessToken")
      const refreshToken = Cookies.get("refreshToken")

      if (accessToken) {
        const decodedToken = jwtDecode(accessToken)
        if (isTokenExpired(decodedToken)) {
          await refreshTokens(refreshToken)
        } else {
          updateUser(decodedToken)
        }
      } else if (refreshToken) {
        await refreshTokens(refreshToken)
      } else {
        setUser({ role: "guest" })
      }
    }

    checkAuth()
  }, [])

  const refreshTokens = async (refreshToken) => {
    try {
      const response = await refreshTokenRequest({ refreshToken })
      const newAccessToken = response.data.accessToken
      const newRefreshToken = response.data.refreshToken
      Cookies.set("accessToken", newAccessToken, {
        SameSite: "None",
        Secure: true,
      })
      Cookies.set("refreshToken", newRefreshToken, {
        SameSite: "None",
        Secure: true,
      })
      const newDecodedToken = jwtDecode(newAccessToken)
      updateUser(newDecodedToken)
    } catch (err) {
      setUser({ role: "guest" })
      setIsAuthed(false)
      showNotification(
        "Не удалось обновить токен. Пожалуйста, войдите снова.",
        "error"
      )
    }
  }

  const updateUser = async (decodedToken) => {
    try {
      const { data } = await getProfileRequest()
      setUser({
        ...decodedToken,
        name: data?.name || "",
        surname: data?.surname || "",
      })
      setIsAuthed(true)
    } catch (err) {
      setIsAuthed(false)
      showNotification("Не удалось загрузить профиль.", "error")
    }
  }

  const deleteUser = () => {
    Cookies.remove("accessToken", { SameSite: "None", Secure: true })
    Cookies.remove("refreshToken", { SameSite: "None", Secure: true })
    sessionStorage.removeItem("isNotFirstVisit")
    setUser({ role: "guest" })
    setIsAuthed(false)
    navigate(ROUTERS.Home)
  }

  const isTokenExpired = (decodedToken) => {
    const currentTime = Math.floor(Date.now() / 1000)
    return decodedToken.exp < currentTime
  }

  const signin = async ({ email, password }) => {
    try {
      const { data } = (await signinRequest(email, password)).data
      Cookies.set("accessToken", data.access_token, {
        SameSite: "None",
        Secure: true,
      })
      Cookies.set("refreshToken", data.refresh_token, {
        SameSite: "None",
        Secure: true,
      })
      const newDecodedToken = jwtDecode(data.access_token)
      updateUser(newDecodedToken)
      if (newDecodedToken.role === "admin") {
        navigate(
          `${removeWildcard(ROUTERS.Management.root)}${
            ROUTERS.Management.allRestaurants
          }`
        )
      } else if (newDecodedToken.role === "owner") {
        navigate(
          `${removeWildcard(ROUTERS.Restaurant.root)}${
            ROUTERS.Restaurant.myRestaurants
          }`
        )
      } else {
        navigate(`${ROUTERS.Home}`)
      }
      showNotification("Авторизвация прошла успешно", "success")
    } catch (err) {
      showNotification("Не удалось войти. Ошибка: ",err.toString(), "error")
    }
  }

  const signup = async ({ name, surname, email, phone, password }) => {
    try {
      const { status } = await signupRequest(
        name,
        surname,
        email,
        phone,
        password
      )
      if (status === 201) {
        signin({ email, password })
      }
    } catch (err) {
      showNotification("Не удалось зарегистрировать. Ошибка: ",err.toString(), "error")
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthed, deleteUser, signin, signup }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
