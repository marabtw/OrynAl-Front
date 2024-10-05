import { getTableType } from "../../api"

import FormInputTextWrapper from "@components/FormComponents/FormInputTextWrapper/FormInputTextWrapper"
import FormInputFileWrapper from "@components/FormComponents/FormInputFileWrapper/FormInputFileWrapper"
import FormSelectWrapper from "@components/FormComponents/FormSelectWrapper/FormSelectWrapper"

import Button from "@ui/Button/Button"

const Form = ({ tableData, setDataForUpdate, handleUpdateButton }) => {
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
        [key]: value ? value : tableData[key],
      }
    })
  }

  return (
    <form className="flex flex-col gap-[30px] w-full px-[20px] py-[30px] border-[3px] border-[#ebebeb] rounded-[20px] max-md:gap-[15px]">
      <div className="grid grid-cols-2 gap-[30px] max-md:grid-cols-1">
        <FormInputTextWrapper
          label="Название столика:"
          placeholder="Столик #1"
          onChange={(value) => {
            handleChange("name", value)
          }}
        />
        <FormInputFileWrapper
          label="Фотографии:"
          placeholder="Добавить фото"
					currentPhoto={tableData.photo}
          getFiles={(files) => handleChange("photo", files)}
        />
      </div>
      <FormSelectWrapper
        label={"Тип столика:"}
        placeholder={"Тапчан"}
        options={getTableType()}
        onChange={(value) => {
          handleChange("type", value)
        }}
      />
      <FormInputTextWrapper
        label="Описание:"
        placeholder="Напишите краткое описание меню...."
        onChange={(value) => {
          handleChange("description", value)
        }}
      />
      <FormInputTextWrapper
        label={"Вместимость:"}
        placeholder={"10 человек"}
        type={"number"}
        onChange={(value) => {
          handleChange("capacity", +value)
        }}
      />
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
