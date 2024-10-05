import FormInputTextWrapper from "@components/FormComponents/FormInputTextWrapper/FormInputTextWrapper"
import FormInputFileWrapper from "@components/FormComponents/FormInputFileWrapper/FormInputFileWrapper"
import FormSelectWrapper from "@components/FormComponents/FormSelectWrapper/FormSelectWrapper"

import Button from "@ui/Button/Button"

import { getMenuTypes } from "../../api"

const Form = ({ handleUpdateButton, menuItemData, setDataForUpdate }) => {
  const handleChange = (key, value) => {
    setDataForUpdate((prevState) => {
      // Обработка фотографии
      if (key === "photo") {
        return {
          ...prevState,
          [key]: value[0] || {},
        }
      }

      // Обработка булевых значений
      if (typeof value === "boolean") {
        return {
          ...prevState,
          [key]: value,
        }
      }

      // Обработка всех остальных случаев
      return {
        ...prevState,
        [key]: value ? value : menuItemData[key],
      }
    })
  }

  return (
    <form className="flex flex-col gap-[30px] w-full px-[20px] py-[30px] border-[3px] border-[#ebebeb] rounded-[20px] max-md:gap-[15px]">
      <div className="grid grid-cols-2 gap-[30px] max-md:grid-cols-1">
        <FormInputTextWrapper
          label="Название меню:"
          placeholder="Чизбургер"
          onChange={(value) => {
            handleChange("name", value)
          }}
        />
        <FormInputFileWrapper
          label="Фотографии"
          placeholder="Добавить фото"
          currentPhoto={menuItemData.photo}
          getFiles={(files) => handleChange("photo", files)}
        />
      </div>
      <FormSelectWrapper
        label={"Тип меню"}
        placeholder={"Фаст-фуд"}
        options={getMenuTypes()}
        onChange={(value) => {
          handleChange("type", value)
        }}
      />
      <FormInputTextWrapper
        label="Описание"
        placeholder="Напишите краткое описание меню...."
        onChange={(value) => {
          handleChange("description", value)
        }}
      />
      <div className="grid grid-cols-2 gap-[20px] max-md:grid-cols-1">
        <FormInputTextWrapper
          label={"Цена:"}
          placeholder={"1200 тенге"}
          type="number"
          onChange={(value) => {
            handleChange("price", +value)
          }}
        />
        <FormSelectWrapper
          label={"Доступность"}
          placeholder={"Доступен"}
          options={[
            { label: "Доступен", value: true, key: 0 },
            { label: "Не доступен", value: false, key: 1 },
          ]}
          onChange={(value) => {
            handleChange("available", value)
          }}
        />
      </div>
      <Button
        text="Изменить"
        gradient={true}
        spacingClass={"mx-auto px-[110px] py-[20px]"}
        onClick={handleUpdateButton}
      />
    </form>
  )
}

export default Form
