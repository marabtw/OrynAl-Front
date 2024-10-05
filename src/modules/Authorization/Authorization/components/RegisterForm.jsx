import { useState, useContext } from "react"

import { AuthContext } from "@context/AuthContext"
import { isValidEmail, isValidPhone } from "@helpers"

import AuthorizationFormsInput from "./AuthorizationFormsInput"

import Button from "@ui/Button/Button"

const Register = ({ changeAuth }) => {
  const { signup } = useContext(AuthContext)

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")

  const isFormValid = () => {
    return (
      isValidEmail(email) &&
      name &&
      isValidPhone(phone) &&
      password &&
      password === rePassword
    )
  }

  const handleSignup = async (e) => {
		e.preventDefault()
    if (!isFormValid()) {
      return
    }
    signup({ name, surname, email, phone, password })
  }

  return (
    <div className="md:px-[10px]">
      <h2 className="mb-[20px] text-center text-[50px] left-[75px] font-[700]">
        Регистрация
      </h2>
      <form className="w-full flex flex-col gap-[20px]">
        <div className="grid grid-cols-2 gap-[20px] max-md:grid-cols-1">
          <AuthorizationFormsInput
            label="Имя"
            placeholder="Баке"
            required={true}
            onChange={(value) => setName(value)}
          />
          <AuthorizationFormsInput
            label="Фамилия"
            placeholder="Сакеев"
            onChange={(value) => setSurname(value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-[20px] max-md:grid-cols-1">
          <AuthorizationFormsInput
            label="Номер телефона"
            placeholder="+7 (777) 777 77 77"
            required={true}
            onChange={(value) => setPhone(value)}
            type="tel"
          />
          <AuthorizationFormsInput
            label="Почта"
            placeholder="bake.sakeev@gmail.com"
            onChange={(value) => setEmail(value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-[20px] max-md:grid-cols-1">
          <AuthorizationFormsInput
            label="Пароль"
            placeholder="8+ символов"
            type="password"
            required={true}
            onChange={(value) => setPassword(value)}
          />
          <AuthorizationFormsInput
            label="Повторите пароль"
            placeholder="*********"
            type="password"
            required={true}
            onChange={(value) => setRePassword(value)}
          />
        </div>
        <Button
          type="submit"
          text="Зарегистрироваться"
          gradient={true}
          spacingClass={"mx-auto px-[80px] py-[20px]"}
          textStyles={"text-[20px] font-[700] leading-[30px]"}
          onClick={(e) => handleSignup(e)}
        />
        <h3 className="text-center text-[20px] font-[700] text-[#989898]">
          Уже зарегистрированы? 
          <span
            className="cursor-pointer text-[#447dfb] hover:underline ml-2"
            onClick={changeAuth}
          >
            Войдите
          </span>
        </h3>
      </form>
    </div>
  )
}

export default Register
