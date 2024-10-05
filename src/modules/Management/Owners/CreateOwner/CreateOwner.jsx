import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { ROUTERS } from "@router/Router.config"
import { createByAdminOwnerRequest } from "../../api"

import { isValidEmail, isValidPhone, removeWildcard } from "@helpers"
import { useLoading, useToast } from "@hooks"

import FormInputTextWrapper from "@components/FormComponents/FormInputTextWrapper/FormInputTextWrapper"
import Button from "@ui/Button/Button"

const CreateOwnerForm = () => {
  const navigate = useNavigate()
  const setLoading = useLoading()
  const showNotification = useToast()

  const [dataForCreate, setDataForCreate] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    role: "owner",
  })
  const [rePassword, setRePassword] = useState("")

  const isFormValid = () => {
    return (
      isValidEmail(dataForCreate.email) &&
      dataForCreate.name &&
      isValidPhone(dataForCreate.phone) &&
      dataForCreate.password &&
      dataForCreate.password === rePassword
    )
  }

  const createOwner = () => {
    if (!isFormValid()) {
      showNotification("Форма невалидна", "warning")
      return
    }

    setLoading(true)
    createByAdminOwnerRequest(dataForCreate)
      .then(() => {
        showNotification("Успешно создан", "success")
        navigate(
          `${removeWildcard(ROUTERS.Management.root)}${
            ROUTERS.Management.owners
          }`
        )
      })
      .catch((err) => showNotification(err.toString(), "error"))
      .finally(() => setLoading(false))
  }

  return (
    <div className="w-full">
      <h3 className="mb-[40px] font-[600] text-[20px] leading-[30px] max-md:text-[16px] max-lg:mb-[10px] max-xl:mb-[20px] max-sm:text-center">
        Создать владельца
      </h3>
      <form
        className="flex flex-col gap-[30px] w-full px-[20px] py-[40px] border-[3px] border-[#ebebeb] rounded-[20px]
			max-md:gap-[15px] max-md:py-[20px] max-sm:px-[10px]"
      >
        <div className="flex gap-x-[30px] max-md:flex-col max-md:gap-y-[20px]">
          <FormInputTextWrapper
            placeholder="Введите имя"
            label="Имя:"
            onChange={(value) => {	
              setDataForCreate((prev) => ({ ...prev, name: value }))
            }}
          />
          <FormInputTextWrapper
            placeholder="Введите фамилию"
            label="Фамилия:"
            onChange={(value) => {
              setDataForCreate((prev) => ({ ...prev, surname: value }))
            }}
          />
        </div>
        <FormInputTextWrapper
          placeholder="example@gmail.com"
          label="Почта:"
          type="email"
          onChange={(value) => {
            setDataForCreate((prev) => ({ ...prev, email: value }))
          }}
        />
        <FormInputTextWrapper
          placeholder="+0 (000) 000 00 00"
          label="Телефон номер:"
          type="tel"
          pattern={"[7]"}
          onChange={(value) => {
            setDataForCreate((prev) => ({ ...prev, phone: value }))
          }}
        />
        <div className="flex gap-x-[30px] max-md:flex-col max-md:gap-y-[20px]">
          <FormInputTextWrapper
            placeholder="Введите пароль"
            label="Пароль"
            type="password"
            onChange={(value) => {
              setDataForCreate((prev) => ({ ...prev, password: value }))
            }}
          />
          <FormInputTextWrapper
            placeholder="Повторите пароль"
            label="Повторите пароль"
            type="password"
            onChange={(value) => {
              setRePassword(value)
            }}
          />
        </div>
        <Button
          text="Создать"
          gradient={true}
          spacingClass={"mx-auto px-[150px] py-[20px] max-md:mx-0 max-md:px-0"}
          onClick={createOwner}
        />
      </form>
    </div>
  )
}

export default CreateOwnerForm
