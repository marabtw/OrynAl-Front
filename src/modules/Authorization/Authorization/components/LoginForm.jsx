import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

import { ROUTERS } from "@router/Router.config"
import { signinRequest } from "../../api"
import { AuthContext } from "@context/AuthContext"

import { isValidEmail, removeWildcard } from "@helpers"

import AuthorizationFormsInput from "./AuthorizationFormsInput"
import Button from "@ui/Button/Button"

const Login = ({ changeAuth }) => {
  const { signin } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const isValid = () => {
    return isValidEmail(email) && password
  }

  const handleSignin = async (e) => {
    e.preventDefault()
    if (!isValid()) {
      return
    }
    signin({ email, password })
  }

  return (
    <div className="">
      <h2 className="mb-[20px] text-center text-[50px] left-[75px] font-[700]">
        Рады видеть вас снова!
      </h2>
      <form className="flex flex-col gap-[20px]">
        <AuthorizationFormsInput
          type="email"
          label="Ваша почта"
          placeholder="orynbar@gmail.com"
          required={true}
          onChange={(value) => setEmail(value)}
        />
        <div>
          <AuthorizationFormsInput
            label="Ваш  пароль"
            placeholder="*********"
            type="password"
            required={true}
            onChange={(value) => setPassword(value)}
          />
          <h4 className="float-right cursor-pointer hover:underline">
            Забыли пароль?
          </h4>
        </div>
        <Button
          type="submit"
          text="Войти"
          gradient={true}
          spacingClass={"py-[20px]"}
          textStyles={"text-[20px] font-[700] leading-[30px]"}
          onClick={(e) => handleSignin(e)}
        />
        <h3 className="text-center text-[20px] font-[700] text-[#989898]">
          Нет аккаунта?{" "}
          <span
            className="cursor-pointer text-[#447dfb] hover:underline"
            onClick={changeAuth}
          >
            Зарегистрируйтесь
          </span>
        </h3>
      </form>
    </div>
  )
}

export default Login
