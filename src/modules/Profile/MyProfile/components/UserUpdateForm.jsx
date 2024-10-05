import { useState } from "react"

import { isValidEmail, isValidPhone } from "@helpers/index"
import { useToast } from "@hooks"

import FormInputTextWrapper from "@components/FormComponents/FormInputTextWrapper/FormInputTextWrapper"
import Button from "@ui/Button/Button"

const UserUpdateForm = ({ currentUserData, updateUserData }) => {
  const showNotification = useToast()
  const [dataForUpdate, setDataForUpdate] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  })

  const isFormValid = () => {
    if (
      !dataForUpdate.name &&
      !dataForUpdate.surname &&
      !dataForUpdate.email &&
      !dataForUpdate.phone
    ) {
      showNotification("Не валидна", "info")
      return false
    }
    if (dataForUpdate.email && !isValidEmail(dataForUpdate.email)) {
      showNotification("Email Не валидна", "warning")
      return false
    }
    if (dataForUpdate.phone && !isValidPhone(dataForUpdate.email)) {
      showNotification("Phone Не валидна", "warning")
      return false
    }
  }

  return (
    <div className="min-w-[40%]">
      <h3 className="mb-[40px] font-[600] text-[20px] leading-[30px] max-md:mb-[20px]">
        Изменить аккаунт
      </h3>
      <form className="flex flex-col gap-[40px] p-[20px] border-[3px] border-[#ebebeb] rounded-[10px]">
        <div className="grid grid-cols-2 gap-[20px] max-md:grid-cols-1">
          <FormInputTextWrapper
            label="Имя:"
            placeholder={currentUserData.name}
            onChange={(value) => {
              setDataForUpdate((prev) => ({ ...prev, name: value }))
            }}
          />
          <FormInputTextWrapper
            label="Фамилия:"
            placeholder={currentUserData.surname}
            onChange={(value) => {
              setDataForUpdate((prev) => ({ ...prev, surname: value }))
            }}
          />
          <FormInputTextWrapper
            label="Почта:"
            placeholder={currentUserData.email}
            onChange={(value) => {
              setDataForUpdate((prev) => ({ ...prev, email: value }))
            }}
          />
          <FormInputTextWrapper
            label="Телефон номер:"
            type={"tel"}
            placeholder={currentUserData.phone}
            onChange={(value) => {
              setDataForUpdate((prev) => ({ ...prev, phone: value }))
            }}
          />
        </div>
        <Button
          text="Изменить"
          gradient={true}
          spacingClass={"mx-auto px-[110px] py-[20px]"}
          onClick={() => {
            if (!isFormValid()) {
              return
            }
            const updatedUserData = {
              ...currentUserData,
              ...Object.entries(dataForUpdate).reduce((acc, [key, value]) => {
                if (value !== "") {
                  acc[key] = value
                }
                return acc
              }, {}),
            }
            updateUserData(updatedUserData)
          }}
        />
      </form>
    </div>
  )
}

export default UserUpdateForm
