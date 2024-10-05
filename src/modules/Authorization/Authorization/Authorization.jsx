import { useState, useContext, useMemo, useEffect } from "react"
import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

import { AuthContext } from "@context/AuthContext"

import Login from "./components/LoginForm"
import Register from "./components/RegisterForm"

import logo from "@assets/images/logo.png"
import LoginPageLogo from "@assets/svg/LoginPageLogo.svg"
import artRed from "@assets/svg/LoginPageArtRed.svg"
import artLightBlue from "@assets/svg/LoginPageArtLightBlue.svg"
import artBlue from "@assets/svg/LoginPageArtBlue.svg"

const Authorization = () => {
  const { user } = useContext(AuthContext)
  const [authType, setAuthType] = useState("login")

  const redirectPath = useMemo(() => {
    switch (user.role) {
      case "user":
        return "/"
      case "company":
        return "/my-restaurants"
      case "admin":
        return "/restaurants"
      default:
        return "/"
    }
  }, [user.role])

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("isFirstVisit")
    })
		
    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.removeItem("isFirstVisit")
      })
    }
  }, [])

  return (
    <>
      <div className="flex w-[100vw] h-[100vh]">
        <div className="relative flex justify-center h-full max-w-[646px] bg-[#447bfb] z-50 max-lg:hidden">
          <Link
            to={redirectPath}
            className="flex flex-col items-center h-max text-center mt-[20%] mx-[15%] text-white"
          >
            <img src={logo} alt="" className="w-1/2" />
            <h2 className="text-[50px] leading-[75px] font-[700]">OrynBar</h2>
            <p className="text-[20px] leading-[30px] font-[30px]">
              Платформа для онлайн-заказа и бронирования столиков в ресторанах
            </p>
          </Link>
          <img
            src={LoginPageLogo}
            className="absolute bottom-0 left-1/2 translate-x-[-50%]"
          />
        </div>
        <div className="relative flex justify-center items-center w-full max-md:items-start">
          <img src={artRed} alt="" className="absolute right-0 top-0" />
          <img
            src={artLightBlue}
            alt=""
            className="absolute bottom-0 left-0 translate-x-[-60%] max-md:hidden"
          />
          <img
            src={artBlue}
            alt=""
            className="absolute bottom-0 right-0 max-md:hidden"
          />
          <div className="z-50 max-md:px-[20px]">
            {authType === "login" ? (
              <Login changeAuth={() => setAuthType("register")} />
            ) : (
              <Register changeAuth={() => setAuthType("login")} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Authorization
